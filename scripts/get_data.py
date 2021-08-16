#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import json
import datetime
import time
from urllib.request import urlopen
from dateutil import parser
import unidecode
import re

dateOld = []
confirmedOld = []
recoveredOld = []
deathsOld = []
treatmentOld = []
genderOld = []
vaccinatedDateOld = []
vaccinatedPartlyOld = []
vaccinatedFullyOld = []
populationTotal = 43900000
totalOfficialStats = []
provinces = {}
totalDate = ''
provincesDate = ''

def getWilayaStats():
    global provincesDate

    with open('src/data-wilaya.txt') as f:
        for lineNumber, line in enumerate(f):
            if lineNumber == 0:
                provincesDate = datetime.datetime.strptime(line.strip(), '%Y-%m-%d').date()
                continue

            wilaya = line.strip().split(':')
            pName = wilaya[0].replace('📌', '').strip()
            pStats = re.findall(r'\d+', wilaya[1])
            pConfirmed = pNewConfirmed = 0

            if (len(pStats) == 1):
                pNewConfirmed = int(pStats[0])
            elif (len(pStats) == 2):
                pConfirmed = int(pStats[0])
                pNewConfirmed = int(pStats[1])
            pId = ''

            if pName == 'عين الدفلى':
                pId = 'AIN DEFLA'
            elif pName == 'عين تموشنت':
                pId = 'AIN TEMOUCHENT'
            elif pName == 'أدرار':
                pId = 'ADRAR'
            elif pName == 'الجزائر':
                pId = 'ALGER'
            elif pName == 'عنابة':
                pId = 'ANNABA'
            elif pName == 'بشار':
                pId = 'BECHAR'
            elif pName == 'بجاية':
                pId = 'BEJAIA'
            elif pName == 'باتنة':
                pId = 'BATNA'
            elif pName == 'بسكرة':
                pId = 'BISKRA'
            elif pName == 'البليدة':
                pId = 'BLIDA'
            elif pName == 'برج بوعريريج':
                pId = 'BORDJ BOU ARRERIDJ'
            elif pName == 'البويرۃ' or pName == 'البويرة':
                pId = 'BOUIRA'
            elif pName == 'بومرداس':
                pId = 'BOUMERDES'
            elif pName == 'الشلف':
                pId = 'CHLEF'
            elif pName == 'قسنطينة':
                pId = 'CONSTANTINE'
            elif pName == 'الجلفة':
                pId = 'DJELFA'
            elif pName == 'البيض':
                pId = 'EL BAYADH'
            elif pName == 'الوادي':
                pId = 'EL OUED'
            elif pName == 'الطارف':
                pId = 'EL TARF'
            elif pName == 'غرداية':
                pId = 'GHARDAIA'
            elif pName == 'قالمة':
                pId = 'GUELMA'
            elif pName == 'إيليزي':
                pId = 'ILLIZI'
            elif pName == 'جيجل':
                pId = 'JIJEL'
            elif pName == 'خنشلة':
                pId = 'KHENCHELA'
            elif pName == 'الأغواط':
                pId = 'LAGHOUAT'
            elif pName == 'المسيلة':
                pId = "M'SILA"
            elif pName == 'المدية':
                pId = 'MEDEA'
            elif pName == 'معسكر':
                pId = 'MASCARA'
            elif pName == 'ميلة':
                pId = 'MILA'
            elif pName == 'مستغانم':
                pId = 'MOSTAGANEM'
            elif pName == 'النعامة':
                pId = 'NAAMA'
            elif pName == 'وهران':
                pId = 'ORAN'
            elif pName == 'ورقلة':
                pId = 'OUARGLA'
            elif pName == 'أم البواقي':
                pId = 'OUM EL BOUAGHI'
            elif pName == 'غليزان':
                pId = 'RELIZANE'
            elif pName == 'سطيف':
                pId = 'SETIF'
            elif pName == 'سعيدة':
                pId = 'SAIDA'
            elif pName == 'سيدي بلعباس':
                pId = 'SIDI BEL ABBES'
            elif pName == 'سكيكدة':
                pId = 'SKIKDA'
            elif pName == 'سوق أهراس':
                pId = 'SOUK AHRAS'
            elif pName == 'تبسة':
                pId = 'TEBESSA'
            elif pName == 'تمنراست':
                pId = 'TAMANGHASSET'
            elif pName == 'تيارت':
                pId = 'TIARET'
            elif pName == 'تندوف':
                pId = 'TINDOUF'
            elif pName == 'تيبازة':
                pId = 'TIPAZA'
            elif pName == 'تيسمسيلت':
                pId = 'TISSEMSILT'
            elif pName == 'تيزي وزو':
                pId = 'TIZI OUZOU'
            elif pName == 'تلمسان':
                pId = 'TLEMCEN'

            if (provincesDate >= datetime.date.today()):
                provinces[pId]['confirmed'] = provinces[pId]['confirmed'] + pNewConfirmed if pConfirmed == 0 else pConfirmed
            provinces[pId]['new_confirmed'] = pNewConfirmed
            if pNewConfirmed > 0 and provincesDate == totalDate:
                provinces[pId]['last_reported'] = provincesDate.strftime('%Y-%m-%d')

            # print(pName, provinces[pId]['confirmed'], provinces[pId]['new_confirmed'])

def getTotalStats():
    global totalDate
    with open('src/data-total.txt') as f:
        lines = f.readlines()
    usefulData = []
    usefulData.append({
        'new_confirmed': int(lines[1]),
        'new_recovered': int(lines[2]),
        'new_deaths': int(lines[3]),
        'critical': int(lines[4]),
        'man': genderOld[0],
        'woman': genderOld[1]
    })
    totalDate = datetime.datetime.strptime(lines[0].strip(), '%Y-%m-%d').date()

    # print(usefulData, totalDate)

    global totalOfficialStats
    totalOfficialStats = usefulData[0]


