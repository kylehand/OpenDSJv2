# -*- coding: utf-8 -*-
"""
Created on Fri Oct 17 11:22:47 2014

@author: Vivek
"""

import xlrd
import csv
import os




def main():
    path = '/Users/Vivek/Github/OpenDSJv2/R/hurtmedata'
    os.chdir(path)
    
    #wb = xlrd.open_workbook('efile_CSJ_2014_oct_17.xlsx')
    wb = xlrd.open_workbook('efile_CSJ_2014.xlsx')
    
    #    wb = xlrd.open_workbook('efile_newest_CSJ_2014.xlsx')
    sh = wb.sheet_by_name('A-Contributions')
    your_csv_file = open('A-Contributions.csv', 'wb')
    wr = csv.writer(your_csv_file, quoting=csv.QUOTE_ALL)
    
    for rownum in xrange(sh.nrows):
        wr.writerow(sh.row_values(rownum))
    
    your_csv_file.close()



if __name__ == '__main__':
    main()
