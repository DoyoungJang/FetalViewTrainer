# 1분기 실제 초음파 영상 재검색 — 2026-09-21

검색어: transthalamic axial view, thalamic plane, BPD plane, first-trimester neurosonography, posterior fossa, bilateral diaphragmatic sagittal view, 13-week three-vessel view, first-trimester aortic arch/bicaval/cervical length, transverse kidneys.

## 추가한 영상

| View | 근거 | 표시 패널 | 제한 |
|---|---|---|---|
| TTP / BPD / HC | Lyu et al. 2025, DOI 10.1007/s00404-025-08231-z, Figure 1 | 첫 번째 원본의 c, [458,0,227,229] | 11–13+6주 캡션; 개별 주수 미기재 |
| Diaphragm | 같은 논문 Figure 1 | 두 번째 원본의 p, [0,228,230,229] | 양측 횡격막 시상면 |
| 3VV–PA | Lee & Won 2013, DOI 10.5468/ogs.2013.56.4.217, Figure 13 | B, [236,3,224,216] | 정상 13주 MPA/Ao/SVC; 직경 캘리퍼 없는 해부학 참고 |

Lyu 원문: https://link.springer.com/article/10.1007/s00404-025-08231-z#Fig1

Lyu: CC BY-NC-ND 4.0. 원본 복합그림 파일 그대로 보존, 기존 앱의 패널 확대 표시와 전체 원본 링크 사용. Lee & Won: 기존 CC BY-NC 3.0 원본을 재사용. 파일 무결성 및 좌표 범위 검사 통과.

## 이미지 대신 원문 연결 추가

- Ao Arch: Yang et al. 2025, DOI 10.1002/uog.29186, Supporting Figure S5a–b. 1분기 대동맥궁 장축; 재게시 라이선스 확인 안 됨.
- Bicaval: 같은 논문 Supporting Figure S6a. 정상 양대정맥; S6b는 비정상 예시이므로 정상 대체 영상으로 사용하지 않음.
- Cervix: Feng et al. 2021, DOI 10.1111/aogs.14138, Figure 1. 11–13+6주 연구의 질식 CL; free access만 확인, 재게시 라이선스 확인 안 됨. 1분기 보편적 선별 권고로 해석하지 않음.

## 남은 7개 View

TCP, 코/상순, Ao Arch, Duct Arch, Bicaval, 신장 횡단면, Cervix.

- TCP: DOI 10.1080/01443615.2024.2361848의 1분기 neurosonography 원문 링크 유지. 원본 영상 확보 안 됨.
- 코/상순: PMC11444747 Figure 7 원문 링크 유지. 후비삼각(RNT)만으로 코/상순 View를 채우지 않음.
- 신장 횡단면: 새 consensus Figure 1s는 관상면이며 횡단면 대체로 사용하지 않음.
- Duct Arch: aortic/ductal arch 색 신호가 중첩된 자료를 독립적인 정상 동맥관궁 영상으로 분류하지 않음.
- PMC12699807: CL 관련 논문이나 그림은 회귀분석 그래프뿐이라 제외.

1분기 이미지 25/35 → 28/35; 전체 77/107 → 80/107. 단면 획득/측정 프로토콜, 3D 모델 및 시점 로직 변경 없음.

검증: node ultrasound-tests.mjs, node tests.mjs 통과. 브라우저에서 TTP 및 횡격막의 해당 패널만 표시됨을 확인, 3VV–PA의 13주와 캘리퍼 없음 표기 확인.


## 후속 요청 반영 — v40

사용자가 RNT를 코/상순의 1분기 참고 영상으로 허용하고, 신장 및 동맥관궁은 목표 구조물이 포함된 영상도 허용함. 단면 일치 조건을 묵시적으로 완화하지 않고 이미지 위에 실제 촬영면과 제한을 표시함.

- 코/상순: Lyu 2025 Figure 1i, RNT / retronasal triangle / posterior nasal triangle, 사관상면. 기존 원본 첫 부분에서 i만 표시 [458,458,227,228]. 중기 상순 정면과 구분.
- 신장 횡단면 항목: Lyu 2025 Figure 1s, RK/LK가 표시된 양측 신장 관상면. [0,457,230,228]. 횡단면 및 신우 AP 측정 예시가 아니라는 설명 표시.
- Duct Arch / Ao Arch: Ruican et al. 2021, DOI 10.47162/RJME.62.1.09, PMC8597369 Figure 2D. Figure 1과 같은 13+1주 태아라는 캡션 확인. [389,244,390,223]. DA/AoA 라벨 포함. 3VT의 구조물 참고이며 궁 시상면과 구분. 기존 CC BY-NC-SA 4.0 원본 보존.
- Cervix: Becerra-Mojica et al. 2024, DOI 10.3390/jcm13133906, PMC11242471 Figure 1a. 1분기 CL 영상 캡션 및 연구 범위 11–13+6주 확인. CC BY 4.0. 원본 2859x1076 중 [0,0,1360,1076] 표시. 압박을 이용한 CCI의 b 패널 제외. 원본: https://mdpi-res.com/d_attachment/jcm/jcm-13-03906/article_deploy/html/images/jcm-13-03906-g001.png

추가 검색 결과:
- Ushakov et al. 2024, DOI 10.1080/01443615.2024.2361848: 공개 CC BY 논문 및 13+0주 정상 뇌 Figure 1을 검색 결과로 확인했으나 출판사 HTML/PDF 파일 접근은 403. 소뇌는 원문 링크 유지.
- Lyu Figure 2의 관상면 뇌간/제4뇌실 패널은 소뇌 식별 근거가 충분하지 않아 TCP 대체로 추가하지 않음.
- Ruican Figure 4A의 bicaval은 조직학적 3D 재구성이므로 실제 초음파로 잘못 분류하지 않음. Yang 2025 S6a 정상 bicaval 원문 링크 유지.

1분기 33/35개 항목에 실제 초음파가 있으며, 이 수는 구조물 참고 영상을 포함함. 소뇌 및 양대정맥은 이미지 미확보. 전체 85/107. node ultrasound-tests.mjs 및 node tests.mjs 통과. 브라우저에서 RNT/cervix 패널 분리와 ductal arch의 실제 단면 설명을 확인.

