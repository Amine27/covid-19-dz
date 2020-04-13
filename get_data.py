#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
from urllib.request import urlopen

provinces = {
    44: { "name": "Aïn Defla", "reported": "2020-03-27" },
    46: { "name": "Aïn Témouchent", "reported": "2020-03-23" },
    1: { "name": "Adrar", "reported": "2020-03-15" },
    16: { "name": "Alger", "reported": "2020-03-13" },
    23: { "name": "Annaba", "reported": "2020-03-16" },
    8: { "name": "Béchar", "reported": "2020-04-03" },
    6: { "name": "Béjaïa", "reported": "2020-03-17" },
    5: { "name": "Batna", "reported": "2020-03-26" },
    7: { "name": "Biskra", "reported": "2020-03-25" },
    9: { "name": "Blida", "reported": "2020-03-01" },
    34: { "name": "Bordj Bou Arréridj", "reported": "2020-03-16" },
    10: { "name": "Bouira", "reported": "2020-03-16" },
    35: { "name": "Boumerdès", "reported": "2020-03-18" },
    2: { "name": "Chlef", "reported": "2020-03-23" },
    25: { "name": "Constantine", "reported": "2020-03-22" },
    17: { "name": "Djelfa", "reported": "2020-03-27" },
    32: { "name": "El Bayadh", "reported": "2020-04-06" },
    39: { "name": "El Oued", "reported": "2020-03-18" },
    36: { "name": "El Tarf", "reported": "2020-03-27" },
    47: { "name": "Ghardaïa", "reported": "2020-03-27" },
    24: { "name": "Guelma", "reported": "2020-03-14" },
    33: { "name": "Illizi", "reported": "2020-03-31" },
    18: { "name": "Jijel", "reported": "2020-03-23" },
    40: { "name": "Khenchela", "reported": "2020-03-20" },
    3: { "name": "Laghouat", "reported": "2020-03-26" },
    28: { "name": "M'Sila", "reported": "2020-03-31" },
    26: { "name": "Médéa", "reported": "2020-03-18" },
    29: { "name": "Mascara", "reported": "2020-03-05" },
    43: { "name": "Mila", "reported": "2020-04-04" },
    27: { "name": "Mostaganem", "reported": "2020-03-23" },
    45: { "name": "Naâma", "reported": "2020-04-06" },
    31: { "name": "Oran", "reported": "2020-03-19" },
    30: { "name": "Ouargla", "reported": "2020-02-25" },
    4: { "name": "Oum el Bouaghi", "reported": "2020-03-26" },
    48: { "name": "Relizane", "reported": "2020-03-21" },
    19: { "name": "Sétif", "reported": "2020-03-19" },
    20: { "name": "Saïda", "reported": "2020-04-10" },
    22: { "name": "Sidi Bel Abbès", "reported": "2020-03-23" },
    21: { "name": "Skikda", "reported": "2020-03-12" },
    41: { "name": "Souk Ahras", "reported": "2020-03-12" },
    12: { "name": "Tébessa", "reported": "2020-04-03" },
    11: { "name": "Tamanghasset", "reported": "2020-04-13" },
    14: { "name": "Tiaret", "reported": "2020-04-02" },
    37: { "name": "Tindouf", "reported": "" },
    42: { "name": "Tipaza", "reported": "2020-03-23" },
    38: { "name": "Tissemsilt", "reported": "2020-03-19" },
    15: { "name": "Tizi Ouzou", "reported": "2020-03-12" },
    13: { "name": "Tlemcen", "reported": "2020-03-23" }
}

def getWilayaStats():
    url = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/Cas_confirme_view/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Cas_confirm%20desc&resultOffset=0&resultRecordCount=48&cacheHint=true'

    with urlopen(url) as file:
        data = json.load(file)['features']
        for wilaya_dict in data:
            w = wilaya_dict['attributes']
            provinces[w['WILAYA']]['confirmed'] = w['Cas_confirm']
            provinces[w['WILAYA']]['recovered'] = w['Récupér']
            provinces[w['WILAYA']]['deaths'] = w['Décés']
            provinces[w['WILAYA']]['new_confirmed'] = w['new_cases'] or 0
            provinces[w['WILAYA']]['new_recovered'] = 0
            provinces[w['WILAYA']]['new_deaths'] = w['New_case_death'] or 0

