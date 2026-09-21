# Independent View expansion — v47

14 unique View lessons, 26 trimester entries. Baseline 107 entries retained; totals: first 37, second 48, third 48. Cardiac temporal variants remain separate entries and these counts are not counts of universally mandated screening planes.

| Scope | Independent IDs | Trimester |
|---|---|---|
| Detailed fetal echocardiography | low-sax, high-sax, pulmonary-veins, pa-bifurcation | 2, 3 |
| Targeted neurosonography | corpus-callosum, posterior-fossa, transfrontal, transcaudate, coronal-thalamic, coronal-cerebellar, conus | 2, 3 |
| Placental insertion assessment | placental-insertion | 2, 3 |
| Early detailed anatomy | early-posterior-fossa, rnt | 1 |

These promote selected supplement modules to the main lesson selector; the broader 25-module supplement library remains available and links to independent lessons where present. Existing RNT reference under nose/lips is reused, not counted as a newly obtained image.

## Evidence and media

- AIUM fetal echocardiography: https://doi.org/10.1002/jum.15188
- ASE 2023: https://www.asecho.org/wp-content/uploads/2023/07/PIIS0894731723002067-1.pdf
- ISUOG CNS Part 2: https://www.isuog.org/static/b91bae06-731b-4a2d-8bbcbb2f0d886af4/ISUOG-Practice-Guidelines-CNS-part-2-targeted-neurosonography.pdf
- AIUM detailed first trimester: https://www.aium.org/docs/default-source/resources/guidelines/obstetric_detailed_1st.pdf
- ISUOG 11–14 weeks: https://www.isuog.org/static/a8d6dee2-38d8-4d66-8be3929af48e8369/Updated-ISUOG-Practice-Guidelines-performance-of-11-14-week-ultrasound-scan.pdf
- AIUM standard obstetric 2024: https://doi.org/10.1002/jum.16406

23/26 entries have a matching-trimester or explicitly age-unspecified method reference. Third-trimester low/high SAX and PA bifurcation have no phase-matched image; do not substitute second-trimester photographs. Unavailable alternate directions remain hidden.

Newly extracted originals: CNS PDF page 6 image object 82 = Figure 7 conus (500×278); ISUOG first-trimester PDF page 7 object 135 = complete Figure 2 (2000×3736), display region [0,1070,778,510] selects panel g only. Rendered PDF pages and browser display reviewed. Credits preserve ISUOG copyright. Existing coronal four-panel and sagittal photos remain isolated by caption.

## 3D limits and checks

Heart planes use actual chamber/valve/vascular mesh centers in the registered HRA model. Restore four pulmonary vein meshes from the original donor GLB before removing its unused vascular parent. New schematic pulmonary venous connections are teaching geometry. Short-axis normal follows LV-to-mitral axis, with separate ventricular and aortic-root levels. Confirm intersections with both ventricles, aortic valve/trunk, bilateral PA branches, LA and bilateral inferior PV meshes. These are adult-donor educational sections, not clinically validated fetal ultrasound planes.

Brain coronal normals are perpendicular to the registered axial reference and the left–right axis; anterior-to-posterior levels are separate. Median planes share the midline but frame different target regions. No corpus callosum, vermis, IT or conus segmentation is claimed. Conus displays spinal sagittal context with an explicit limitation; use its actual ultrasound for the cord endpoint. Placental insertion is anchored to the synthetic pregnancy model's actual cord endpoint. RNT uses an approximate facial context plane and discloses absent bone segmentation.

Validation: extended-view-tests.mjs, tests.mjs, direction-tests.mjs, ultrasound-tests.mjs, supplement-learning-tests.mjs, research/organ-validation.mjs. Browser selected all 12 second-trimester extensions; no console errors. Reviewed first-trimester panel g crop. Camera is not reset on lesson changes; same-organ distinct lesson IDs reset only plane adjustments.
