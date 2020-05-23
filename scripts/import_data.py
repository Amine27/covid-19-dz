#!/usr/bin/python3
import requests
import json
from dateutil import parser
import itertools
from collections import deque
import glob
import os
from dotenv import load_dotenv
load_dotenv()

dateOld = []
confirmedOld = []
recoveredOld = []
deathsOld = []
treatmentOld = []
newConfirmedList = []
newRecoveredList = []
newDeathsList = []
newTreatmentList = []
avg7ConfirmedList = []
avg7RecoveredList = []
avg7DeathsList = []
avg7TreatmentList = []
genderOld = []
ageOld = []
ageConfirmedOld = []
ageDeathsOld = []
lastUpdatedOld = ''
totalOfficialStats = []
provinces = {}

token = ''
URL = 'https://api.corona-dz.live'

def login():
    data = {
        'email': '{}'.format(os.getenv('API_EMAIL')),
        'password': '{}'.format(os.getenv('API_PASSWORD'))
    }

    try:
        response = requests.post(URL+'/login', data=data)
        response.raise_for_status()
        return response.json()['token']
    except requests.exceptions.RequestException as e:
        raise SystemExit(e)

def addCountry():
    head = {'Authorization': 'Bearer {}'.format(token)}

    for i in range(len(dateOld)):
        data = {
            'date': parser.parse(dateOld[i]).date(),
            'confirmed': confirmedOld[i],
            'recovered': recoveredOld[i],
            'deaths': deathsOld[i],
            'treatment': treatmentOld[i],
            'newConfirmed': newConfirmedList[i],
            'newRecovered': newRecoveredList[i],
            'newDeaths': newDeathsList[i],
            'newTreatment': newTreatmentList[i],
            'avg7Confirmed': avg7ConfirmedList[i],
            'avg7Recovered': avg7RecoveredList[i],
            'avg7Deaths': avg7DeathsList[i],
            'avg7Treatment': avg7TreatmentList[i]
        }
        # print(data)
        response = requests.post(URL+'/country', data=data, headers=head)
        if(response.json()):
            print(response.json())
        # break

def addAge():
    head = {'Authorization': 'Bearer {}'.format(token)}

    for i in range(len(ageOld)):
        data = {
            'date': parser.parse(lastUpdatedOld).date(),
            'label': ageOld[i],
            'confirmed': ageConfirmedOld[i],
            'deaths': ageDeathsOld[i]
        }
        # print(data)
        response = requests.post(URL+'/country/age', data=data, headers=head)
        if(response.json()):
            print(response.json())

def addGender():
    head = {'Authorization': 'Bearer {}'.format(token)}

    data = {
        'date': parser.parse(lastUpdatedOld).date(),
        'male': genderOld[0],
        'female': genderOld[1],
    }
    # print(data)
    response = requests.post(URL+'/country/gender', data=data, headers=head)
    if(response.json()):
        print(response.json())

def addProvince():
    head = {'Authorization': 'Bearer {}'.format(token)}

    for p_id, p in provinces.items():
        data = {
            'date': parser.parse(lastUpdatedOld).date(),
            'provinceId': p_id,
            'confirmed': p['confirmed'],
            'recovered': p['recovered'],
            'deaths': p['deaths'],
            'newConfirmed': p['new_confirmed'],
            'newRecovered': p['new_recovered'],
            'newDeaths': p['new_deaths'],
            'avg7Confirmed': p['avg7_confirmed'],
            'avg7Recovered': p['avg7_recovered'],
            'avg7Deaths': p['avg7_deaths'],
            'firstReported': p['reported'],
            'lastReported': p['last_reported']
        }
        #print(data)
        response = requests.post(URL+'/province', data=data, headers=head)
        if(response.json()):
            print(response.json())
        # break

def readData(f, country=False):
    global dateOld, confirmedOld, recoveredOld, deathsOld, treatmentOld, newConfirmedList, newRecoveredList, newDeathsList, newTreatmentList
    global avg7ConfirmedList, avg7RecoveredList, avg7DeathsList, avg7TreatmentList # , newConfirmedOld, newRecoveredOld, newDeathsOld,
    global provinces, genderOld, ageOld, ageConfirmedOld, ageDeathsOld, lastUpdatedOld

    with open(f) as f:
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
            elif(line.startswith('export const age =')):
                ageOld = line[line.find("[")+1:line.find("]")].split(',')
            elif(line.startswith('export const ageConfirmedData')):
                ageConfirmedOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('export const ageDeathsData')):
                ageDeathsOld = list(map(int, line[line.find("[")+1:line.find("]")].split(',')))
            elif(line.startswith('export const lastUpdated')):
                lastUpdatedOld = line[line.find("'")+1:line.find("'", -2)]
            elif(line.startswith('  "')):
                p = json.loads('{'+line[line.find("{")+1:line.find("}")].replace(': ', '": "').replace(', ', '", "').replace('""', '"').replace(' id', ' "id')+'}')
                pId = int(p['id'])
                provinces[pId] = {}
                provinces[pId]['name'] = line[line.find('"')+1:line.find('":')]
                provinces[pId]['confirmed'] = p['confirmed']
                provinces[pId]['recovered'] = p['recovered']
                provinces[pId]['deaths'] = p['deaths']
                provinces[pId]['new_confirmed'] = p['new_confirmed']
                provinces[pId]['new_recovered'] = p['new_recovered']
                provinces[pId]['new_deaths'] = p['new_deaths']
                provinces[pId]['avg7_confirmed'] = p['avg7_confirmed']
                provinces[pId]['avg7_recovered'] = p['avg7_recovered']
                provinces[pId]['avg7_deaths'] = p['avg7_deaths']
                provinces[pId]['reported'] = p['reported']
                provinces[pId]['last_reported'] = p['last_reported']
    if country:
        newConfirmedList = getDailyData(confirmedOld)
        newRecoveredList = getDailyData(recoveredOld)
        newDeathsList = getDailyData(deathsOld)
        newTreatmentList = getDailyData(treatmentOld)
        avg7ConfirmedList = getAverageDailyData(newConfirmedList, 7)
        avg7RecoveredList = getAverageDailyData(newRecoveredList, 7)
        avg7DeathsList = getAverageDailyData(newDeathsList, 7)
        avg7TreatmentList = getAverageDailyData(newTreatmentList, 7)
        # #print(avg7ConfirmedList, len(avg7ConfirmedList))
    # print(len(newTreatmentList), len(newConfirmedList), len(avg7ConfirmedList))

def getDailyData(dataType):
    dailyData = []
    for i in range(len(dataType)):
        if i == 0:
            dailyData.append(dataType[i])
        else:
            dailyData.append(dataType[i] - (dataType[i-1]))
    return dailyData

def getAverageDailyData(dailyData, days):
    averageDailyData = []
    it = iter([0] * (days-1) + dailyData)
    d = deque(itertools.islice(it, days-1))
    d.appendleft(0)
    s = sum(d)
    for elem in it:
        s += elem - d.popleft()
        d.append(elem)
        averageDailyData.append(round(s / days, 2))

    return averageDailyData

def importData():
    filesList = sorted(glob.glob("data-hist/*.js"))
    for f in filesList:
        print(f)
        readData(f)
        addAge()
        addGender()
        addProvince()
    # add country stats only from the newset file, since it containts all the data
    readData(filesList[-1], country=True)
    addCountry()

def main():
    global token
    token = login()
    importData()

if __name__ == '__main__':
    main()
