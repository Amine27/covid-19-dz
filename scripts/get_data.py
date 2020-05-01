#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import json
import datetime
import time
from urllib.request import urlopen
from dateutil import parser
from git import Repo, exc

dateOld = []
confirmedOld = []
recoveredOld = []
deathsOld = []
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

def getWilayaStats():
    url = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/Cas_confirme_view/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Cas_confirm%20desc&resultOffset=0&resultRecordCount=48&cacheHint=true'

    with urlopen(url) as file:
        try:
            data = json.load(file)['features']
            for wilaya_dict in data:
                w = wilaya_dict['attributes']
                provinces[w['WILAYA']]['confirmed'] = w['Cas_confirm']
                provinces[w['WILAYA']]['recovered'] = w['Récupér']
                provinces[w['WILAYA']]['deaths'] = w['Décés']
                provinces[w['WILAYA']]['new_confirmed'] = w['new_cases'] or 0
                provinces[w['WILAYA']]['new_recovered'] = 0 # w['new_recovred'] or 0
                provinces[w['WILAYA']]['new_deaths'] = w['New_case_death'] or 0
                if(w['new_cases']):
                    provinces[w['WILAYA']]['last_reported'] = datetime.datetime.now().strftime('%Y-%m-%d')
                totalCalculStats['new_confirmed'] += w['new_cases']
                totalCalculStats['new_deaths'] += w['New_case_death']
                totalCalculStats['confirmed'] +=  w['Cas_confirm']
                totalCalculStats['deaths'] += w['Décés']
                totalCalculStats['recovered'] = totalOfficialStats['recovered']
        except KeyError:
            print('getWilayaStats(): incorrect json file')
            totalCalculStats['new_confirmed'] = newConfirmedOld
            totalCalculStats['new_deaths'] = newDeathsOld
            totalCalculStats['confirmed'] = totalOfficialStats['confirmed']
            totalCalculStats['deaths'] = totalOfficialStats['deaths']
            totalCalculStats['recovered'] = totalOfficialStats['recovered']
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
                    'confirmed': t['Cumul'],
                    'recovered': t['gueris'],
                    'deaths': t['Death_cumul'],
                    'man': t['Masculin'],
                    'woman': t['Féminin'],
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
        except KeyError:
            print('getTotalStats(): incorrect json file')
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
        except KeyError:
            print('getDeathStats(): incorrect json file')
            sys.exit(0)

    global deathsStats
    deathsStats = usefulData[0]

def readData():
    global dateOld, confirmedOld, recoveredOld, deathsOld, newConfirmedOld, newRecoveredOld, newDeathsOld, provinces
    with open('data.js') as f:
        for line in f:
            if(line.startswith('const date')):
                dateOld = line[line.find("[")+1:line.find("]")].replace("'", "").split(', ')
            elif(line.startswith('const confirmed')):
                confirmedOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('const recovered')):
                recoveredOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('const deaths')):
                deathsOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('  "')):
                p = json.loads('{'+line[line.find("{")+1:line.find("}")].replace(': ', '": "').replace(', ', '", "').replace('""', '"').replace(' id', ' "id')+'}')
                pId = int(p['id'])
                provinces[pId] = {}
                provinces[pId]['name'] = line[line.find('"')+1:line.find('":')]
                provinces[pId]['confirmed'] = p['confirmed']
                provinces[pId]['recovered'] = p['recovered']
                provinces[pId]['deaths'] = p['deaths']
                provinces[pId]['new_confirmed'] = 0
                provinces[pId]['new_recovered'] = 0
                provinces[pId]['new_deaths'] = 0
                provinces[pId]['reported'] = p['reported']
                provinces[pId]['last_reported'] = p['last_reported']
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
        else:
            print('modifying day:', lastDate)
            confirmedOld[-1] = totalCalculStats['confirmed']
            recoveredOld[-1] = totalOfficialStats['recovered']
            deathsOld[-1] = totalCalculStats['deaths']

        finalData = ('const date = ' + str(dateOld)
                     + '\nconst confirmed = ' + str(confirmedOld)
                     + '\nconst recovered = ' + str(recoveredOld)
                     + '\nconst deaths = ' + str(deathsOld)
                     + "\nconst gender = ['Male', 'Female']"
                     + '\nconst genderData = ['+str(totalOfficialStats['man'])+', '+ str(totalOfficialStats['woman'])+']'
                     + "\nconst age = ['< 1', '1 - 14', '15 - 24', '25 - 49', '50 - 59', '+60', 'N/A']"
                     + '\nconst ageConfirmedData = ['+str(totalOfficialStats['an'])+', '+str(totalOfficialStats['unquatorze'])+', '+str(totalOfficialStats['vingtquatre'])+', '+str(totalOfficialStats['quaranteneuf'])+', '+str(totalOfficialStats['cinquanteneuf'])+', '+str(totalOfficialStats['soixante'])+', '+str(totalOfficialStats['NP'])+']'
                     + '\nconst ageDeathsData = ['+str(deathsStats['quatorz'])+', '+str(deathsStats['vingquatre'])+', '+str(deathsStats['trentequatre'])+', '+str(deathsStats['quarantequatre'])+', '+str(deathsStats['cinquanteneuf'])+', '+str(deathsStats['soixantedix'])+', '+str(0)+']'
                     + "\nconst lastUpdated = '" + datetime.datetime.now().strftime('%Y-%m-%d %H:%M') + "'"
                     + '\nconst provinces = {\n'
        )
        for p_id, p in provinces.items():
            finalData += '  "'+p['name']+'": { id: '+str(p_id)+', confirmed: '+str(p['confirmed'])+', recovered: '+str(p['recovered'])+', deaths: '+str(p['deaths'])+', new_confirmed: '+str(p['new_confirmed'])+', new_recovered: '+str(p['new_recovered'])+', new_deaths: '+str(p['new_deaths'])+', reported: "'+str(p['reported'])+'", last_reported: "'+str(p['last_reported'])+'" },\n'

        finalData = finalData[:-2] + '\n}'
        with open("data.js", "w") as dataFile:
            print("{}".format(finalData), file=dataFile)

        print(datetime.datetime.now(), ': saved new data')
        print('calcul\t confirmed:', totalCalculStats['confirmed'], 'deaths:', totalCalculStats['deaths'], 'recovered:', totalOfficialStats['recovered'], 'new_confirmed:', totalCalculStats['new_confirmed'], 'new_deaths:', totalCalculStats['new_deaths'])

        updateIndex()
        gitPush()
    else:
        print(datetime.datetime.now(), ': no new data')

def updateIndex():
    newIndex = ''
    with open('index.html') as f:
        for line in f:
            if(line.startswith('    <script type="text/javascript" src="data.js')):
                newIndex += '    <script type="text/javascript" src="data.js?v='+ str(int(time.time())) +'"></script>\n'
            else:
                newIndex += line

    with open("index.html", "w") as indexFile:
        print("{}".format(newIndex), file=indexFile)

def gitPush():
    try:
        repo = Repo('.')
        repo.index.add(['data.js', 'index.html'])
        repo.index.commit('[Bot] Update stats')
        origin = repo.remote(name='origin')
        origin.push()
    except exc.GitError as e:
        print('Some error occured while pushing the code to github:', e)

def main():
    readData()
    getTotalStats()
    getDeathStats()
    getWilayaStats()
    updateData()

if __name__ == '__main__':
    main()
