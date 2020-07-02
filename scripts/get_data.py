#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import json
import datetime
import time
from urllib.request import urlopen
from dateutil import parser
from git import Repo, exc
import unidecode

dateOld = []
confirmedOld = []
recoveredOld = []
deathsOld = []
treatmentOld = []
newConfirmedOld = 0
newRecoveredOld = 0
newDeathsOld = 0
totalOfficialStats = []
deathsStats = []
totalCalculStats = { 'new_confirmed': 0,
                     'new_recovered': 0,
                     'new_deaths': 0,
                     'confirmed': 0,
                     'recovered': 0,
                     'deaths': 0}
provinces = {}
genderOld = []

def getWilayaStats():
    url = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/Cas_confirme_view/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Cas_confirm%20desc&resultOffset=0&resultRecordCount=49&cacheHint=true'

    with urlopen(url) as file:
        try:
            data = json.load(file)['features']
            for wilaya_dict in data:
                w = wilaya_dict['attributes']
                if w['NOM_WILAYA'] is None or w['NOM_WILAYA'] == 'National':
                    continue
                provinces[w['NOM_WILAYA']]['confirmed'] = w['Cas_confirm']
                provinces[w['NOM_WILAYA']]['recovered'] = 0 # w['Récupér'] or 0
                provinces[w['NOM_WILAYA']]['deaths'] = w['Décés']
                provinces[w['NOM_WILAYA']]['new_confirmed'] = w['new_cases'] or 0
                provinces[w['NOM_WILAYA']]['new_recovered'] = 0 # w['new_recovred'] or 0
                provinces[w['NOM_WILAYA']]['new_deaths'] = w['New_case_death'] or 0
                if(w['new_cases']):
                    provinces[w['NOM_WILAYA']]['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
                totalCalculStats['new_confirmed'] += w['new_cases']
                totalCalculStats['new_deaths'] += w['New_case_death']
                totalCalculStats['confirmed'] +=  w['Cas_confirm']
                totalCalculStats['deaths'] = totalOfficialStats['deaths']
                totalCalculStats['recovered'] = totalOfficialStats['recovered']
                totalCalculStats['treatment'] = totalOfficialStats['treatment']
        except KeyError as e:
            print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 'getWilayaStats(): incorrect json file', e)
            totalCalculStats['new_confirmed'] = newConfirmedOld
            totalCalculStats['new_deaths'] = newDeathsOld
            totalCalculStats['confirmed'] = totalOfficialStats['confirmed']
            totalCalculStats['deaths'] = totalOfficialStats['deaths']
            totalCalculStats['recovered'] = totalOfficialStats['recovered']
            totalCalculStats['treatment'] = totalOfficialStats['treatment']
            # sys.exit(0)

def getTotalStats():
    url = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/COVID_Death_Cumul/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report%20asc&resultOffset=0&resultRecordCount=1000&cacheHint=true'

    with urlopen(url) as file:
        try:
            data = json.load(file)['features']
            usefulData = []
            for totalDict in reversed(data):
                t = totalDict['attributes']
                usefulData.append({
                    'confirmed': t['Cumul'] or confirmedOld[-1],
                    'recovered': t['gueris'] or recoveredOld[-1],
                    'deaths': t['Death_cumul'] or deathsOld[-1],
                    # 'treatment': t['Straitem'] or treatmentOld[-1],
                    'treatment': treatmentOld[-1],
                    'critical': t['Straitem'],
                    'man': t['Masculin'] or genderOld[0],
                    'woman': t['Féminin'] or genderOld[1],
                    'an': t['an'],
                    'unquatorze': t['unquatorze'],
                    'vingtquatre': t['vingtquatre'],
                    'quaranteneuf': t['quaranteneuf'],
                    'cinquanteneuf': t['cinquanteneuf'],
                    'soixante': t['soixante'],
                    'NP': t['NP'],
                    'new_confirmed': t['New_cases'] or 0
                })
                break
        except KeyError as e:
            print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 'getTotalStats(): incorrect json file', e)
            sys.exit(0)

    global totalOfficialStats
    totalOfficialStats = usefulData[0]

def getDeathStats():
    url = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/COVID_Death_Cumul/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22quatorz%22%2C%22outStatisticFieldName%22%3A%22quatorz%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22vingquatre%22%2C%22outStatisticFieldName%22%3A%22vingquatre%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22trentequatre%22%2C%22outStatisticFieldName%22%3A%22trentequatre%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22quarantequatre%22%2C%22outStatisticFieldName%22%3A%22quarantequatre%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22cinquanteneuf%22%2C%22outStatisticFieldName%22%3A%22cinquanteneuf%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22soixantedix%22%2C%22outStatisticFieldName%22%3A%22soixantedix%22%7D%5D&outSR=102100&cacheHint=true'

    with urlopen(url) as file:
        try:
            data = json.load(file)['features']
            usefulData = []
            for totalDict in reversed(data):
                t = totalDict['attributes']
                usefulData.append({
                    'quatorz': t['quatorz'],
                    'vingquatre': t['vingquatre'],
                    'trentequatre': t['trentequatre'],
                    'quarantequatre': t['quarantequatre'],
                    'cinquanteneuf': t['cinquanteneuf'],
                    'soixantedix': t['soixantedix']
                })
        except KeyError as e :
            print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 'getDeathStats(): incorrect json file', e)
            sys.exit(0)

    global deathsStats
    deathsStats = usefulData[0]

