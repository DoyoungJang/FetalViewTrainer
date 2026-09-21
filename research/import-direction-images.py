"""Import inspected publisher/PDF images; keep source pixels unchanged."""
from pathlib import Path
import hashlib, json, shutil
from PIL import Image

root = Path(__file__).resolve().parents[1]
temp = Path.home() / 'AppData/Local/Temp/fetal-direction-images'
figures = {}
def add(key, original, **meta):
    file = 'directions-' + original
    shutil.copyfile(temp / original, root / 'dist/ultrasound' / file)
    blob = (temp / original).read_bytes()
    figures[key] = dict(file=file, size=list(Image.open(temp / original).size),
                        sha256=hashlib.sha256(blob).hexdigest(), **meta)

ajum = dict(author='Bethune et al.', year=2013, doi='10.1002/j.2205-0140.2013.tb00106.x',
    license='© 2013 Australasian Society for Ultrasound in Medicine',
    licenseUrl='https://pmc.ncbi.nlm.nih.gov/articles/PMC5029995/',
    trimester=2, ageMatched=True, age='2분기 검사 논문의 예시 · 개별 촬영 주수 미기재',
    processing='공개 PDF의 원본 그림 추출 · 오른쪽 초음파 패널만 확대 표시')
for n, caption in [(5,'정중시상면의 뇌량과 투명중격강'),(6,'소뇌 관상면'),(7,'양측 안와의 관상면'),(10,'상순과 구개의 횡단면'),(15,'흉복부 장기 배열의 관상면')]:
    add(f'PMC5029995:F{n}', f'pictorial-fig{n}.jpeg', **ajum,
        figure=f'Figure {n}', caption=caption,
        source=f'https://pmc.ncbi.nlm.nih.gov/articles/PMC5029995/#ajum00106-fig-{n:04d}')
spine = dict(author='Kim et al.', year=2023, doi='10.5468/ogs.22263',
    license='CC BY-NC 3.0', licenseUrl='https://creativecommons.org/licenses/by-nc/3.0/',
    trimester=2, ageMatched=True, age='2분기 25주 · 원문 캡션 명시',
    source='https://www.ogscience.org/journal/view.php?doi=10.5468/ogs.22263',
    processing='공개 PDF에 포함된 C 패널의 원본 이미지 추출')
for n, caption in [(2,'C: 정상 요추 횡단면'),(4,'C: 정상 요천추 관상면의 세 줄 골화 중심')]:
    add(f'PMC9849725:F{n}C', f'spine-fig{n}.jpeg', **spine, figure=f'Figure {n}C', caption=caption)
brain = dict(author='Leibovitz, Lerman-Sagie & Haddad',year=2022,doi='10.3390/life12060809',
    license='CC BY 4.0',licenseUrl='https://creativecommons.org/licenses/by/4.0/',
    processing='출판사 원본 보존 · 정상 초음파 패널만 확대 표시')
for n, caption in [(12,'B: 28주 정상 뇌 정중시상면; C: 24주 정상 뇌량주위동맥 도플러. 그 외 패널은 표본 또는 이상 사례.'),(13,'A: 24주 정상 뇌 관상면. 나머지 패널은 이상 사례.')]:
    add(f'PMC9224903:F{n}',f'brain-{n}.png', **brain,figure=f'Figure {n}',caption=caption,
        source=f'https://www.mdpi.com/2075-1729/12/6/809#fig_body_display_life-12-00809-f{n:03d}')
add('UTD2014:F1','renal-fig1.jpeg',author='Nguyen et al.',year=2014,doi='10.1016/j.jpurol.2014.10.002',
    figure='Figure 1',caption='32주 정상 태아 신장: A 횡단면, B 시상면',
    source='https://s3.amazonaws.com/cdn.smfm.org/publications/228/download-562e2b095ab66ccd11e33779e7393dcb.pdf#page=8',
    license='CC BY-NC-ND 3.0',licenseUrl='https://creativecommons.org/licenses/by-nc-nd/3.0/',
    trimester=3,ageMatched=True,age='3분기 32주 · 원문 캡션과 영상 내 표기',
    processing='공개 PDF의 원본 그림 추출 · 선택 패널 확대 표시')
(root/'dist/direction-figures.js').write_text('export const directionFigures = '+json.dumps(figures,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
