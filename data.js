const date = ['2/25/20', '2/26/20', '2/27/20', '2/28/20', '2/29/20', '3/1/20', '3/2/20', '3/3/20', '3/4/20', '3/5/20', '3/6/20', '3/7/20', '3/8/20', '3/9/20', '3/10/20', '3/11/20', '3/12/20', '3/13/20', '3/14/20', '3/15/20', '3/16/20', '3/17/20', '3/18/20', '3/19/20', '3/20/20', '3/21/20', '3/22/20', '3/23/20', '3/24/20', '3/25/20', '3/26/20', '3/27/20', '3/28/20', '3/29/20', '3/30/20']
const confirmed = [1,1,1,1,1,1,3,5,12,12,17,17,19,20,20,20,24,26,37,48,54,60,74,90,102,139,201,230,264,302,367,409,454,511,584]
const recovered = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,10,12,12,12,12,12,12,22,23,23,24,24,29,29,31,31,37]
const deaths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,4,4,6,9,11,15,17,17,19,21,25,26,29,31,35]
const gender = ['Man', 'Woman']
const genderData = [226, 178]
const age = ['< 5', '5 - 14', '15 - 24', '25 - 34', '35 - 44', '45 - 59', '60 - 70', '+70']
const ageConfirmedData = [2, 9, 25, 55, 67, 70, 68, 58]
const ageDeathsData = [0, 0, 0, 0, 1, 12, 13, 9]
const lastUpdated = '30-03-2020 17:21'
const provinces = {
  "Aïn Defla":
    {
      "confirmed": 1,
      "recovered": 0,
      "deaths": 1
    },
  "Aïn Témouchent":
    {
      "confirmed": 1,
      "recovered": 0,
      "deaths": 0
    },
  "Adrar":
    {
      "confirmed": 2,
      "recovered": 0,
      "deaths": 0
    },
  "Alger":
    {
      "confirmed": 65,
      "recovered": 0,
      "deaths": 2
    },
  "Annaba":
    {
      "confirmed": 6,
      "recovered": 0,
      "deaths": 1
    },
  "Béchar":
    {
      "confirmed": 0,
      "recovered": 0,
      "deaths": 0
    },
  "Béjaïa":
    {
      "confirmed": 5,
      "recovered": 0,
      "deaths": 2
    },
  "Batna":
    {
      "confirmed": 1,
      "recovered": 0,
      "deaths": 0
    },
  "Biskra":
    {
      "confirmed": 1,
      "recovered": 0,
      "deaths": 0
    },
  "Blida":
    {
      "confirmed": 220,
      "recovered": 0,
      "deaths": 10
    },
  "Bordj Bou Arréridj":
    {
      "confirmed": 6,
      "recovered": 0,
      "deaths": 1
    },
  "Bouira":
    {
      "confirmed": 3,
      "recovered": 0,
      "deaths": 0
    },
  "Boumerdès":
    {
      "confirmed": 4,
      "recovered": 0,
      "deaths": 1
    },
  "Chlef":
    {
      "confirmed": 1,
      "recovered": 0,
      "deaths": 0
    },
  "Constantine":
    {
      "confirmed": 3,
      "recovered": 0,
      "deaths": 3
    },
  "Djelfa":
    {
      "confirmed": 1,
      "recovered": 0,
      "deaths": 0
    },
  "El Bayadh":
    {
      "confirmed": 0,
      "recovered": 0,
      "deaths": 0
    },
  "El Oued":
    {
      "confirmed": 5,
      "recovered": 0,
      "deaths": 2
    },
  "El Tarf":
    {
      "confirmed": 2,
      "recovered": 0,
      "deaths": 0
    },
  "Ghardaïa":
    {
      "confirmed": 1,
      "recovered": 0,
      "deaths": 0
    },
  "Guelma":
    {
      "confirmed": 2,
      "recovered": 0,
      "deaths": 0
    },
  "Illizi":
    {
      "confirmed": 0,
      "recovered": 0,
      "deaths": 0
    },
  "Jijel":
    {
      "confirmed": 2,
      "recovered": 0,
      "deaths": 0
    },
  "Khenchela":
    {
      "confirmed": 2,
      "recovered": 0,
      "deaths": 1
    },
  "Laghouat":
    {
      "confirmed": 1,
      "recovered": 0,
      "deaths": 0
    },
  "M'Sila":
    {
      "confirmed": 0,
      "recovered": 0,
      "deaths": 0
    },
  "Médéa":
    {
      "confirmed": 5,
      "recovered": 0,
      "deaths": 2
    },
  "Mascara":
    {
      "confirmed": 3,
      "recovered": 0,
      "deaths": 0
    },
  "Mila":
    {
      "confirmed": 0,
      "recovered": 0,
      "deaths": 0
    },
  "Mostaganem":
    {
      "confirmed": 6,
      "recovered": 0,
      "deaths": 1
    },
  "Naâma":
    {
      "confirmed": 0,
      "recovered": 0,
      "deaths": 0
    },
  "Oran":
    {
      "confirmed": 16,
      "recovered": 0,
      "deaths": 2
    },
  "Ouargla":
    {
      "confirmed": 1,
      "recovered": 1,
      "deaths": 0
    },
  "Oum el Bouaghi":
    {
      "confirmed": 2,
      "recovered": 0,
      "deaths": 0
    },
  "Relizane":
    {
      "confirmed": 2,
      "recovered": 0,
      "deaths": 0
    },
  "Sétif":
    {
      "confirmed": 7,
      "recovered": 0,
      "deaths": 0
    },
  "Saïda":
    {
      "confirmed": 0,
      "recovered": 0,
      "deaths": 0
    },
  "Sidi Bel Abbès":
    {
      "confirmed": 2,
      "recovered": 0,
      "deaths": 0
    },
  "Skikda":
    {
      "confirmed": 6,
      "recovered": 0,
      "deaths": 0
    },
  "Souk Ahras":
    {
      "confirmed": 2,
      "recovered": 0,
      "deaths": 0
    },
  "Tébessa":
    {
      "confirmed": 0,
      "recovered": 0,
      "deaths": 0
    },
  "Tamanghasset":
    {
      "confirmed": 0,
      "recovered": 0,
      "deaths": 0
    },
  "Tiaret":
    {
      "confirmed": 0,
      "recovered": 0,
      "deaths": 0
    },
  "Tindouf":
    {
      "confirmed": 0,
      "recovered": 0,
      "deaths": 0
    },
  "Tipaza":
    {
      "confirmed": 9,
      "recovered": 0,
      "deaths": 1
    },
  "Tissemsilt":
    {
      "confirmed": 1,
      "recovered": 0,
      "deaths": 0
    },
  "Tizi Ouzou":
    {
      "confirmed": 15,
      "recovered": 0,
      "deaths": 4
    },
  "Tlemcen":
    {
      "confirmed": 7,
      "recovered": 0,
      "deaths": 0
    }
}