def readData():
    global dateOld, confirmedOld, recoveredOld, deathsOld, treatmentOld, newConfirmedOld, newRecoveredOld, newDeathsOld, provinces, genderOld
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
            elif(line.startswith('export const genderData')):
                genderOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('  "')):
                p = json.loads('{'+line[line.find("{")+1:line.find("}")].replace(': ', '": "').replace(', ', '", "').replace('""', '"').replace(' id', ' "id')+'}')
                pName = unidecode.unidecode(line[line.find('"')+1:line.find('":')]).upper()
                if pName == 'SOUK AHRAS':
                    pName = 'SOUK-AHRAS'
                elif pName == 'EL TARF':
                    pName = 'EL-TARF'
                elif pName == 'AIN TEMOUCHENT':
                    pName = 'AIN-TEMOUCHENT'
                elif pName == 'TAMANGHASSET':
                    pName = 'TAMENGHASSET'
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
                newConfirmedOld += int(p['new_confirmed'])
                newRecoveredOld += int(p['new_recovered'])
                newDeathsOld += int(p['new_deaths'])

def updateData():
    if(int(confirmedOld[-1]) != totalCalculStats['confirmed'] or int(deathsOld[-1]) != totalCalculStats['deaths'] or int(recoveredOld[-1]) != totalCalculStats['recovered'] or newConfirmedOld != totalCalculStats['new_confirmed'] or newDeathsOld != totalCalculStats['new_deaths']):
        print(datetime.datetime.now(), ': new data')
        lastDate = parser.parse(dateOld[-1]).date()
        today = datetime.date.today()
        if(lastDate < today):
            print('new day:', today)
            dateOld.append(today.strftime('%-m/%-d/%y'))
            confirmedOld.append(totalCalculStats['confirmed'])
            recoveredOld.append(totalCalculStats['recovered'])
            deathsOld.append(totalCalculStats['deaths'])
            treatmentOld.append(totalCalculStats['treatment'])
        else:
            print('modifying day:', lastDate)
            confirmedOld[-1] = totalCalculStats['confirmed']
            recoveredOld[-1] = totalOfficialStats['recovered']
            deathsOld[-1] = totalCalculStats['deaths']
            treatmentOld[-1] = totalCalculStats['treatment']

        finalData = ('export const date = ' + str(dateOld)
                     + '\nexport const confirmed = ' + str(confirmedOld)
                     + '\nexport const recovered = ' + str(recoveredOld)
                     + '\nexport const deaths = ' + str(deathsOld)
                     + '\nexport const treatment = ' + str(treatmentOld)
                     + '\nexport const critical = ' + str(totalOfficialStats['critical'])
                     + "\nexport const gender = ['Male', 'Female']"
                     + '\nexport const genderData = ['+str(totalOfficialStats['man'])+', '+ str(totalOfficialStats['woman'])+']'
                     + "\nexport const age = ['< 1', '1 - 14', '15 - 24', '25 - 49', '50 - 59', '+60', 'N/A']"
                     + '\nexport const ageConfirmedData = ['+str(totalOfficialStats['an'])+', '+str(totalOfficialStats['unquatorze'])+', '+str(totalOfficialStats['vingtquatre'])+', '+str(totalOfficialStats['quaranteneuf'])+', '+str(totalOfficialStats['cinquanteneuf'])+', '+str(totalOfficialStats['soixante'])+', '+str(totalOfficialStats['NP'])+']'
                     + '\nexport const ageDeathsData = ['+str(deathsStats['quatorz'])+', '+str(deathsStats['vingquatre'])+', '+str(deathsStats['trentequatre'])+', '+str(deathsStats['quarantequatre'])+', '+str(deathsStats['cinquanteneuf'])+', '+str(deathsStats['soixantedix'])+', '+str(0)+']'
                     + "\nexport const lastUpdated = '" + datetime.datetime.now().strftime('%Y-%m-%d %H:%M') + "'"
                     + '\nexport const provinces = {\n'
        )
        for p_id, p in provinces.items():
            finalData += '  "'+p['name']+'": { id: '+str(p['id'])+', confirmed: '+str(p['confirmed'])+', recovered: '+str(p['recovered'])+', deaths: '+str(p['deaths'])+', new_confirmed: '+str(p['new_confirmed'])+', new_recovered: '+str(p['new_recovered'])+', new_deaths: '+str(p['new_deaths'])+', reported: "'+str(p['reported'])+'", last_reported: "'+str(p['last_reported'])+'" },\n'

        finalData = finalData[:-2] + '\n}'
        with open("src/data.js", "w") as dataFile:
            print("{}".format(finalData), file=dataFile)

        print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), ': saved new data')
        print('calcul\t confirmed:', totalCalculStats['confirmed'], 'deaths:', totalCalculStats['deaths'], 'recovered:', totalOfficialStats['recovered'], 'new_confirmed:', totalCalculStats['new_confirmed'], 'new_deaths:', totalCalculStats['new_deaths'])

        #updateIndex()
        #gitPush()
    else:
        print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), ': no new data')

def updateIndex():
    newIndex = ''
    with open('index.html') as f:
        for line in f:
            if(line.startswith('    <script type="text/javascript" src="js/data.js')):
                newIndex += '    <script type="text/javascript" src="js/data.js?v='+ str(int(time.time())) +'"></script>\n'
            else:
                newIndex += line

    with open("src/index.html", "w") as indexFile:
        print("{}".format(newIndex.strip()), file=indexFile)

def gitPush():
    try:
        repo = Repo('.')
        #repo.index.add(['src/data.js', 'src/index.html'])
        repo.index.add(['src/data.js'])
        repo.index.commit('[Bot] Update stats')
        origin = repo.remote(name='origin')
        origin.push()
    except exc.GitError as e:
        print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 'Some error occured while pushing the code to github:', e)

def main():
    readData()
    getTotalStats()
    getDeathStats()
    getWilayaStats()
    updateData()

if __name__ == '__main__':
    main()
