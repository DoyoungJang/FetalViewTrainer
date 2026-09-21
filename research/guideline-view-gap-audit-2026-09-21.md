# 학회 권고와 현재 View 목록 대조 — v46 보완 결과

검토일: 2026-09-21. 대상: FetalView v38, commit 6cb235fe008a358e01a38965db278cf19e7deafa.

현재 1/2/3분기 항목은 35/36/36개, 합계 107개이다. 분기 중복을 제거하면 ID 38개, type 35개이다. 수축기·이완기 변형도 별도 ID이므로 이를 모두 서로 다른 해부학적 단면 수로 해석하지 않는다.

`data.js`, `standards-data.js`, `anatomy.js`, `acquisition.js`, `measurements.js`, `supplementary-measurements.js`, `doppler.js`를 대조했다. 이번 검토는 학습 목록·설명·계측 콘텐츠의 범위에 관한 것이다. 3D 모델의 실제 위치 정확도나 각 사진의 진단 적합성을 재검증한 결과는 아니다.

학회 문서는 고정된 View 명칭뿐 아니라 반드시 관찰할 구조, 검사 방법, 적응증별 평가를 함께 제시한다. 독립 메뉴가 없다는 사실과 해당 구조 평가가 완전히 누락되었다는 사실을 구분한다. 특히 정밀검사의 모든 항목을 모든 임신의 기본 필수 검사로 표시하면 안 된다.

