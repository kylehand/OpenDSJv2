#Written by Lynna and Vivek
#See OpenDSJ (v1) for details.

#https://github.com/dilshod/xlsx2csv
#cd ~/Github/OpenDSJv2/R
#http://www.zamzar.com/uploadComplete.php?convertFile=xlsx&to=csv
#python ~/anaconda/lib/python2.7/site-packages/xlsx2csv.py efile_newest_CSJ_2014.xlsx ~

#You can run the below as is to get the comma separate txt file with the info you need

#Choose the cut off date where the amt contributed is for the runoff (not for the primary).
#The contributions given strictly after this date is considered for the runoff 
cutOffDate <- as.Date(as.character("2014-06-05"))  #The date has to be input in YYYY-MM-DD format
options(java.parameters = "-Xmx1024m")


library(zipcode)
library(plyr)
library(Hmisc)

#A.Contributions.Table.1 <- read.csv("~/Dropbox/opendisclosure/City Data/2014_CSJ/A-Contributions-Table 1.csv", stringsAsFactors=FALSE)
#efile_newest_CSJ_2013_A_contributions <- read.csv("~/Dropbox/opendisclosure/City Data/2013_CSJ/efile_newest_CSJ_2013_A_contributions.csv", stringsAsFactors=FALSE)

#A.Contributions.Table.1 <- read.csv("~/Github/OpenDSJv2/R/hurtmedata/A-Contributions.csv", stringsAsFactors=FALSE)
efile_newest_CSJ_2013_A_contributions <- read.csv("~/Github/OpenDSJv2/R/efile_newest_CSJ_2013_A_contributions.csv", stringsAsFactors=FALSE)

library(XLConnect)
setwd('~/Github/OpenDSJv2/R/hurtmedata/')
wb1 <- loadWorkbook("efile_newest_CSJ_2014.xlsx")
A.contri <- readWorksheet(wb1, sheet = 1)

A.Contributions.Table.1 <- A.contri

setwd("~/Github/OpenDSJv2/R")

#View(A.Contributions.Table.1)
#View(efile_newest_CSJ_2013_A_contributions)
mayor2013<-efile_newest_CSJ_2013_A_contributions
mayor2014 <- A.Contributions.Table.1
#cleaning dates
#something is wrong with dates in df mayor2014



mayor2013$Thru_Date <- as.Date(as.character(mayor2013$Thru_Date), "%m/%d/%Y")
mayor2013$Rpt_Date <- as.Date(as.character(mayor2013$Rpt_Date), "%m/%d/%Y")
mayor2013$From_Date <- as.Date(as.character(mayor2013$From_Date), "%m/%d/%Y")
mayor2013$Tran_Date <- as.Date(as.character(mayor2013$Tran_Date), "%m/%d/%Y")


mayor2014$Thru_Date <- as.Date(mayor2014$Thru_Date)
mayor2014$Rpt_Date <- as.Date(mayor2014$Rpt_Date)
mayor2014$From_Date <- as.Date(mayor2014$From_Date)
mayor2014$Tran_Date <- as.Date(mayor2014$Tran_Date)


combo <- data.frame(stringsAsFactors=FALSE)
combo <- rbind(mayor2013, mayor2014)

#cleaning zipcodes
#combo$Tran_Zip4
combo$Tran_Zip4 <- as.character(combo$Tran_Zip4)

#Need to take care of case where "95132-"
#clean.zipcodes doesn't take care of cases with "-" at the end.  Instead, it returns NA's
#Though 95132-2110 is cleaned to 95132
for(i in 1:nrow(combo)) {                 #takes a few mins
  if(nchar(combo$Tran_Zip4[i]) == 6)    #looking for cases only when zipcode is 6 char long
  {
    combo$Tran_Zip4[i] <- gsub("-.*","",combo$Tran_Zip4[i])
  }
}
combo$Tran_Zip4 <- clean.zipcodes(combo$Tran_Zip4)


somemayors <- data.frame(combo$Filer_NamL, combo$Filer_ID, combo$Rpt_Date, combo$From_Date, combo$Tran_Date, combo$Tran_ID, combo$Tran_NamL, combo$Tran_Zip4, combo$Tran_City, combo$Tran_State, combo$Tran_Amt1)

str(somemayors)
mayors <- rename(somemayors, c("combo.Filer_NamL"="Cands", "combo.Filer_ID"="ID", "combo.Rpt_Date"="RDate", "combo.From_Date" = "FDate", "combo.Tran_Date"="TDate",  "combo.Tran_ID" = "TranID","combo.Tran_NamL" = "TranName",
                               "combo.Tran_Zip4"="Zip", "combo.Tran_City"="City", "combo.Tran_State"="State", "combo.Tran_Amt1"="Amt1")) 


########### Now, we use "mayors" dataframe to aggregate the contributions for the primary #############

primaryCandidates <- aggregate(Amt1 ~ Zip + ID + TDate, 
                               data = mayors[(mayors$TDate <= cutOffDate),], FUN = sum)

#primaryColorBucket <- as.numeric(cut2(primaryCandidates$Amt1, g = 7))

#Color Subs


