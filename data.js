const date = ['2/25/20', '2/26/20', '2/27/20', '2/28/20', '2/29/20', '3/1/20', '3/2/20', '3/3/20', '3/4/20', '3/5/20', '3/6/20', '3/7/20', '3/8/20', '3/9/20', '3/10/20', '3/11/20', '3/12/20', '3/13/20', '3/14/20', '3/15/20', '3/16/20', '3/17/20', '3/18/20', '3/19/20', '3/20/20', '3/21/20', '3/22/20', '3/23/20', '3/24/20', '3/25/20', '3/26/20', '3/27/20', '3/28/20', '3/29/20', '3/30/20', '3/31/20', '4/1/20']
const confirmed = [1,1,1,1,1,1,3,5,12,12,17,17,19,20,20,20,24,26,37,48,54,60,74,90,102,139,201,230,264,302,367,409,454,511,584,716,847]
const recovered = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,10,12,12,12,12,12,12,22,23,23,24,24,29,29,31,31,37,46,61]
const deaths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,4,4,6,9,11,15,17,17,19,21,25,26,29,31,35,44,58]
const gender = ['Man', 'Woman']
const genderData = [393, 323]
const age = ['< 1', '1 - 14', '15 - 24', '25 - 49', '50 - 59', '+60', 'N/A']
const ageConfirmedData = [0, 12, 27, 332, 150, 311, 24]
const ageDeathsData = [0, 0, 0, 0, 4, 18, 31]
const lastUpdated = '2020-04-02 12:15'
const provinces = {
  "Aïn Defla": { confirmed: 15, recovered: 0, deaths: 1, reported: "2020-03-27" },
  "Aïn Témouchent": { confirmed: 5, recovered: 0, deaths: 1, reported: "2020-03-23" },
  "Adrar": { confirmed: 3, recovered: 0, deaths: 0, reported: "2020-03-15" },
  "Alger": { confirmed: 136, recovered: 11, deaths: 9, reported: "2020-03-13" },
  "Annaba": { confirmed: 6, recovered: 3, deaths: 0, reported: "2020-03-16" },
  "Béchar": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Béjaïa": { confirmed: 29, recovered: 1, deaths: 2, reported: "2020-03-17" },
  "Batna": { confirmed: 6, recovered: 0, deaths: 0, reported: "2020-03-26" },
  "Biskra": { confirmed: 2, recovered: 1, deaths: 0, reported: "2020-03-25" },
  "Blida": { confirmed: 342, recovered: 32, deaths: 17, reported: "2020-03-01" },
  "Bordj Bou Arréridj": { confirmed: 11, recovered: 0, deaths: 2, reported: "2020-03-16" },
  "Bouira": { confirmed: 7, recovered: 1, deaths: 0, reported: "2020-03-16" },
  "Boumerdès": { confirmed: 10, recovered: 1, deaths: 1, reported: "2020-03-18" },
  "Chlef": { confirmed: 8, recovered: 0, deaths: 0, reported: "2020-03-23" },
  "Constantine": { confirmed: 11, recovered: 0, deaths: 3, reported: "2020-03-22" },
  "Djelfa": { confirmed: 5, recovered: 0, deaths: 0, reported: "2020-03-27" },
  "El Bayadh": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "El Oued": { confirmed: 16, recovered: 0, deaths: 2, reported: "2020-03-18" },
  "El Tarf": { confirmed: 4, recovered: 0, deaths: 0, reported: "2020-03-27" },
  "Ghardaïa": { confirmed: 2, recovered: 0, deaths: 1, reported: "2020-03-27" },
  "Guelma": { confirmed: 3, recovered: 0, deaths: 0, reported: "2020-03-14" },
  "Illizi": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-31" },
  "Jijel": { confirmed: 11, recovered: 0, deaths: 0, reported: "2020-03-23" },
  "Khenchela": { confirmed: 2, recovered: 0, deaths: 1, reported: "2020-03-20" },
  "Laghouat": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-26" },
  "M'Sila": { confirmed: 1, recovered: 0, deaths: 0, reported: "2020-03-31" },
  "Médéa": { confirmed: 21, recovered: 1, deaths: 3, reported: "2020-03-18" },
  "Mascara": { confirmed: 9, recovered: 2, deaths: 0, reported: "2020-03-05" },
  "Mila": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Mostaganem": { confirmed: 10, recovered: 1, deaths: 1, reported: "2020-03-23" },
  "Naâma": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Oran": { confirmed: 48, recovered: 0, deaths: 3, reported: "2020-03-19" },
  "Ouargla": { confirmed: 2, recovered: 1, deaths: 0, reported: "2020-02-25" },
  "Oum el Bouaghi": { confirmed: 4, recovered: 0, deaths: 1, reported: "2020-03-26" },
  "Relizane": { confirmed: 3, recovered: 0, deaths: 1, reported: "2020-03-21" },
  "Sétif": { confirmed: 23, recovered: 2, deaths: 2, reported: "2020-03-19" },
  "Saïda": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Sidi Bel Abbès": { confirmed: 8, recovered: 0, deaths: 0, reported: "2020-03-23" },
  "Skikda": { confirmed: 12, recovered: 3, deaths: 0, reported: "2020-03-12" },
  "Souk Ahras": { confirmed: 4, recovered: 0, deaths: 0, reported: "2020-03-12" },
  "Tébessa": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Tamanghasset": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Tiaret": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Tindouf": { confirmed: 0, recovered: 0, deaths: 0, reported: "" },
  "Tipaza": { confirmed: 21, recovered: 0, deaths: 2, reported: "2020-03-23" },
  "Tissemsilt": { confirmed: 1, recovered: 1, deaths: 0, reported: "2020-03-19" },
  "Tizi Ouzou": { confirmed: 31, recovered: 2, deaths: 5, reported: "2020-03-12" },
  "Tlemcen": { confirmed: 13, recovered: 0, deaths: 0, reported: "2020-03-23" }
}