def readData():
    global dateOld, confirmedOld, recoveredOld, deathsOld, treatmentOld, provinces, genderOld, ageConfirmedOld, ageDeathsOld, vaccinatedDateOld, vaccinatedPartlyOld, vaccinatedFullyOld
    with open('src/data.js') as f:
        for line in f:
            if(line.startswith('export const date')):
                dateOld = line[line.find("[")+1:line.find("]")].replace("'", "").split(', ')
            elif(line.startswith('export const confirmed')):
                confirmedOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('export const recovered')):
                recoveredOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('export const deaths')):
                deathsOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('export const treatment')):
                treatmentOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('export const vaccinatedDate')):
                vaccinatedDateOld = line[line.find("[")+1:line.find("]")].replace("'", "").split(', ')
            elif(line.startswith('export const vaccinatedPartly')):
                vaccinatedPartlyOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('export const vaccinatedFully')):
                vaccinatedFullyOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('export const genderData')):
                genderOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('export const ageConfirmedData')):
                ageConfirmedOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('export const ageDeathsData')):
                ageDeathsOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('  "')):
                p = json.loads('{'+line[line.find("{")+1:line.find("}")].replace(': ', '": "').replace(', ', '", "').replace('""', '"').replace(' id', ' "id')+'}')
                pName = unidecode.unidecode(line[line.find('"')+1:line.find('":')]).upper()
                provinces[pName] = {}
                provinces[pName]['id'] = int(p['id'])
                provinces[pName]['name'] = line[line.find('"')+1:line.find('":')]
                provinces[pName]['confirmed'] = int(p['confirmed'])
                provinces[pName]['recovered'] = int(p['recovered'])
                provinces[pName]['deaths'] = int(p['deaths'])
                provinces[pName]['new_confirmed'] = 0
                provinces[pName]['new_recovered'] = 0
                provinces[pName]['new_deaths'] = 0
                provinces[pName]['reported'] = p['reported']
                provinces[pName]['last_reported'] = p['last_reported']


def updateData():
    print(datetime.datetime.now(), ': update data')
    lastDate = parser.parse(dateOld[-1]).date()
    if(lastDate < totalDate):
        print('new day:', totalDate)
        dateOld.append(totalDate.strftime('%-m/%-d/%y'))
        confirmedOld.append(confirmedOld[-1] + totalOfficialStats['new_confirmed'])
        recoveredOld.append(recoveredOld[-1] + totalOfficialStats['new_recovered'])
        deathsOld.append(deathsOld[-1] + totalOfficialStats['new_deaths'])
    else:
        print('modifying day:', lastDate)
        confirmedOld[-1] = confirmedOld[-2] + totalOfficialStats['new_confirmed']
        recoveredOld[-1] = recoveredOld[-2] + totalOfficialStats['new_recovered']
        deathsOld[-1] = deathsOld[-2] + totalOfficialStats['new_deaths']

    finalData = ('export const date = ' + str(dateOld)
                 + '\nexport const confirmed = ' + str(confirmedOld)
                 + '\nexport const recovered = ' + str(recoveredOld)
                 + '\nexport const deaths = ' + str(deathsOld)
                 + '\nexport const treatment = ' + str(treatmentOld)
                 + '\nexport const vaccinatedDate = ' + str(vaccinatedDateOld)
                 + '\nexport const vaccinatedPartly = ' + str(vaccinatedPartlyOld)
                 + '\nexport const vaccinatedFully = ' + str(vaccinatedFullyOld)
                 + '\nexport const critical = ' + str(totalOfficialStats['critical'])
                 + "\nexport const gender = ['Male', 'Female']"
                 + '\nexport const genderData = ['+str(totalOfficialStats['man'])+', ' + str(totalOfficialStats['woman'])+']'
                 + "\nexport const age = ['< 1', '1 - 14', '15 - 24', '25 - 49', '50 - 59', '+60', 'N/A']"
                 + '\nexport const ageConfirmedData = ' + str(ageConfirmedOld)
                 + '\nexport const ageDeathsData = ' + str(ageDeathsOld)
                 + '\nexport const populationTotal = ' + str(populationTotal)
                 + "\nexport const lastUpdated = '" + datetime.datetime.now().strftime('%Y-%m-%d %H:%M') + "'"
                 + '\nexport const provinces = {\n')

    for p_id, p in provinces.items():
        finalData += '  "'+p['name']+'": { id: '+str(p['id'])+', confirmed: '+str(p['confirmed'])+', recovered: '+str(p['recovered'])+', deaths: '+str(p['deaths'])+', new_confirmed: '+str(p['new_confirmed'])+', new_recovered: '+str(p['new_recovered'])+', new_deaths: '+str(p['new_deaths'])+', reported: "'+str(p['reported'])+'", last_reported: "'+str(p['last_reported'])+'" },\n'

    finalData = finalData[:-2] + '\n}'
    with open("src/data.js", "w") as dataFile:
        print("{}".format(finalData), file=dataFile)

    print('confirmed:', confirmedOld[-1], 'deaths:', deathsOld[-1], 'recovered:', recoveredOld[-1], 'new_confirmed:', totalOfficialStats['new_confirmed'], 'new_deaths:', totalOfficialStats['new_deaths'])
    print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), ': data updated')


def main():
    readData()
    getTotalStats()
    getWilayaStats()
    updateData()

if __name__ == '__main__':
    main()
