"""Update the current-work bullet while preserving the existing PDF layout.
Requires PyMuPDF and the system DejaVu Sans font.
"""
from pathlib import Path
import pymupdf as pdf

ROOT = Path(__file__).resolve().parents[1]
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
COPY = {
    'EN': ('Developing Navzeroth', [
        '• Developing purpuragenda, an online booking app with Java, Spring Boot, PostgreSQL, Docker',
        'and Angular with TypeScript.']),
    'FR': ('Développement de Navzeroth', [
        '• Développement de purpuragenda, une application de réservation en ligne avec Java, Spring Boot,',
        'PostgreSQL, Docker et Angular avec TypeScript.']),
}
for lang, (marker, lines) in COPY.items():
    path = ROOT / f'assets/cv/Igor-Kopestenski-CV-{lang}.pdf'
    doc = pdf.open(path)
    page = doc[0]
    if 'purpuragenda' in page.get_text():
        continue
    block = next(b for b in page.get_text('dict')['blocks']
                 if marker in ''.join(s['text'] for l in b.get('lines', []) for s in l['spans']))
    origins = [line['spans'][0]['origin'] for line in block['lines']]
    page.add_redact_annot(pdf.Rect(block['bbox']), fill=(1, 1, 1))
    page.apply_redactions()
    page.insert_font(fontname='cvbody', fontfile=FONT)
    for origin, text in zip(origins, lines):
        assert pdf.get_text_length(text, fontname='helv', fontsize=9.2) < 500
        page.insert_text(origin, text, fontname='cvbody', fontsize=9.2,
                         color=(23/255, 32/255, 45/255))
    data = doc.tobytes(garbage=4, deflate=True)
    doc.close()
    path.write_bytes(data)
    check = pdf.open(path)
    assert len(check) == 2
    text = ''.join(p.get_text() for p in check)
    for word in ['purpuragenda', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Angular', 'TypeScript', 'Navzeroth']:
        assert word in text
    check[0].get_pixmap(matrix=pdf.Matrix(1.3, 1.3)).save(f'/tmp/powerfolio-cv-{lang}.png')
    print(f'{lang}: two pages; project and technology checks passed')