giveitnewcolors <- function(bucket_me){
  bucketed <- numeric()
  bucketed <- as.numeric(cut2(bucket_me, g = 7))
  color <- numeric()
  color[1:7] = c('#ffffb2', '#fed976', '#feb24c', '#fd8d3c','#fc4e2a', '#e31a1c',  '#b10026')
  newColors <- ifelse(bucketed==1, color[1],
                      ifelse(bucketed == 2, color[2], 
                             ifelse(bucketed == 3, color[3], 
                                    ifelse(bucketed == 4, color[4], 
                                           ifelse(bucketed == 5, color[5], 
                                                  ifelse(bucketed == 6, color[6], 
                                                         color[7]))))))  
  return(newColors)
}



#primaryCandidates[5] <- newColors
#colnames(primaryCandidates)[5] <-'color'

primaryCandidates$TDate <- max(primaryCandidates$TDate)

#primaryCandidates$Tdate <- cutOffDate


#For Nguyen
nguyen <- primaryCandidates[primaryCandidates$ID == 1359805, ] 
nguyen[5] <- giveitnewcolors(nguyen$Amt1)
colnames(nguyen)[5] <-'color'
nguyen$firstCol <- "primary"
nguyen$secCol <- "Nguyen"
nguyen$ID <- NULL
nguyen <- nguyen[ , c(5, 6, 2, 1, 3, 4)] #Reorder

#For Liccardo
liccardo <- primaryCandidates[primaryCandidates$ID == 1361139, ] 
liccardo[5] <- giveitnewcolors(liccardo$Amt1)
colnames(liccardo)[5] <-'color'
liccardo$firstCol <- "primary"
liccardo$secCol <- "Liccardo"
liccardo$ID <- NULL
liccardo <- liccardo[ , c(5, 6, 2, 1, 3, 4)] #Reorder

#For Oliverio
oliverio <- primaryCandidates[primaryCandidates$ID == 1362117, ] 
oliverio[5] <- giveitnewcolors(oliverio$Amt1)
colnames(oliverio)[5] <-'color'
oliverio$firstCol <- "primary"
oliverio$secCol <- "Oliverio"
oliverio$ID <- NULL
oliverio <- oliverio[ , c(5, 6, 2, 1, 3, 4)] #Reorder

#For Cortese
cortese <- primaryCandidates[primaryCandidates$ID == 1362187, ] 
cortese[5] <- giveitnewcolors(cortese$Amt1)
colnames(cortese)[5] <-'color'
cortese$firstCol <- "primary"
cortese$secCol <- "Cortese"
cortese$ID <- NULL
cortese <- cortese[ , c(5, 6, 2, 1, 3, 4)] #Reorder

#For Herrera
herrera <- primaryCandidates[primaryCandidates$ID == 1362068, ]
herrera[5] <- giveitnewcolors(herrera$Amt1)
colnames(herrera)[5] <-'color'
herrera$firstCol <- "primary"
herrera$secCol <- "Herrera"
herrera$ID <- NULL
herrera <- herrera[ , c(5, 6, 2, 1, 3, 4)] #Reorder


#################### Then, for the runoff ####################

runOffCandidates <- aggregate(Amt1 ~ Zip + ID + TDate, 
                               data = mayors, FUN = sum)

#runOffCandidates <- aggregate(Amt1 ~ Zip + ID + TDate, 
#                              data = mayors[(mayors$TDate > cutOffDate),], FUN = sum)



#primaryColorBucket <- numeric()
#primaryColorBucket <- as.numeric(cut2(runOffCandidates$Amt1, g = 7))

#Color Subs
#color <- numeric()
#color[1:7] = c('#ffffb2', '#fed976', '#feb24c', '#fd8d3c','#fc4e2a', '#e31a1c',  '#b10026')

#runOffCandidates[5] <- newColors
#colnames(runOffCandidates)[5] <-'color'

runOffCandidates$TDate <- max(runOffCandidates$TDate)


#For Liccardo
liccardoRunOff <- runOffCandidates[runOffCandidates$ID == 1361139, ] 
liccardoRunOff[5] <- giveitnewcolors(liccardoRunOff$Amt1)
colnames(liccardoRunOff)[5] <-'color'
liccardoRunOff$firstCol <- "runoff"
liccardoRunOff$secCol <- "Liccardo"
liccardoRunOff$ID <- NULL
liccardoRunOff <- liccardoRunOff[ , c(5, 6, 2, 1, 3, 4)] #Reorder

#For Cortese
corteseRunOff <- runOffCandidates[runOffCandidates$ID == 1362187, ]
corteseRunOff[5] <- giveitnewcolors(corteseRunOff$Amt1)
colnames(corteseRunOff)[5] <-'color'
corteseRunOff$firstCol <- "runoff"
corteseRunOff$secCol <- "Cortese"
corteseRunOff$ID <- NULL
corteseRunOff <- corteseRunOff[ , c(5, 6, 2, 1, 3, 4)] #Reorder


#################### Row-bind everything ######################
summaryInfo <- rbind(nguyen, liccardo, oliverio, cortese, herrera, liccardoRunOff, corteseRunOff)


write.table(summaryInfo, "summaryInfo.txt", quote=FALSE, sep="," , row.names=FALSE, col.names=FALSE)

getwd() #find summaryInfo.txt
