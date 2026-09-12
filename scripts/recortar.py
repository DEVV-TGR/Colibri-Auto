#!/usr/bin/env python3
"""
Recorta o carro de uma fotografia do inventário e escreve um PNG com alfa.

Usa o Vision do macOS (`VNGenerateForegroundInstanceMaskRequest`) — o mesmo
motor do «recortar assunto» do iPhone. Corre offline, é determinista, e não
acrescenta nada ao `package.json`: as dependências vivem num venv fora do
repositório.

    python3 -m venv /tmp/recorte && \
      /tmp/recorte/bin/pip install pyobjc-framework-Vision pyobjc-framework-Quartz
    /tmp/recorte/bin/python scripts/recortar.py \
      public/cars/mercedes-e-350-coupe/01.jpg \
      public/cars/hero/mercedes-e-350-recorte.png

Porque é que isto existe: as fotografias todas do stand têm o carro em cima de
relva sintética, com a lona laranja de seis metros atrás e a vedação ao fundo.
Essa fotografia serve num card pequeno e não serve para ocupar metade do
primeiro ecrã. Recortada, sobra o carro — que é a única parte boa da imagem.

Quando o cliente enviar as fotografias originais em resolução alta, é este
script que se volta a correr.

**Se o Vision falhar** ou devolver um recorte sujo, a alternativa manual é
abrir a fotografia no Preview do macOS → Tools → Remove Background, e gravar o
PNG no mesmo destino. O resultado é equivalente.
"""

import sys
from pathlib import Path

import Quartz
import Vision
from Foundation import NSURL


def recortar(origem: Path, destino: Path) -> None:
    url = NSURL.fileURLWithPath_(str(origem))
    handler = Vision.VNImageRequestHandler.alloc().initWithURL_options_(url, {})
    pedido = Vision.VNGenerateForegroundInstanceMaskRequest.alloc().init()

    ok, erro = handler.performRequests_error_([pedido], None)
    if not ok:
        raise SystemExit(f"Vision falhou: {erro}")

    resultados = pedido.results()
    if not resultados:
        raise SystemExit("Vision não encontrou nenhum assunto na fotografia.")

    observacao = resultados[0]
    instancias = observacao.allInstances()
    print(f"instâncias detectadas: {instancias.count()}")

    # `croppedToInstancesExtent` apara o transparente à volta, para o PNG não
    # levar o peso da fotografia inteira e o `object-contain` no site não ter
    # margem invisível a encolher o carro.
    pixels, erro = observacao.generateMaskedImageOfInstances_fromRequestHandler_croppedToInstancesExtent_error_(
        instancias, handler, True, None
    )
    if pixels is None:
        raise SystemExit(f"não gerou a máscara: {erro}")

    imagem = Quartz.CIImage.imageWithCVPixelBuffer_(pixels)
    contexto = Quartz.CIContext.context()
    espaco = Quartz.CGColorSpaceCreateDeviceRGB()
    dados = contexto.PNGRepresentationOfImage_format_colorSpace_options_(
        imagem, Quartz.kCIFormatRGBA8, espaco, {}
    )
    if dados is None:
        raise SystemExit("não codificou o PNG.")

    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_bytes(bytes(dados))

    caixa = imagem.extent()
    print(
        f"escrito: {destino}  "
        f"{int(caixa.size.width)}x{int(caixa.size.height)}  "
        f"{destino.stat().st_size // 1024} KB"
    )


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("uso: recortar.py <fotografia> <destino.png>")
    recortar(Path(sys.argv[1]), Path(sys.argv[2]))
