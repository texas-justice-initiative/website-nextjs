---
title: "Are Texas’ Custodial Deaths Accurately Reported to the Feds? "
date: 2025-06-08
topics:
  - data oversight
  - law enforcement
authors:
  - Bergan Casey
  - Kaitlyn Wallace
  - Eva Ruth Moravec
hero: https://res.cloudinary.com/texas-justice-initiative/image/upload/v1714685224/AVLogo_voqabx.jpg
---
As part of a project supported by Arnold Ventures,  TJI recently compared state-held data on deaths in custody with the federal data collected under the [Death in Custody Reporting Act (DCRA)](https://bja.ojp.gov/program/dcra/reported-data#:~:text=The%20Death%20in%20Custody%20Reporting,the%20process%20of%20being%20arrested), to determine whether the data sets are the same. It is crucial to ensure that data on deaths in custody is recorded completely and accurately - without this data, there is no way to identify systemic issues and ensure accountability in a system that is funded by taxpayers and is responsible for people’s lives.  

Every month, TJI submits open records requests to the Texas Office of the Attorney General (OAG)  to collect data on custodial deaths in Texas. The data arrives via a spreadsheet, sans one column that is only available in individual reports on deaths, posted on the state’s website in PDF format. We load the data into our database, and post it [on our website](https://texasjusticeinitiative.org/data) for others to use. Our process and methodology for this data can be found [here](https://texasjusticeinitiative.org/about-the-data). 

Obtaining the federal data was trickier. After a bit of a runaround, we determined that the Bureau of Justice Assistance also [submits open records requests](https://bja.ojp.gov/doc/dcra-plan-tx.pdf) each quarter to the OAG for the data, which is released in an Excel spreadsheet and federal administrators review it, sort and clean it, and input it into an internal system.

Then, federal officials review and verify the data,  but unlike when TJI may find an error — in which case, we contact the agency and suggest that they file an amended report, and, in some cases, alert the OAG to the error, often leading eventually to corrected data — corrections at the federal level are not made to the state data sets.  State and local entities are responsible for submitting updated information on deaths, and federal and state officials work together to extract new data when necessary. 

To compare the two sets, TJI used Jupyter Notebooks and a Python scripting code to consolidate data and  then identify and remove duplicate records. We were able to match records with similar identifiers such as name, date of birth and  death date. Overall, the data matched — we were able to determine that all individuals found in the CDR data also appeared in the federally published data. This tells us that there were no unaccounted deaths between the two datasets, which makes sense — since it appears that the DCRA data submitted by Texas comes directly from the OAG’s data set. **Only in a small number of cases (1%), we identified differences in decedent information between the two datasets.** 

Interestingly, soon after TJI downloaded custodial death data spanning 2020 to 2023 from the BJA website, the datasets became unavailable and could no longer be accessed. The data is still visible in limited charts [on the BJA website](https://bja.ojp.gov/program/dcra/reported-data), but underlying data is not extractable.  We do not know why this change took place, and TJI will periodically check back to see if the data is re-released. Not having the raw data available for download renders it less useful to researchers wanting to examine the data further.