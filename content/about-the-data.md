---
title: About The Data
---
Increasing transparency in the criminal justice system is of vital importance to us at the Texas Justice Initiative. Our work relies on the use of information that can be released to the public.

Currently on our website, **we compile data about three main incident types that occur in Texas**:

1. **Injury of officer(s) and/or civilian(s):** Any shooting of or by a Texas peace officer, occurring while the officer is on- or off-duty, causing an injury.
2. **Death of officer(s) and/or civilian(s):** Any fatal shooting of or by a Texas peace officer, occurring while the officer is on- or off-duty.
3. **Death in custody:** Any death of an individual while they are in a penal institution, in the custody of a peace officer or as a result of a peace officer’s use of force, in a jail, correctional facility, or state juvenile facility dies.

After an incident, the governmental agency in which it occurred (i.e. a county jail etc.) is required to file a report for the respective incident (**[1](https://drive.google.com/file/d/1qRRN6HJpVTXvo4G5MzJGLwAHSPEHvNNR/view)**, **[2](https://drive.google.com/open?id=1iBJQ6zl1UQOEUnd18Krb9PnZEL8Nd0kY)**, **[3](https://drive.google.com/file/d/1MEEDDiIHfXdi6yM7bYoN8bROa8iYh8vP/view)**) with the Texas Office of the Attorney General (OAG) within 30 days.

![Diagram showing the process that begins once an incident occurs and ends when the Office of the Attorney General publishes a report](https://res.cloudinary.com/texas-justice-initiative/image/upload/v1624899517/TJI_pipeline_Part1_5_30_c1ujxw.svg)

The Texas OAG publishes the raw .PDFs of these reports. Through open records requests filed monthly, TJI obtains data from the reports through the Texas OAG.

We then clean, analyze, and present the data to the public – both in the form of a full data set and in comparative graphics – through our analysis pipeline.

Our analysis pipeline is summarized below. The scripts we use in the analysis pipeline can be found on [our GitHub page](https://github.com/texas-justice-initiative).

## TJI's Analysis Pipeline

![Diagram showing Texas Justice Initiative's data pipeline](https://res.cloudinary.com/texas-justice-initiative/image/upload/v1585343157/TJI_pipeline_Part2_vert_v4_mode_f3qkn5.svg)

## Generated datasets

The following are some more detailed descriptions of our current datasets, which are generated through the processing pipeline as shown above.

### Officer-involved shootings

This data set reflects information included in reports filed with the [Office of the Attorney General (OAG)](https://texasattorneygeneral.gov/) since Sept. 1, 2015. State law requires agencies to report all shootings [of](https://drive.google.com/file/d/1MEEDDiIHfXdi6yM7bYoN8bROa8iYh8vP/view?usp=sharing) and [by](https://drive.google.com/file/d/1iBJQ6zl1UQOEUnd18Krb9PnZEL8Nd0kY/view?usp=sharing) officers to the state within 30 days. Since the state law went into effect, we have found [dozens](https://www.mystatesman.com/news/crime--law/state-database-officer-involved-shootings-missing-cases/0kajkOgm3kQ6Q5Sy8pCxgI/) of unreported incidents. In 2017, lawmakers amended state law to impose potential penalties when agencies do not properly file their reports. Since failure to properly report incidents can lead to a [$1,000-a-day fine](https://capitol.texas.gov/tlodocs/85R/billtext/pdf/HB00245F.pdf#navpanes=0), agencies have generally filed their reports upon being notified that the report was missing.

*Access and download TJI’s officer-involved shootings data [here](https://data.world/tji/officer-involved-shootings/workspace/project-summary). The data is updated monthly.*

### Custodial deaths

For decades, Texas has required law enforcement agencies, local jails, and the Texas Department of Criminal Justice [to report to the OAG](https://drive.google.com/file/d/1qRRN6HJpVTXvo4G5MzJGLwAHSPEHvNNR/view?usp=sharing) every time a person dies in their custody. This includes deaths during an arrest, suicides in state and local lock-ups and deaths by natural causes, like an illness or disease. [Failing to report a death](https://statutes.capitol.texas.gov/Docs/PE/htm/PE.39.htm) can be a criminal offense – a Class B misdemeanor – though it never is.

Although the requirement has been in place for decades, reporting was sporadic and inconsistent until 2005. Then, the state streamlined reporting and [in 2016](https://www.chron.com/news/houston-texas/houston/article/police-custody-deaths-database-texas-10781199.php), the reports were made publicly available in [a searchable online catalog](https://oagtx.force.com/cdr/cdrreportdeaths). TJI’s data set includes reports dating back to the 1980s, but only after 2005 do the records represent a complete set.

*Access and download TJI’s custodial death data [here](https://data.world/tji/deaths-in-custody/workspace/project-summary). This data was obtained through an open records request for data on deaths reported through May 1, 2018.*

**\*A note about this set:** For years, until January 2013, the Texas Department of Criminal Justice (TDCJ) reported all deaths to the Bureau of Justice Statistics [but only reported some deaths](http://gritsforbreakfast.blogspot.com/2014/12/tdcj-reporting-change-explains-death-in.html) to the OAG . To capture those deaths, too, TJI has added data that TDCJ filed with BJS from 2005-2013 to our data from the OAG.*

### Future Datasets

TJI is currently acquiring and analyzing more data sets, and we’re always on the lookout for more. Stay tuned as we release more reports and complete data sets in the future, and please email info@texasjusticeinitiative.org if you know of a data set we should include.