| 추가·보완 후보 | 적용 범위 | 현재 상태 / 권장 구현 | 근거 |
|---|---|---|---|
| Low short-axis · 심실 단축면 | 정밀 태아 심초음파 | 추가 계측에 SF·벽두께 설명은 있으나 전용 View 없음 | [AIUM 심초음파, Grayscale Imaging](https://doi.org/10.1002/jum.15188) |
| High short-axis · 심기저부·유출로 단축면 | 정밀 태아 심초음파 | 독립 View 없음. RVOT/3VV PA와 구별하여 추가 | [AIUM 심초음파](https://doi.org/10.1002/jum.15188) |
| Pulmonary venous connections · 폐정맥–좌심방 연결 | 정밀 태아 심초음파 | 4CV 구조물 설명만 존재. 좌우 연결·컬러·PW 획득 모듈 필요 | [ASE 2023, Tables 3/6/7](https://www.asecho.org/wp-content/uploads/2023/07/PIIS0894731723002067-1.pdf) |
| Orthogonal 4CV · 직교 접근의 사강면 | 정밀 태아 심초음파 | 현재 구분은 심장 주기별. 중격을 보는 접근 방향별 교육은 별개로 보완 | [ASE 2023, Fig. 4](https://www.asecho.org/wp-content/uploads/2023/07/PIIS0894731723002067-1.pdf) |
| Abdominal/visceral situs · 복부 장기 배열 | 심장 선별·정밀 | AC·4CV 설명에 일부 있음. 위·간·Ao·IVC와 태아 좌우를 연결하는 독립 모듈 권장 | [AIUM 심초음파, Basic Approach](https://doi.org/10.1002/jum.15188) |
| Pulmonary artery bifurcation · 폐동맥 분지 | 정밀 심초음파 | RVOT·3VV PA 설명에 이미 있음. 완전 누락 아님. 전용 분지 사진·체크리스트 보강 대상 | [AIUM 심초음파](https://doi.org/10.1002/jum.15188) |
| Umbilical vein PW · 제대정맥 파형 | 정밀 심초음파 | UA 모듈은 있으나 UV PW 세부 모듈 없음. 구조물로 UV가 언급된 것과 구분 | [ASE 2023, Table 6](https://www.asecho.org/wp-content/uploads/2023/07/PIIS0894731723002067-1.pdf) |
| Rhythm / AV timing · 리듬·방실 시간관계 | 기본 리듬 기록 + 이상 시 정밀 | FHR 설명은 있음. 동시 심방·심실 M-mode, SVC–Ao 또는 유입–유출 PW 교육 모듈 부족 | [ASE 2023, Fig. 11 및 rhythm section](https://www.asecho.org/wp-content/uploads/2023/07/PIIS0894731723002067-1.pdf) |
| 뇌 관상면 4종 | 2·3분기 표적 신경초음파 | Transfrontal / Transcaudate / Coronal transthalamic / Coronal transcerebellar 모두 독립 View 없음 | [ISUOG CNS Part 2, Fig. 1](https://www.isuog.org/static/b91bae06-731b-4a2d-8bbcbb2f0d886af4/ISUOG-Practice-Guidelines-CNS-part-2-targeted-neurosonography.pdf) |
| 뇌 정중시상·좌우 방시상면 | 2·3분기 표적 신경초음파 | 뇌량·충부 추가 계측 설명은 있음. 정중시상 전방/후방 창과 좌우 parasagittal View 추가 필요 | [ISUOG CNS Part 2, Figs. 4–5](https://www.isuog.org/static/b91bae06-731b-4a2d-8bbcbb2f0d886af4/ISUOG-Practice-Guidelines-CNS-part-2-targeted-neurosonography.pdf) |
| 척추 축상·관상 / 척수원추 | 기본 척추 관찰 + 표적 신경초음파 | Spine 한 메뉴에 다방향 설명 존재. 방향별 단면과 conus medullaris를 시각적으로 분리할 필요 | [ISUOG CNS Part 2, Figs. 6–8](https://www.isuog.org/static/b91bae06-731b-4a2d-8bbcbb2f0d886af4/ISUOG-Practice-Guidelines-CNS-part-2-targeted-neurosonography.pdf) |
| Early posterior fossa sagittal · 초기 후두와 시상면 | 1분기 정밀·표적 | IT·뇌간·제4뇌실 설명은 있음. NT/초기 뇌에서 연결되는 독립 학습 View 부족 | [AIUM 초기 정밀 2020, Table 1](https://www.aium.org/docs/default-source/resources/guidelines/obstetric_detailed_1st.pdf?sfvrsn=3c57e985_1) |
| Retronasal triangle / maxillary–mandibular gap | 1분기 정밀·적응증별 | 상순·안와·옆얼굴만으로 대체 불가. 별도 관상·접선 단면 학습 추가 후보 | [AIUM 초기 정밀 2020, Table 1 및 face section](https://www.aium.org/docs/default-source/resources/guidelines/obstetric_detailed_1st.pdf?sfvrsn=3c57e985_1) |
| Femur · 1분기 대퇴골 | 1분기 정밀검사 범위 | 2·3분기 FL 메뉴만 있음. 초기 해부학·주수별 계측 범위를 구분해 추가 후보 | [AIUM 초기 정밀 2020, Table 1](https://www.aium.org/docs/default-source/resources/guidelines/obstetric_detailed_1st.pdf?sfvrsn=3c57e985_1) |
| Neck survey · 목의 축상·관상 관찰 | 1분기 정밀·이상 의심 | NT의 정중시상 계측과 별개인 목 종괴·림프낭 평가 모듈 부족 | [AIUM 초기 정밀 2020, Table 1](https://www.aium.org/docs/default-source/resources/guidelines/obstetric_detailed_1st.pdf?sfvrsn=3c57e985_1) |
| Palate / maxilla / mandible / tongue / ears | 2·3분기 적응증별 정밀 | 얼굴 추가 계측은 일부 존재. 구개·구강·귀 전용 시각 자료와 획득 단면 부족 | [AIUM 상세 2019, Components table](https://doi.org/10.1002/jum.15163) |
| Bowel survey · 장관 관찰 | 2·3분기 기본 해부학 평가 | AC 계측 중심이며 장관 에코·확장·분포에 대한 별도 학습 내용 부족 | [AIUM 표준 2024, Fetal anatomic survey](https://doi.org/10.1002/jum.16406) |
| Thorax / lungs / ribs · 흉곽·폐·늑골 | 2·3분기 정밀 | 4CV·횡격막에 부분 포함. 전용 흉부 평가 모듈 보완 후보 | [AIUM 상세 2019](https://doi.org/10.1002/jum.15163) |
| Gallbladder / adrenals / spleen / renal arteries | 2·3분기 적응증별 정밀 | 담낭·부신·비장·신장동맥 평가 모듈 없음. 부신 오인 방지 문구는 부신 평가 모듈이 아님 | [AIUM 상세 2019](https://doi.org/10.1002/jum.15163) |
| Placental cord insertion · 태반 쪽 제대 부착부 | 2·3분기 표준, 기술적으로 가능할 때 기록 | Placenta 설명에만 있음. 현재 Cord는 태아 복벽 부착부이므로 독립 View 필요 | [AIUM 표준 2024](https://doi.org/10.1002/jum.16406) |
| Free cord cross-section · 자유 제대 횡단면 | 제대 혈관 수 확인 | Cord 설명·방광 양측 UA에 관련 내용 있음. 전용 제대 횡단면은 없음 | [AIUM 표준 2024](https://doi.org/10.1002/jum.16406) |
| DVP / AFI · 양수 계측 | 2·3분기 검사 | 양수 언급만 있고 계측 단면·캘리퍼·실제 사진 모듈 없음. 두 방법을 모두 매번 시행한다는 뜻은 아님 | [ISUOG 3분기 2024, Appendix 3](https://doi.org/10.1002/uog.27538) |
| TV color / PW for vasa previa | 위험인자 또는 의심 시, 2·3분기 | 경부 길이·태반 하연과 별도의 내구 주변 태아 혈관 평가 모듈 필요 | [ISUOG 3분기 2024](https://doi.org/10.1002/uog.27538) |
| Placenta accreta spectrum targeted views | 위험인자 또는 의심 시 | 태반 일반 소견은 있음. 태반–근층–방광 경계 및 혈관 표적 평가 별도 모듈 후보 | [ISUOG 3분기 2024](https://doi.org/10.1002/uog.27538) |
| Lambda / T sign · 융모막성·양막성 | 다태임신, 주로 1분기 | 현재 단태 중심 모델·메뉴에 없음. 다태 전용으로 분리할 범위 | [ISUOG 쌍태 2025](https://doi.org/10.1002/uog.29166) |

현재 TVP/TTP/TCP, 4CV/LVOT/RVOT/3VV/3VT, 두 궁, bicaval, AC, 신장·방광, 주요 사지, 상순·안와·얼굴 profile, 태반·경부, CRL/NT는 이미 제공한다. UA/MCA/DV/UtA 도플러는 v38에 사진·방법이 있어 완전 누락으로 세지 않았다. 다만 독립 3D 단면 선택은 아직 별개이다.

권장 우선순위는 교육 앱의 보완 순서이며 학회가 정한 추가 순위가 아니다: (1) 폐정맥·심장 단축면 및 UV PW, (2) 뇌 정중시상·관상·방시상면, (3) 태반 쪽 제대 부착·자유 제대 횡단·DVP/AFI·장관 평가, (4) 초기 정밀·얼굴·복부 표적 모듈, (5) 다태·전치혈관·PAS 등 적응증별 모듈.

참고한 기본 범위 문서: [ISUOG cardiac screening 2023](https://www.isuog.org/static/a529f402-06f9-42b6-ae9abdc736c43bf2/UOG-2023-Carvalho-ISUOG-Practice-Guidelines-updated-fetal-cardiac-screening.pdf), [ISUOG 11–14주 2023](https://doi.org/10.1002/uog.26106), [ISUOG 중기 2022](https://doi.org/10.1002/uog.24888). AIUM 공식 카탈로그는 표준 산과 2024, 초기 상세 2020, 중후기 상세 2019 및 심초음파 2019를 연결하고 있다. 심초음파 논문은 2019 온라인 공개/2020 권호이다.

이번 결과는 위 문서와 현재 앱의 대조에서 확인한 보완 목록이다. 모든 질환별·장기별 학회 문서를 망라한 완전성 인증은 아니다. 위 대조는 최초 v38 조사 시점의 기록이다. 아래 v46 구현 결과를 현재 상태로 참고한다.


## v46 구현 결과 (2026-09-21)

사이트 상단 **학회 권고 보완학습 · 25** 메뉴에 25개 보완 항목을 모두 독립 학습 모듈로 추가했다. 분기 필터 기준 1분기 8개, 2분기 20개, 3분기 20개이며 분기 중복을 제외하면 25개이다. 기본 View 107개와 보완 모듈 25개는 서로 다른 집계다.

각 모듈에는 적용 범위, 한영 구조물, 획득 순서, 측정·기록 기준, 스캔 주의사항과 공식 근거를 넣었다. 폐정맥·UV·리듬·전치혈관은 별도 도플러 세부 설명이 있다. 뇌 관상면 4종, 정중 전방/후방 및 좌우 방시상, 구강·귀, 표적 복부 장기를 하위 항목으로 구분했다.

공식 PDF에서 참고 그림 21개를 추가했다. 주수가 특정 분기로 명시된 사진은 해당 분기에만 연결했다. 개별 촬영 주수가 없는 학회 방법 예시는 **방법·구조물 참고 / 주수 미기재**로 표시한다. PAS·전치혈관은 **이상 소견 예시**로 명시한다. 복합 그림은 해당 패널만 확대하며, CNS Figure 1은 PDF Decode 반전을 반영해 원문과 같은 색으로 렌더링했다.

**구현 범위:** 25개는 학습 콘텐츠 모듈이며, 검증된 전용 3D 프리셋 25개를 새로 만든 것은 아니다. 관련 기준 View 이동을 제공하되 해당 3D가 신규 세부 단면이라고 표시하지 않는다. 기존 단면 방향 선택기의 사진 없는 항목 숨김을 유지한다. 전용 사진이 없는 모듈은 사진 메뉴를 만들지 않고 내용과 근거를 제공한다.

| 번호 | 구현한 모듈 / ID | 적용 분기 | 실제 사진 또는 명시적 방법 참고 | 구현 상태 |
|---|---|---|---|---|
| 1 | 심실 단축면 / `low-sax` | 2, 3 | 2분기 1패널 · 3분기 0패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 2 | 심기저부·유출로 단축면 / `high-sax` | 2, 3 | 2분기 1패널 · 3분기 0패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 3 | 폐정맥–좌심방 연결 / `pulmonary-veins` | 2, 3 | 2분기 2패널 · 3분기 2패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 4 | 직교 접근 사강면 / `orthogonal-4cv` | 2, 3 | 2분기 2패널 · 3분기 2패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 5 | 복부 장기 배열·태아 좌우 / `situs` | 1, 2, 3 | 1분기 1패널 · 2분기 1패널 · 3분기 1패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 6 | 폐동맥 분지 / `pa-bifurcation` | 2, 3 | 2분기 1패널 · 3분기 0패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 7 | 제대정맥 PW / `uv-pw` | 2, 3 | 2분기 1패널 · 3분기 1패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 8 | 리듬·방실 시간관계 / `rhythm` | 1, 2, 3 | 1분기 0패널 · 2분기 3패널 · 3분기 3패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 9 | 뇌 관상면 4종 / `brain-coronal` | 2, 3 | 2분기 4패널 · 3분기 4패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 10 | 뇌 정중·좌우 방시상면 / `brain-sagittal` | 2, 3 | 2분기 3패널 · 3분기 3패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 11 | 척추 다방향·척수원추 / `spinal-conus` | 2, 3 | 2분기 1패널 · 3분기 0패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 12 | 초기 후두와 시상면 / `early-posterior-fossa` | 1 | 1분기 0패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 13 | 후비삼각·상하악 간격 / `rnt-gap` | 1 | 1분기 1패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 14 | 1분기 대퇴골 / `early-femur` | 1 | 1분기 0패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 15 | 목 축상·관상 관찰 / `neck-survey` | 1 | 1분기 0패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 16 | 구개·구강·귀 / `oral-ears` | 2, 3 | 2분기 1패널 · 3분기 1패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 17 | 장관 관찰 / `bowel` | 2, 3 | 2분기 0패널 · 3분기 0패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 18 | 흉곽·폐·늑골 / `thorax` | 2, 3 | 2분기 0패널 · 3분기 0패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 19 | 담낭·부신·비장·신장동맥 / `target-abdomen` | 2, 3 | 2분기 4패널 · 3분기 4패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 20 | 태반 쪽 제대 부착부 / `placental-insertion` | 2, 3 | 2분기 1패널 · 3분기 1패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 21 | 자유 제대 횡단면 / `free-cord` | 1, 2, 3 | 1분기 0패널 · 2분기 0패널 · 3분기 0패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 22 | 양수 계측 / `fluid` | 2, 3 | 2분기 0패널 · 3분기 1패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 23 | 내구 주변 태아 혈관 / `vasa-previa` | 2, 3 | 2분기 0패널 · 3분기 1패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 24 | 태반 유착 스펙트럼 표적 평가 / `pas` | 2, 3 | 2분기 0패널 · 3분기 1패널 | 독립 학습·획득·기록·주의·근거 추가 |
| 25 | 융모막성·양막성 / `chorionicity` | 1 | 1분기 2패널 | 독립 학습·획득·기록·주의·근거 추가 |

### 남은 시각 자료 범위

* 신규 모듈의 전용 3D 정합·단면 프리셋은 미구현이다.
* 초기 후두와, 초기 대퇴골, 목 관찰, 장관, 흉곽, 자유 제대의 전용 사진 및 일부 분기 사진은 아직 없다. 구강 모듈은 구개 사진이 있으며 혀·귀 각각의 전용 사진까지 확보한 것은 아니다.
* 척수원추 모듈의 사진은 척추 축상 구조 참고이며 원추 전용 사진은 아니다. 좌우 방시상면은 양측 평가법을 설명하되, 원문에서 좌우가 미표기된 사진에 측성을 임의 부여하지 않는다.
* AIUM·ASE·ISUOG의 일반 권고와 정밀·표적 범위를 구분했으며 학회 인증이나 임상 완전성 검증을 주장하지 않는다.

### 검증

25개 번호·ID, 분기별 48개 모듈 조합, 신규 이미지 21개 해시·크기, 모든 표시 crop 영역, 분기 오표기 방지, 이상 사례 표시, 기존 107개 View·172개 추가 방향의 회귀 검사를 통과했다. 브라우저에서 메뉴, 검색, 분기 전환, 뇌 관상 사진 선택과 관련 기준 View 복귀를 확인했다.

구현 파일: `dist/supplement-catalog.js`, `dist/supplement-ui.js`, `dist/supplement-photos.js`, `dist/supplement-figures.js`. 원문 PDF 그림 추출 기록: `research/import-gap25-images.py`.
