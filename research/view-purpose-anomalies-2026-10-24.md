# View별 촬영 목적·주요 이상 소견 추가

확인일: 2026-10-24

## 적용 범위

- 기준 View 133개: 1분기 37개, 2분기 48개, 3분기 48개. 같은 단면의 심장 주기 및 분기별 항목을 포함한다.
- 학회 권고 보완학습 25개: 분기별로 48개 조합.
- `dist/clinical-purpose.js`에 촬영 목적, 이상명 한·영 표기, 관찰 단서, 추가 확인, 해석 한계와 62개 근거 자료를 관리한다.
- 기본 화면의 첫 학습 탭은 ‘촬영 목적·이상’. 보완학습은 각 항목의 설명 맨 위에 같은 형식으로 표시한다.
- 방향 변형은 해당 장기 내용과 보조 접근 안내를 함께 사용한다. 모든 이상이 모든 방향에서 보인다고 표현하지 않는다.

## 근거 연결 원칙

검사 범위·획득 목적은 AIUM·ASE·ISUOG 가이드라인에, 구체적인 이상 소견은 학회의 질환별 자료 또는 원문 연구에 연결했다. 원문의 내용을 짧은 한국어 교육 문장으로 재구성했다. 이 목록은 학회가 제시한 단면별 확진 목록이나 발생 빈도 순위가 아니다.

| 영역 | 주요 근거 | 반영 내용 |
|---|---|---|
| 초기 해부학 | [ISUOG 2023](https://doi.org/10.1002/uog.26106), [AIUM 2021](https://doi.org/10.1002/jum.15477) | 초기 발달·관찰 한계, 복벽 생리적 변화, CRL 우선 주수 산정 |
| 중·후기 범위 | [AIUM 2024](https://doi.org/10.1002/jum.16406), [AIUM 정밀검사 2019](https://doi.org/10.1002/jum.15163), [ISUOG 3분기 2024](https://doi.org/10.1002/uog.27538) | 기본·정밀·적응증별 평가와 후기 진행 소견 구분 |
| 심장 | [ISUOG 2023](https://doi.org/10.1002/uog.26224), [ASE 2023](https://www.asecho.org/wp-content/uploads/2023/07/PIIS0894731723002067-1.pdf), [AIUM 2020](https://doi.org/10.1002/jum.15188) | 4CV, 유출로, 대혈관, 궁, 정맥 연결과 심장 주기 |
| 뇌·척추 | [ISUOG CNS 1](https://doi.org/10.1002/uog.22145), [CNS 2](https://www.isuog.org/static/b91bae06-731b-4a2d-8bbcbb2f0d886af4/ISUOG-Practice-Guidelines-CNS-part-2-targeted-neurosonography.pdf) | 선별 축상면과 정밀 관상·시상면 구분 |
| 후두개와 | [원문 감별 연구](https://doi.org/10.1002/uog.11071) | Dandy–Walker, Blake pouch cyst, 충부 저형성의 추가 정중면 평가 |
| 초기 얼굴 | [RNT](https://pubmed.ncbi.nlm.nih.gov/20014330/), [Maxillary gap](https://pubmed.ncbi.nlm.nih.gov/26277990/) | RNT와 정중시상 상악 간격, 관상 하악 간격을 구분 |
| 요로 | [EAU Foetal urology](https://uroweb.org/guidelines/paediatric-urology/chapter/foetal-urology), [LUTO](https://uroweb.org/guidelines/paediatric-urology/chapter/congenital-lower-urinary-tract-obstruction) | 신장·신우·방광 소견과 추가 평가 |
| 사지 | [손가락 원문](https://pubmed.ncbi.nlm.nih.gov/7474057/), [Vertical talus 원문](https://pubmed.ncbi.nlm.nih.gov/28879597/) | 손가락 배열·구축·발 형태, 단일 소견의 한계 |
| 태반·경부 | [ISUOG 조산 2022](https://doi.org/10.1002/uog.26020), [SMFM Vasa previa](https://publications.smfm.org/publications/215-society-for-maternal-fetal-medicine-consult-series-37/) | 모체·태반 위험 평가를 태아 구조 기형과 구분 |
| 쌍태 | [ISUOG 2025](https://www.isuog.org/static/89db40d1-928b-49bc-be5ea200fd41130c/ISUOG-Practice-Guidelines-role-of-ultrasound-in-twin-pregnancy.pdf) | 융모막성·양막성의 목적, TTTS/TAPS 추적과 초기 막 소견 구분 |

나머지 질환별 출처는 각 View의 ‘학회·논문 근거’와 `clinicalSources`에 직접 연결되어 있다.

## 오해 방지를 위해 별도로 검토한 부분

- 정상 4CV만으로 유출로 이상을 배제하지 않는다. 이완기 반월판 닫힘·전향성 유출 부재는 정상일 수 있다.
- 초기 CSP·뇌량 미관찰에 중기 기준을 적용하지 않는다. 초기 축상 후두개와와 정중시상 IT를 구분한다.
- 신장·방광 등 구조가 한 장에서 보이지 않는 것과 실제 결손을 구분한다.
- 척수원뿔 위치는 주수에 따라 다르다. 후기 발현 골격이형성은 정상 초기 FL로 배제하지 않는다.
- Vasa previa는 동맥과 정맥을 모두 포함한다. PAS는 초음파 음성 소견만으로 고위험군에서 배제하지 않는다.
- 경부·양수·성장·도플러 항목은 구조 기형 외의 위험·기능 소견이다.
- 기존 참고 사진이 나열한 이상들의 증례 사진이라는 오해를 막는 안내를 표시한다.

## 검증

- `node clinical-purpose-tests.mjs`: 133개 View와 48개 보완학습 조합의 내용·근거·분기·심장 주기 연결, 렌더링과 escaping 검증.
- `node tests.mjs`: 앱 선택·탭·키보드 이동·내용 전환·방향 선택 상태 검증.
- `node supplement-learning-tests.mjs`, `node extended-view-tests.mjs`: 기존 보완·확장 View 및 참고 영상 연결 회귀 검증.
- 로컬 Chrome에서 기본·심장 주기·보완학습 표시, 오류 로그, 390px 화면의 단일 열·가로 넘침 없음 확인.
- 이번 변경은 학습 설명과 UI 연결이며, 이상 구조의 3D 시뮬레이션을 추가한 것은 아니다.