def getTotalStats():
    url = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/COVID_Death_Cumul/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report%20asc&resultOffset=0&resultRecordCount=1000&cacheHint=true'

    with urlopen(url) as file:
        data = json.load(file)['features']
        usefulData = []
        for totalDict in reversed(data):
            t = totalDict['attributes']
            usefulData.append({
                'total_confirmed': t['Cumul'],
                'total_recovered': t['gueris'],
                'total_deaths': t['Death_cumul'],
                'man': t['Masculin'],
                'woman': t['Féminin'],
                'an': t['an'],
                'unquatorze': t['unquatorze'],
                'vingtquatre': t['vingtquatre'],
                'quaranteneuf': t['quaranteneuf'],
                'cinquanteneuf': t['cinquanteneuf'],
                'soixante': t['soixante'],
                'NP': t['NP'],
                'New_cases': t['New_cases'] or 0
            })
            break
    return usefulData[0]

def getDeathStats():
    url = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/COVID_Death_Cumul/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22quatorz%22%2C%22outStatisticFieldName%22%3A%22quatorz%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22vingquatre%22%2C%22outStatisticFieldName%22%3A%22vingquatre%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22trentequatre%22%2C%22outStatisticFieldName%22%3A%22trentequatre%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22quarantequatre%22%2C%22outStatisticFieldName%22%3A%22quarantequatre%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22cinquanteneuf%22%2C%22outStatisticFieldName%22%3A%22cinquanteneuf%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22soixantedix%22%2C%22outStatisticFieldName%22%3A%22soixantedix%22%7D%5D&outSR=102100&cacheHint=true'

    with urlopen(url) as file:
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
    return usefulData[0]

def main():
    totalStats = getTotalStats()
    deathsStats = getDeathStats()
    getWilayaStats()

    totalNCases = 0
    totalNDeaths = 0
    totalCases = 0
    totalDeaths = 0

    for w_id, w in provinces.items():
        print('"'+w['name']+'": { confirmed: '+str(w['confirmed'])+', recovered: '+str(w['recovered'])+', deaths: '+str(w['deaths'])+', new_confirmed: '+str(w['new_confirmed'])+', new_recovered: '+str(w['new_recovered'])+', new_deaths: '+str(w['new_deaths'])+', reported: "'+str(w['reported'])+'" },')
        totalNCases += w['new_confirmed']
        totalNDeaths += w['new_deaths']
        totalCases +=  w['confirmed']
        totalDeaths += w['deaths']

    print('const genderData = ['+str(totalStats['man'])+', '+ str(totalStats['woman'])+']')
    print('const ageConfirmedData = ['+str(totalStats['an'])+', '+str(totalStats['unquatorze'])+', '+str(totalStats['vingtquatre'])+', '+str(totalStats['quaranteneuf'])+', '+str(totalStats['cinquanteneuf'])+', '+str(totalStats['soixante'])+', '+str(totalStats['NP'])+']')
    print('const ageDeathsData = ['+str(deathsStats['quatorz'])+', '+str(deathsStats['vingquatre'])+', '+str(deathsStats['trentequatre'])+', '+str(deathsStats['quarantequatre'])+', '+str(deathsStats['cinquanteneuf'])+', '+str(deathsStats['soixantedix'])+', '+str(0)+']')
    print('offcial\t confirmed:', str(totalStats['total_confirmed']), 'deaths:', str(totalStats['total_deaths']), 'recovered:', str(totalStats['total_recovered']), 'new_confirmed:', str(totalStats['New_cases']))
    print('calcul\t confirmed:', totalCases, 'deaths:', totalDeaths, 'new confirmed:', totalNCases, 'new_deaths:', totalNDeaths)

if __name__ == '__main__':
    main()
