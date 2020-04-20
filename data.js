const date = ['2/25/20', '2/26/20', '2/27/20', '2/28/20', '2/29/20', '3/1/20', '3/2/20', '3/3/20', '3/4/20', '3/5/20', '3/6/20', '3/7/20', '3/8/20', '3/9/20', '3/10/20', '3/11/20', '3/12/20', '3/13/20', '3/14/20', '3/15/20', '3/16/20', '3/17/20', '3/18/20', '3/19/20', '3/20/20', '3/21/20', '3/22/20', '3/23/20', '3/24/20', '3/25/20', '3/26/20', '3/27/20', '3/28/20', '3/29/20', '3/30/20', '3/31/20', '4/1/20', '4/2/20', '4/3/20', '4/4/20', '4/5/20', '4/6/20', '4/7/20', '4/8/20', '4/9/20', '4/10/20', '4/11/20', '4/12/20', '4/13/20', '4/14/20', '4/15/20', '4/16/20', '4/17/20', '4/18/20', '4/19/20', '4/20/20']
const confirmed = [1,1,1,1,1,1,3,5,12,12,17,17,19,20,20,20,24,26,37,48,54,60,74,90,102,139,201,230,264,302,367,409,454,511,584,716,847,986,1171,1251,1320,1423,1468,1572,1666,1761,1825,1914,1983,2070,2160,2268,2418,2534,2629,2718]
const recovered = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,10,12,12,12,12,12,12,22,23,23,24,24,29,29,31,31,37,46,61,61,62,90,90,90,113,237,347,405,460,591,601,691,708,783,846,894,1047,1047]
const deaths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,4,4,6,9,11,15,17,17,19,21,25,26,29,31,35,44,58,83,105,130,152,173,193,205,235,256,275,293,313,326,336,348,364,367,375,376]
const gender = ['Male', 'Female']
const genderData = [1521, 1108]
const age = ['< 1', '1 - 14', '15 - 24', '25 - 49', '50 - 59', '+60', 'N/A']
const ageConfirmedData = [4, 44, 80, 944, 461, 982, 114]
const ageDeathsData = [0, 1, 1, 31, 66, 276, 0]
const lastUpdated = '2020-04-20 17:17'
const provinces = {
  "Aïn Defla": { confirmed: 91, recovered: 0, deaths: 5, new_confirmed: 8, new_recovered: 0, new_deaths: 0, reported: "2020-03-27" },
  "Aïn Témouchent": { confirmed: 18, recovered: 0, deaths: 2, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-23" },
  "Adrar": { confirmed: 15, recovered: 0, deaths: 1, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-15" },
  "Alger": { confirmed: 455, recovered: 11, deaths: 96, new_confirmed: 10, new_recovered: 0, new_deaths: 0, reported: "2020-03-13" },
  "Annaba": { confirmed: 20, recovered: 3, deaths: 3, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-16" },
  "Béchar": { confirmed: 14, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-03" },
  "Béjaïa": { confirmed: 100, recovered: 1, deaths: 13, new_confirmed: 3, new_recovered: 0, new_deaths: 0, reported: "2020-03-17" },
  "Batna": { confirmed: 26, recovered: 0, deaths: 4, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-26" },
  "Biskra": { confirmed: 20, recovered: 2, deaths: 4, new_confirmed: 2, new_recovered: 0, new_deaths: 0, reported: "2020-03-25" },
  "Blida": { confirmed: 677, recovered: 32, deaths: 97, new_confirmed: 8, new_recovered: 0, new_deaths: 1, reported: "2020-03-01" },
  "Bordj Bou Arréridj": { confirmed: 62, recovered: 0, deaths: 14, new_confirmed: 2, new_recovered: 0, new_deaths: 0, reported: "2020-03-16" },
  "Bouira": { confirmed: 18, recovered: 0, deaths: 2, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-16" },
  "Boumerdès": { confirmed: 36, recovered: 1, deaths: 6, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-18" },
  "Chlef": { confirmed: 49, recovered: 0, deaths: 1, new_confirmed: 4, new_recovered: 0, new_deaths: 0, reported: "2020-03-23" },
  "Constantine": { confirmed: 72, recovered: 0, deaths: 9, new_confirmed: 14, new_recovered: 0, new_deaths: 0, reported: "2020-03-22" },
  "Djelfa": { confirmed: 42, recovered: 0, deaths: 3, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-27" },
  "El Bayadh": { confirmed: 1, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-06" },
  "El Oued": { confirmed: 31, recovered: 0, deaths: 7, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-18" },
  "El Tarf": { confirmed: 8, recovered: 0, deaths: 0, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-27" },
  "Ghardaïa": { confirmed: 32, recovered: 0, deaths: 4, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-27" },
  "Guelma": { confirmed: 11, recovered: 0, deaths: 0, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-14" },
  "Illizi": { confirmed: 2, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-31" },
  "Jijel": { confirmed: 31, recovered: 0, deaths: 4, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-23" },
  "Khenchela": { confirmed: 22, recovered: 0, deaths: 2, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-20" },
  "Laghouat": { confirmed: 16, recovered: 0, deaths: 0, new_confirmed: 3, new_recovered: 0, new_deaths: 0, reported: "2020-03-26" },
  "M'Sila": { confirmed: 15, recovered: 0, deaths: 6, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-31" },
  "Médéa": { confirmed: 41, recovered: 1, deaths: 8, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-18" },
  "Mascara": { confirmed: 24, recovered: 2, deaths: 4, new_confirmed: 2, new_recovered: 0, new_deaths: 0, reported: "2020-03-05" },
  "Mila": { confirmed: 9, recovered: 0, deaths: 1, new_confirmed: 2, new_recovered: 0, new_deaths: 0, reported: "2020-04-04" },
  "Mostaganem": { confirmed: 51, recovered: 0, deaths: 3, new_confirmed: 4, new_recovered: 0, new_deaths: 0, reported: "2020-03-23" },
  "Naâma": { confirmed: 1, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-06" },
  "Oran": { confirmed: 160, recovered: 0, deaths: 12, new_confirmed: 7, new_recovered: 0, new_deaths: 0, reported: "2020-03-19" },
  "Ouargla": { confirmed: 34, recovered: 1, deaths: 3, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-02-25" },
  "Oum el Bouaghi": { confirmed: 33, recovered: 0, deaths: 4, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-26" },
  "Relizane": { confirmed: 12, recovered: 0, deaths: 2, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-21" },
  "Sétif": { confirmed: 112, recovered: 2, deaths: 9, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-19" },
  "Saïda": { confirmed: 1, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-10" },
  "Sidi Bel Abbès": { confirmed: 26, recovered: 0, deaths: 5, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-23" },
  "Skikda": { confirmed: 30, recovered: 3, deaths: 2, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-12" },
  "Souk Ahras": { confirmed: 7, recovered: 0, deaths: 1, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-12" },
  "Tébessa": { confirmed: 12, recovered: 0, deaths: 2, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-04-03" },
  "Tamanghasset": { confirmed: 1, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-13" },
  "Tiaret": { confirmed: 15, recovered: 0, deaths: 2, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-02" },
  "Tindouf": { confirmed: 0, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "" },
  "Tipaza": { confirmed: 97, recovered: 0, deaths: 17, new_confirmed: 7, new_recovered: 0, new_deaths: 0, reported: "2020-03-23" },
  "Tissemsilt": { confirmed: 29, recovered: 1, deaths: 2, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-19" },
  "Tizi Ouzou": { confirmed: 95, recovered: 2, deaths: 10, new_confirmed: 4, new_recovered: 0, new_deaths: 0, reported: "2020-03-12" },
  "Tlemcen": { confirmed: 44, recovered: 0, deaths: 6, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-23" }
}
