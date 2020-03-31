const date = ['2020-02-25', '2020-02-26', '2020-02-27', '2020-02-28', '2020-02-29', '2020-03-01', '2020-03-02', '2020-03-03', '2020-03-04', '2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11', '2020-03-12', '2020-03-13', '2020-03-14', '2020-03-15', '2020-03-16', '2020-03-17', '2020-03-18', '2020-03-19', '3', '2020-03-21', '2020-03-22', '2020-03-23', '2020-03-24', '2020-03-25', '2020-03-26', '2020-03-27', '2020-03-28', '2020-03-29', '2020-03-30', '2020-03-31']
const confirmed = [1,1,1,1,1,1,3,5,12,12,17,17,19,20,20,20,24,26,37,48,54,60,74,90,102,139,201,230,264,302,367,409,454,511,584,716]
const recovered = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,10,12,12,12,12,12,12,22,23,23,24,24,29,29,31,31,37,37]
const deaths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,4,4,6,9,11,15,17,17,19,21,25,26,29,31,35,44]
const gender = ['Man', 'Woman']
const genderData = [228, 182]
const age = ['< 5', '5 - 14', '15 - 24', '25 - 34', '35 - 44', '45 - 59', '60 - 70', '+70']
const ageConfirmedData = [2, 9, 25, 55, 68, 71, 70, 60]
const ageDeathsData = [0, 0, 0, 0, 1, 12, 12, 10]
const lastUpdated = '2020-03-31 16:53'
const provinces = {
  "Aïn Defla": { confirmed: 1, recovered: 0, deaths: 1, reported: "2020-03-27" },
  "Aïn Témouchent": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-23" },
  "Adrar": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-15" },
  "Alger": { confirmed: 65, recovered: 0, deaths: 2, reported: "2020-03-13" },
  "Annaba": { confirmed: 6, recovered: 0, deaths: 1, reported: "2020-03-16" },
  "Béchar": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Béjaïa": { confirmed: 5, recovered: 0, deaths: 2, reported: "2020-03-17" },
  "Batna": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-26" },
  "Biskra": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-25" },
  "Blida": { confirmed: 220, recovered: 33, deaths: 10, reported: "2020-03-01" },
  "Bordj Bou Arréridj": { confirmed: 6, recovered: 0, deaths: 1, reported: "2020-03-16" },
  "Bouira": { confirmed: 3, recovered: 1, deaths: 0, reported: "2020-03-16" },
  "Boumerdès": { confirmed: 4, recovered: 0, deaths: 1, reported: "2020-03-18" },
  "Chlef": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-23" },
  "Constantine": { confirmed: 3, recovered: 0, deaths: 3, reported: "2020-03-22" },
  "Djelfa": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-27" },
  "El Bayadh": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "El Oued": { confirmed: 5, recovered: 0, deaths: 2, reported: "2020-03-18" },
  "El Tarf": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-27" },
  "Ghardaïa": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-27" },
  "Guelma": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-14" },
  "Illizi": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Jijel": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-23" },
  "Khenchela": { confirmed: 2, recovered: 0, deaths: 1, reported: "2020-03-20" },
  "Laghouat": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-26" },
  "M'Sila": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Médéa": { confirmed: 5, recovered: 0, deaths: 2, reported: "2020-03-18" },
  "Mascara": { confirmed: 3, recovered: 2, deaths: 0, reported: "2020-03-05" },
  "Mila": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Mostaganem": { confirmed: 6, recovered: 1, deaths: 1, reported: "2020-03-23" },
  "Naâma": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Oran": { confirmed: 16, recovered: 0, deaths: 2, reported: "2020-03-19" },
  "Ouargla": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-02-25" },
  "Oum el Bouaghi": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-26" },
  "Relizane": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-21" },
  "Sétif": { confirmed: 7, recovered: 0, deaths: 0, reported: "2020-03-19" },
  "Saïda": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Sidi Bel Abbès": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-23" },
  "Skikda": { confirmed: 6, recovered: 0, deaths: 0, reported: "2020-03-12" },
  "Souk Ahras": { confirmed: 2, recovered: 0, deaths: 0, reported: "2020-03-12" },
  "Tébessa": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Tamanghasset": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Tiaret": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Tindouf": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Tipaza": { confirmed: 9, recovered: 0, deaths: 1, reported: "2020-03-23" },
  "Tissemsilt": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-19" },
  "Tizi Ouzou": { confirmed: 15, recovered: 0, deaths: 4, reported: "2020-03-12" },
  "Tlemcen": { confirmed: 7, recovered: 0, deaths: 0, reported: "2020-03-23" }
}
