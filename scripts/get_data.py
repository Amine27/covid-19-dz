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
            pConfirmed = int(pStats[0])
            pNewConfirmed = int(pStats[1])
            # print(pName, pConfirmed, pNewConfirmed)
            if pName == 'عين الدفلى':
                provinces['AIN DEFLA']['confirmed'] = pConfirmed
                provinces['AIN DEFLA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['AIN DEFLA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'عين تموشنت':
                provinces['AIN TEMOUCHENT']['confirmed'] = pConfirmed
                provinces['AIN TEMOUCHENT']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['AIN TEMOUCHENT']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'أدرار':
                provinces['ADRAR']['confirmed'] = pConfirmed
                provinces['ADRAR']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['ADRAR']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'الجزائر':
                provinces['ALGER']['confirmed'] = pConfirmed
                provinces['ALGER']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['ALGER']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'عنابة':
                provinces['ANNABA']['confirmed'] = pConfirmed
                provinces['ANNABA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['ANNABA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'بشار':
                provinces['BECHAR']['confirmed'] = pConfirmed
                provinces['BECHAR']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['BECHAR']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'بجاية':
                provinces['BEJAIA']['confirmed'] = pConfirmed
                provinces['BEJAIA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['BEJAIA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'باتنة':
                provinces['BATNA']['confirmed'] = pConfirmed
                provinces['BATNA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['BATNA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'بسكرة':
                provinces['BISKRA']['confirmed'] = pConfirmed
                provinces['BISKRA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['BISKRA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'البليدة':
                provinces['BLIDA']['confirmed'] = pConfirmed
                provinces['BLIDA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['BLIDA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'برج بوعريريج':
                provinces['BORDJ BOU ARRERIDJ']['confirmed'] = pConfirmed
                provinces['BORDJ BOU ARRERIDJ']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['BORDJ BOU ARRERIDJ']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'البويرۃ':
                provinces['BOUIRA']['confirmed'] = pConfirmed
                provinces['BOUIRA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['BOUIRA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'بومرداس':
                provinces['BOUMERDES']['confirmed'] = pConfirmed
                provinces['BOUMERDES']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['BOUMERDES']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'الشلف':
                provinces['CHLEF']['confirmed'] = pConfirmed
                provinces['CHLEF']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['CHLEF']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'قسنطينة':
                provinces['CONSTANTINE']['confirmed'] = pConfirmed
                provinces['CONSTANTINE']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['CONSTANTINE']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'الجلفة':
                provinces['DJELFA']['confirmed'] = pConfirmed
                provinces['DJELFA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['DJELFA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'البيض':
                provinces['EL BAYADH']['confirmed'] = pConfirmed
                provinces['EL BAYADH']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['EL BAYADH']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'الوادي':
                provinces['EL OUED']['confirmed'] = pConfirmed
                provinces['EL OUED']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['EL OUED']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'الطارف':
                provinces['EL TARF']['confirmed'] = pConfirmed
                provinces['EL TARF']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['EL TARF']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'غرداية':
                provinces['GHARDAIA']['confirmed'] = pConfirmed
                provinces['GHARDAIA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['GHARDAIA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'قالمة':
                provinces['GUELMA']['confirmed'] = pConfirmed
                provinces['GUELMA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['GUELMA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'إيليزي':
                provinces['ILLIZI']['confirmed'] = pConfirmed
                provinces['ILLIZI']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['ILLIZI']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'جيجل':
                provinces['JIJEL']['confirmed'] = pConfirmed
                provinces['JIJEL']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['JIJEL']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'خنشلة':
                provinces['KHENCHELA']['confirmed'] = pConfirmed
                provinces['KHENCHELA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['KHENCHELA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'الأغواط':
                provinces['LAGHOUAT']['confirmed'] = pConfirmed
                provinces['LAGHOUAT']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['LAGHOUAT']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'المسيلة':
                provinces["M'SILA"]['confirmed'] = pConfirmed
                provinces["M'SILA"]['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces["M'SILA"]['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'المدية':
                provinces['MEDEA']['confirmed'] = pConfirmed
                provinces['MEDEA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['MEDEA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'معسكر':
                provinces['MASCARA']['confirmed'] = pConfirmed
                provinces['MASCARA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['MASCARA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'ميلة':
                provinces['MILA']['confirmed'] = pConfirmed
                provinces['MILA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['MILA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'مستغانم':
                provinces['MOSTAGANEM']['confirmed'] = pConfirmed
                provinces['MOSTAGANEM']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['MOSTAGANEM']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'النعامة':
                provinces['NAAMA']['confirmed'] = pConfirmed
                provinces['NAAMA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['NAAMA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'وهران':
                provinces['ORAN']['confirmed'] = pConfirmed
                provinces['ORAN']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['ORAN']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'ورقلة':
                provinces['OUARGLA']['confirmed'] = pConfirmed
                provinces['OUARGLA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['OUARGLA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'أم البواقي':
                provinces['OUM EL BOUAGHI']['confirmed'] = pConfirmed
                provinces['OUM EL BOUAGHI']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['OUM EL BOUAGHI']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'غليزان':
                provinces['RELIZANE']['confirmed'] = pConfirmed
                provinces['RELIZANE']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['RELIZANE']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'سطيف':
                provinces['SETIF']['confirmed'] = pConfirmed
                provinces['SETIF']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['SETIF']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'سعيدة':
                provinces['SAIDA']['confirmed'] = pConfirmed
                provinces['SAIDA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['SAIDA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'سيدي بلعباس':
                provinces['SIDI BEL ABBES']['confirmed'] = pConfirmed
                provinces['SIDI BEL ABBES']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['SIDI BEL ABBES']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'سكيكدة':
                provinces['SKIKDA']['confirmed'] = pConfirmed
                provinces['SKIKDA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['SKIKDA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'سوق أهراس':
                provinces['SOUK AHRAS']['confirmed'] = pConfirmed
                provinces['SOUK AHRAS']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['SOUK AHRAS']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'تبسة':
                provinces['TEBESSA']['confirmed'] = pConfirmed
                provinces['TEBESSA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['TEBESSA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'تمنراست':
                provinces['TAMANGHASSET']['confirmed'] = pConfirmed
                provinces['TAMANGHASSET']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['TAMANGHASSET']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'تيارت':
                provinces['TIARET']['confirmed'] = pConfirmed
                provinces['TIARET']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['TIARET']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'تندوف':
                provinces['TINDOUF']['confirmed'] = pConfirmed
                provinces['TINDOUF']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['TINDOUF']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'تيبازة':
                provinces['TIPAZA']['confirmed'] = pConfirmed
                provinces['TIPAZA']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['TIPAZA']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'تيسمسيلت':
                provinces['TISSEMSILT']['confirmed'] = pConfirmed
                provinces['TISSEMSILT']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['TISSEMSILT']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'تيزي وزو':
                provinces['TIZI OUZOU']['confirmed'] = pConfirmed
                provinces['TIZI OUZOU']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['TIZI OUZOU']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
            elif pName == 'تلمسان':
                provinces['TLEMCEN']['confirmed'] = pConfirmed
                provinces['TLEMCEN']['new_confirmed'] = pNewConfirmed
                if pNewConfirmed > 0 and provincesDate == totalDate:
                    provinces['TLEMCEN']['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')


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
                provinces[pName]['confirmed'] = p['confirmed']
                provinces[pName]['recovered'] = p['recovered']
                provinces[pName]['deaths'] = p['deaths']
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
