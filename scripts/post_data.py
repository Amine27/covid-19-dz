#!/usr/bin/python3
import requests
import json
import datetime
from dateutil import parser
import itertools
from collections import deque
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

def addCountry(newDay):
    head = {'Authorization': 'Bearer {}'.format(token)}

    data = {
        'date': parser.parse(dateOld[-1]).date(),
        'confirmed': confirmedOld[-1],
        'recovered': recoveredOld[-1],
        'deaths': deathsOld[-1],
        'treatment': treatmentOld[-1],
        'newConfirmed': newConfirmedList[-1],
        'newRecovered': newRecoveredList[-1],
        'newDeaths': newDeathsList[-1],
        'newTreatment': newTreatmentList[-1],
        'avg7Confirmed': avg7ConfirmedList[-1],
        'avg7Recovered': avg7RecoveredList[-1],
        'avg7Deaths': avg7DeathsList[-1],
        'avg7Treatment': avg7TreatmentList[-1]
    }
    # print(data)
    try:
        if newDay:
            response = requests.post(URL+'/country', data=data, headers=head)
        else:
            response = requests.patch(URL+'/country', data=data, headers=head)
        response.raise_for_status()
        print(response.json())
    except requests.exceptions.RequestException as e:
        raise SystemExit(e)

def addAge(newDay):
    head = {'Authorization': 'Bearer {}'.format(token)}

    for i in range(len(ageOld)):
        data = {
            'date': parser.parse(lastUpdatedOld).date(),
            'label': ageOld[i],
            'confirmed': ageConfirmedOld[i],
            'deaths': ageDeathsOld[i]
        }
        # print(data)
        try:
            if newDay:
                response = requests.post(URL+'/country/age', data=data, headers=head)
            else:
                response = requests.patch(URL+'/country/age', data=data, headers=head)
            response.raise_for_status()
            print(response.json())
        except requests.exceptions.RequestException as e:
            raise SystemExit(e)

def addGender(newDay):
    head = {'Authorization': 'Bearer {}'.format(token)}

    data = {
        'date': parser.parse(lastUpdatedOld).date(),
        'male': genderOld[0],
        'female': genderOld[1],
    }
    # print(data)
    try:
        if newDay:
            response = requests.post(URL+'/country/gender', data=data, headers=head)
        else:
            response = requests.patch(URL+'/country/gender', data=data, headers=head)
        response.raise_for_status()
        print(response.json())
    except requests.exceptions.RequestException as e:
        raise SystemExit(e)

def addProvince(newDay):
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
        # print(data)
        try:
            if newDay:
                response = requests.post(URL+'/province', data=data, headers=head)
            else:
                response = requests.patch(URL+'/province', data=data, headers=head)
            response.raise_for_status()
            print(response.json())
        except requests.exceptions.RequestException as e:
            raise SystemExit(e)

def readData(f):
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
                provinces[pId]['reported'] = p['reported']
                provinces[pId]['last_reported'] = p['last_reported']
    newConfirmedList = getDailyData(confirmedOld)
    newRecoveredList = getDailyData(recoveredOld)
    newDeathsList = getDailyData(deathsOld)
    newTreatmentList = getDailyData(treatmentOld)
    avg7ConfirmedList = getAverageDailyData(newConfirmedList, 7)
    avg7RecoveredList = getAverageDailyData(newRecoveredList, 7)
    avg7DeathsList = getAverageDailyData(newDeathsList, 7)
    avg7TreatmentList = getAverageDailyData(newTreatmentList, 7)

def getProvincesAPIData(days):
    head = {'Authorization': 'Bearer {}'.format(token)}
    try:
        response = requests.get(URL+'/province/days/'+days, headers=head)
        response.raise_for_status()
        pList = response.json()
        for p in pList:
            avg7ConfirmedList = []
            avg7RecoveredList = []
            avg7DeathsList = []
            for d in p['data']:
                avg7ConfirmedList.append(d['newConfirmed'])
                avg7RecoveredList.append(d['newRecovered'])
                avg7DeathsList.append(d['newDeaths'])
            provinces[p['provinceId']]['avg7_confirmed'] = getAverageDailyData(avg7ConfirmedList, 7)[-1]
            provinces[p['provinceId']]['avg7_recovered'] = getAverageDailyData(avg7RecoveredList, 7)[-1]
            provinces[p['provinceId']]['avg7_deaths'] = getAverageDailyData(avg7DeathsList, 7)[-1]
    except requests.exceptions.RequestException as e:
        raise SystemExit(e)

def checkNewDay():
    try:
        response = requests.get(URL+'/country/latest')
        response.raise_for_status()
        lastDate = parser.parse(response.json()['date']).date()
        today = datetime.date.today()
        if(lastDate < today):
            print('new day:', today)
            return True
        print('modifying day:', lastDate)
        return False
    except requests.exceptions.RequestException as e:
        raise SystemExit(e)

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

def updateData(newDay):
    dataFile = "./src/data.js"
    print(dataFile)
    readData(dataFile)
    addCountry(newDay)
    addAge(newDay)
    addGender(newDay)
    getProvincesAPIData("7")
    addProvince(newDay)

def main():
    token = login()
    newDay = checkNewDay()
    updateData(newDay)

if __name__ == '__main__':
    main()
