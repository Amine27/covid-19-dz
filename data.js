const date = ['2/25/20', '2/26/20', '2/27/20', '2/28/20', '2/29/20', '3/1/20', '3/2/20', '3/3/20', '3/4/20', '3/5/20', '3/6/20', '3/7/20', '3/8/20', '3/9/20', '3/10/20', '3/11/20', '3/12/20', '3/13/20', '3/14/20', '3/15/20', '3/16/20', '3/17/20', '3/18/20', '3/19/20', '3/20/20', '3/21/20', '3/22/20', '3/23/20', '3/24/20', '3/25/20', '3/26/20', '3/27/20', '3/28/20', '3/29/20', '3/30/20', '3/31/20']
const confirmed = [1,1,1,1,1,1,3,5,12,12,17,17,19,20,20,20,24,26,37,48,54,60,74,90,102,139,201,230,264,302,367,409,454,511,584,716]
const recovered = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,10,12,12,12,12,12,12,22,23,23,24,24,29,29,31,31,37,37]
const deaths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,4,4,6,9,11,15,17,17,19,21,25,26,29,31,35,44]
const gender = ['Man', 'Woman']
const genderData = [228, 182]
const age = ['< 5', '5 - 14', '15 - 24', '25 - 34', '35 - 44', '45 - 59', '60 - 70', '+70']
const ageConfirmedData = [2, 9, 25, 55, 68, 71, 70, 60]
const ageDeathsData = [0, 0, 0, 0, 1, 12, 12, 10]
const lastUpdated = '2020-03-31 19:01'
const provinces = {
  "Aïn Defla": { confirmed: 13, recovered: 0, deaths: 1, reported: "2020-03-27" },
  "Aïn Témouchent": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-23" },
  "Adrar": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-15" },
  "Alger": { confirmed: 125, recovered: 0, deaths: 2, reported: "2020-03-13" },
  "Annaba": { confirmed: 6, recovered: 0, deaths: 1, reported: "2020-03-16" },
  "Béchar": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Béjaïa": { confirmed: 26, recovered: 0, deaths: 2, reported: "2020-03-17" },
  "Batna": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-26" },
  "Biskra": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-25" },
  "Blida": { confirmed: 294, recovered: 33, deaths: 10, reported: "2020-03-01" },
  "Bordj Bou Arréridj": { confirmed: 11, recovered: 0, deaths: 1, reported: "2020-03-16" },
  "Bouira": { confirmed: 6, recovered: 1, deaths: 0, reported: "2020-03-16" },
  "Boumerdès": { confirmed: 9, recovered: 0, deaths: 1, reported: "2020-03-18" },
  "Chlef": { confirmed: 7, recovered: 0, deaths: 0, reported: "2020-03-23" },
  "Constantine": { confirmed: 8, recovered: 0, deaths: 3, reported: "2020-03-22" },
  "Djelfa": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-27" },
  "El Bayadh": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "El Oued": { confirmed: 7, recovered: 0, deaths: 2, reported: "2020-03-18" },
  "El Tarf": { confirmed: 4, recovered: 0, deaths: 0, reported: "2020-03-27" },
  "Ghardaïa": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-27" },
  "Guelma": { confirmed: 3, recovered: 0, deaths: 0, reported: "2020-03-14" },
  "Illizi": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-31" },
  "Jijel": { confirmed: 4, recovered: 0, deaths: 0, reported: "2020-03-23" },
  "Khenchela": { confirmed: 2, recovered: 0, deaths: 1, reported: "2020-03-20" },
  "Laghouat": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-26" },
  "M'Sila": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-31" },
  "Médéa": { confirmed: 17, recovered: 0, deaths: 2, reported: "2020-03-18" },
  "Mascara": { confirmed: 7, recovered: 2, deaths: 0, reported: "2020-03-05" },
  "Mila": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Mostaganem": { confirmed: 8, recovered: 1, deaths: 1, reported: "2020-03-23" },
  "Naâma": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Oran": { confirmed: 44, recovered: 0, deaths: 2, reported: "2020-03-19" },
  "Ouargla": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-02-25" },
  "Oum el Bouaghi": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-26" },
  "Relizane": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-21" },
  "Sétif": { confirmed: 19, recovered: 0, deaths: 0, reported: "2020-03-19" },
  "Saïda": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Sidi Bel Abbès": { confirmed: 6, recovered: 0, deaths: 0, reported: "2020-03-23" },
  "Skikda": { confirmed: 8, recovered: 0, deaths: 0, reported: "2020-03-12" },
  "Souk Ahras": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-12" },
  "Tébessa": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Tamanghasset": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Tiaret": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Tindouf": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Tipaza": { confirmed: 18, recovered: 0, deaths: 1, reported: "2020-03-23" },
  "Tissemsilt": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-19" },
  "Tizi Ouzou": { confirmed: 29, recovered: 0, deaths: 4, reported: "2020-03-12" },
  "Tlemcen": { confirmed: 12, recovered: 0, deaths: 0, reported: "2020-03-23" }
}
