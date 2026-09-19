from pathlib import Path
from PIL import Image
import pymupdf as f,json,hashlib
out=Path('dist/ultrasound');work=Path('research/ultrasound/trimester');refs={}
first='https://worldperinatal.org/wp-content/uploads/2022/05/guidelines_2.pdf'
third='https://www.isuog.org/static/47b32c42-6727-4888-b4fe349005111180/Ultrasound-in-Obstet-Gyne-2024-Khalil-ISUOG-Practice-Guidelines-performance-of-thirdtrimester-obstetric.pdf'
def pdf_ref(name,xref,figure,caption,age,trimester,source,author,doi,year,license,licensePath,page):
 d=f.open('research/ultrasound/trimester/sources/'+name+'.pdf');a=d.extract_image(xref)
 # PDF image decode transforms can change the displayed colors (notably Fig 2).
 # Render that entire figure as displayed in the source rather than its inverted JPEG stream.
 if name=='third-trimester' and xref==104:
  p=d[page-1];rect=p.get_image_rects(xref)[0];pix=p.get_pixmap(matrix=f.Matrix(4,4),clip=rect);raw=pix.tobytes('jpeg');method='PDF 원본 그림 렌더링 · 패널 확대'
 else:raw=a['image'];method='PDF 원본 그림 추출 · 패널 확대'
 ext='jpg' if (name=='third-trimester' and xref==104) or a['ext']=='jpeg' else a['ext'];file=f'{name}-F{figure}.{ext}';(out/file).write_bytes(raw);size=Image.open(out/file).size
 key=f'{name}:F{figure}';refs[key]=dict(file=file,caption=caption,figure=f'Figure {figure}',source=source+f'#page={page}',author=author,year=year,doi=doi,license=license,licenseUrl='https://creativecommons.org/licenses/'+licensePath+'/',age=age,trimester=trimester,size=size,processing=method,sha256=hashlib.sha256(raw).hexdigest());return key
wf={1:(19,7,'Axial fetal brain: hemispheres, lateral ventricles and choroid plexuses.'),3:(24,8,'Spine: (a) midsagittal; (b) coronal.'),4:(29,9,'Axial view of both eyes and lenses.'),6:(33,10,'Four-chamber view with grayscale and color Doppler.'),7:(37,11,'Three-vessel-and-trachea view: aortic and ductal arches.'),8:(38,11,'Axial abdominal wall at fetal cord insertion.'),9:(39,11,'Axial abdomen showing the stomach.'),10:(44,12,'Axial bladder and perivesical arteries.'),11:(43,12,'Coronal kidneys on either side of the spine.'),13:(49,13,'(a) Lower limb: thigh, leg and foot. (b) Upper limb: arm, forearm and hand.')}
for n,(x,p,c) in wf.items():pdf_ref('wapm-first',x,n,c,'1분기 11–13+6주 지침의 실제 영상 · 개별 촬영 주수 미기재',1,first,'Volpe et al. / WAPM·PMF','10.2399/prn.22.0302001','2022','CC BY-NC-ND 4.0','by-nc-nd/4.0',p)
tf={1:(82,3,'(a) Normal third-trimester brain. (b,c) Abnormal findings; excluded from the selected panel.'),2:(104,4,'Normal third-trimester cardiac views: (a) four chambers; (b) three vessels and trachea; (c) left outflow tract.'),4:(125,5,'Longitudinal views of right and left hemidiaphragms.'),6:(143,6,'(a) Normal kidney, longitudinal view. (b) Hydronephrosis; not used as a normal example.'),12:(260,14,'Third-trimester head circumference measurement.'),13:(270,15,'Third-trimester abdominal circumference measurement.'),14:(272,15,'Third-trimester femur length measurement.')}
for n,(x,p,c) in tf.items():pdf_ref('third-trimester',x,n,c,'3분기 · ISUOG 지침에서 분기를 명시한 영상',3,third,'Khalil et al. / ISUOG','10.1002/uog.27538','2024','CC BY 4.0','by/4.0',p)
pdf_ref('cerebellum-third',8,1,'Transcerebellar diameter measurement in a fetus at 37 weeks.','3분기 37주 · 캡션 명시',3,'https://jultrason.pl/assets/pdf/artykuly/jou-00077-2021-mohamed-adel-ali.pdf','Ali, NasrElDin & Moussa','10.15557/JoU.2022.0007','2022','CC BY-NC-ND 4.0','by-nc-nd/4.0',2)
from bs4 import BeautifulSoup
for prefix,nums,fn,author,doi,year,age,tri in [('PMC8306830',[5],'research/ultrasound/trimester/sources/PMC8306830.html','Leung','10.3390/diagnostics11071217','2021','1분기 13주 · 캡션 명시',1),('Soltan2025',[1,2,3,8],'research/ultrasound/trimester/sources/cardiac-third.html','Soltan, Hezo & Zytoon','10.1186/s43055-025-01645-4','2025','3분기 28–30주 · 패널별 주수는 설명 참고',3)]:
 s=BeautifulSoup(Path(fn).read_text(encoding='utf-8'),'html.parser')
 for n in nums:
  file=f'{prefix}-F{n}.jpg';raw=(work/file).read_bytes();(out/file).write_bytes(raw)
  source=f'https://pmc.ncbi.nlm.nih.gov/articles/{prefix}/#diagnostics-11-01217-f00{n}' if prefix.startswith('PMC') else f'https://link.springer.com/article/{doi}#Fig{n}'
  refs[f'{prefix}:F{n}']=dict(file=file,caption=s.select('figure')[n-1].get_text(' ',strip=True),figure=f'Figure {n}',source=source,author=author,doi=doi,year=year,age=age,trimester=tri,size=Image.open(out/file).size,license='CC BY 4.0',licenseUrl='https://creativecommons.org/licenses/by/4.0/',processing='원본 파일 보존 · 선택 패널 확대',sha256=hashlib.sha256(raw).hexdigest())

for n in [1,2]:
 file=f'PMC8597369-F{n}.jpg';raw=(work/file).read_bytes();(out/file).write_bytes(raw)
 refs[f'PMC8597369:F{n}']=dict(file=file,caption=({1:'First-trimester fetus: A, CRL; B, profile and NT; C, abdominal situs; D/E, cardiac views.',2:'Same first-trimester fetus: A, LVOT; B, five chambers; C, RVOT; D, three vessels and trachea.'}[n]),figure=f'Figure {n}',source=f'https://pmc.ncbi.nlm.nih.gov/articles/PMC8597369/#F{n}',author='Ruican et al.',year='2021',doi='10.47162/RJME.62.1.09',license='CC BY-NC-SA 4.0',licenseUrl='https://creativecommons.org/licenses/by-nc-sa/4.0/',age='1분기 · 캡션 13주 1일 (기기 GA 표기는 12주 6일)',trimester=1,size=Image.open(out/file).size,processing='원본 파일 보존 · 선택 패널 확대',sha256=hashlib.sha256(raw).hexdigest())
Path('dist/trimester-figures.js').write_text('export const trimesterFigures='+json.dumps(refs,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
print({k:v['size'] for k,v in refs.items()})
