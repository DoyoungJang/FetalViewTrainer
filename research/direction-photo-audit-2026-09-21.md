# Additional-direction photo search (v43)

Searched journals, publisher figures, university-hosted originals, society publications and educational internet resources. Each included image was checked against its caption and visually inspected. This is an image-library update, not a claim that every exploratory direction is a guideline-required view.

## Included sources

* Bethune et al. (2013), *A pictorial guide for the second trimester ultrasound*, DOI [10.1002/j.2205-0140.2013.tb00106.x](https://doi.org/10.1002/j.2205-0140.2013.tb00106.x). Figures 5, 6, 7, 10, 15: midsagittal brain, coronal cerebellum, coronal orbits, transverse upper lip/palate, coronal situs. Extracted unchanged image objects from the [University of Padua PDF](https://www.sdb.unipd.it/sites/sdb.unipd.it/files/AJUM-2013%20US%202%20trim.pdf). The right ultrasound panels are displayed without their adjacent drawings. Individual scan ages are not stated; the source is explicitly a second-trimester examination guide. Copyright ASUM, not represented as Creative Commons.
* Kim et al. (2023), *Prenatal screening for neural tube defects*, DOI [10.5468/ogs.22263](https://doi.org/10.5468/ogs.22263). Figure 2C: normal lumbar axial image, 25 weeks. Figure 4C: normal lumbosacral coronal image, 25 weeks. PDF image objects contain these individual panels; retained without altering pixels. CC BY-NC 3.0. Figure 5 pathological examples and Figure 4D 3D reconstruction excluded.
* Leibovitz et al. (2022), *Fetal Brain Development: Regulating Processes and Related Malformations*, DOI [10.3390/life12060809](https://doi.org/10.3390/life12060809). Figure 12B: normal midsagittal ultrasound, 28 weeks; Figure 13A: normal coronal brain, 24 weeks. Publisher PNGs retained whole, CSS displays only the normal ultrasound panel. Specimens and abnormal cases excluded from the learning viewport. CC BY 4.0. Third-trimester vermis use explicitly labelled anatomical reference, not dedicated enlarged vermian biometry. Coronal ventricle use identifies anterior horns, not atrial measurement.
* Nguyen et al. (2014), *Multidisciplinary consensus on the classification of prenatal and postnatal urinary tract dilation*, DOI [10.1016/j.jpurol.2014.10.002](https://doi.org/10.1016/j.jpurol.2014.10.002). [SMFM-hosted PDF](https://s3.amazonaws.com/cdn.smfm.org/publications/228/download-562e2b095ab66ccd11e33779e7393dcb.pdf), p. 8, Figure 1: normal kidneys at 32 weeks. A axial, B sagittal. Preserved complete original figure and display relevant panel. CC BY-NC-ND 3.0 stated on first page. Added missing third-trimester standard renal axial photo as well as alternate renal directions.

All file dimensions, SHA-256 checksums, attribution, crop rectangles and age caveats are recorded in `dist/direction-figures.js` and `dist/direction-ultrasound.js`.

## Search exclusions / unresolved areas

* Eye papers frequently returned MRI, postnatal ocular ultrasound, or a midsagittal facial profile rather than a parasagittal eye view. None were relabelled as fetal orbit parasagittal ultrasound.
* Search results for third-trimester coronal kidneys included pathological kidneys or MRI; no matching normal ultrasound was added.
* MedlinePlus normal spine/ribs at 30 weeks and Chiang Mai University normal spine resources were located, but a caption establishing the required additional direction and trimester together was not confirmed for a new match.
* Limb orthogonal long/short axes, generic cardiac coronal/sagittal directions, and cervical/placental alternative directions remain unmatched where a trustworthy normal, age-compatible image was not established.

## Coverage and checks

10 new source image files. Standard lessons: 87/107 have an image (previously 86). Alternate direction selections: 24/172 have matched images (previously 9; +15). Some selections deliberately share a relevant anatomical panel, with specific limits stated. Remaining selections retain explicit missing-image states rather than another trimester or direction.

Validated source files/checksums, crop bounds, trimester matching, excluded pathological panels, all 107 standard lesson rendering contracts and all 172 additional direction contracts. Browser inspection confirmed coronal orbit and normal 28-week midsagittal brain crops.
