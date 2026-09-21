"""Extract visually reviewed image objects from official educational PDFs."""
from pathlib import Path
import pymupdf, hashlib, json
p=Path.home()/'AppData/Local/Temp/fetal-gap25'
root=Path(__file__).resolve().parents[1]
dest=root/'dist/ultrasound'; records={}
sources={
 'echo':('AIUM Image Library: Fetal Echocardiography','https://aium.s3.amazonaws.com/guidelines/fetalEcho/imageResources.pdf','© AIUM'),
 'ase':('Moon-Grady et al. / ASE 2023','https://www.asecho.org/wp-content/uploads/2023/07/PIIS0894731723002067-1.pdf','© 2023 ASE / Elsevier'),
 'cns':('ISUOG CNS Part 2, 2021','https://www.isuog.org/static/b91bae06-731b-4a2d-8bbcbb2f0d886af4/ISUOG-Practice-Guidelines-CNS-part-2-targeted-neurosonography.pdf','© 2021 ISUOG'),
 'twins':('ISUOG Twin guideline, 2025','https://www.isuog.org/static/89db40d1-928b-49bc-be5ea200fd41130c/ISUOG-Practice-Guidelines-role-of-ultrasound-in-twin-pregnancy.pdf','© 2025 The Authors / ISUOG'),
 'third':('ISUOG Third-trimester guideline, 2024','https://www.isuog.org/asset/47B32C42-6727-4888-B4FE349005111180/','© 2024 The Authors / ISUOG'),
 'samples':('AIUM Detailed anatomy image library','https://www.aium.org/docs/default-source/resources/image-libraries/76811sample.pdf','© AIUM')}
specs=[
 ('low','echo',16,1343,'심실 단축면 · Low short-axis',2),('high','echo',9,721,'유출로 단축면 · High short-axis',2),
 ('pv2','echo',13,1114,'폐정맥 연결 · Pulmonary veins',2),('pv3','echo',19,1573,'폐정맥 컬러 · Pulmonary veins',3),
 ('pa','echo',25,2033,'폐동맥 분지 · Branch pulmonary arteries',2),
 ('orthogonal','ase',8,111,'Figure 4 · 직교 접근의 4CV',None),
 ('pw','ase',16,240,'Figure 10 · PW Doppler',None),('rhythm','ase',19,269,'Figure 11 · 방실 시간관계',None),
 ('coronal','cns',3,52,'Figure 1 · 뇌 관상면 4종',None),
 ('sagittal','cns',4,62,'Figure 4 · 정중·방시상면',None),('posterior','cns',5,66,'Figure 5 · 후방 정중시상면',None),
 ('twins','twins',3,8,'Figure 1 · Lambda / T sign',1),
 ('pas','third',7,163,'Figure 8 · PAS 이상 소견 예시',3),
 ('vasa','third',7,162,'Figure 9 · 전치혈관 이상 소견 예시',3),
 ('dvp','third',15,271,'Figure 15 · DVP 계측',3),
 ('insertion','samples',5,20,'태반 제대 부착부',None),
 ('palate','samples',35,171,'상악·구개 · Maxilla / palate',None),
 ('renal-arteries','samples',46,221,'신장동맥 · Renal arteries',None),
 ('adrenals','samples',47,225,'양측 부신 · Adrenal glands',None),
 ('spleen','samples',49,236,'비장 · Spleen',None),
 ('gallbladder','samples',77,376,'담낭 · Gallbladder',None)]
for key,src,page,xref,title,trimester in specs:
 d=pymupdf.open(p/(src+'.pdf'));im=d.extract_image(xref)
 file=f'gap25-{key}.{im["ext"]}'
 # CNS Fig. 1 has a PDF Decode inversion: render its exact image rectangle
 # so browser colors match the printed figure rather than the raw JPEG.
 if key=='coronal' or im['ext'] not in ['jpeg','jpg','png']:
  rect=d[page-1].get_image_rects(xref)[0];pix=d[page-1].get_pixmap(matrix=pymupdf.Matrix(2,2),clip=rect)
  file=f'gap25-{key}.png';im=dict(image=pix.tobytes('png'),width=pix.width,height=pix.height)
 (dest/file).write_bytes(im['image'])
 author,url,rights=sources[src]
 records[key]=dict(file=file,size=[im['width'],im['height']],title=title,author=author,source=url+f'#page={page}',rights=rights,trimester=trimester,
   age=(f'{trimester}분기 자료 · 개별 촬영 주수 미기재' if trimester else '방법·구조물 참고 · 원문에 개별 촬영 주수 미기재'),
   sha256=hashlib.sha256(im['image']).hexdigest())
records['dvp']['age']='3분기 34주 1일 · 영상 내 표기'
(root/'dist/supplement-figures.js').write_text('export const supplementFigures = '+json.dumps(records,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
print(len(records),'unchanged PDF image objects imported')
