const date = ['2/25/20', '2/26/20', '2/27/20', '2/28/20', '2/29/20', '3/1/20', '3/2/20', '3/3/20', '3/4/20', '3/5/20', '3/6/20', '3/7/20', '3/8/20', '3/9/20', '3/10/20', '3/11/20', '3/12/20', '3/13/20', '3/14/20', '3/15/20', '3/16/20', '3/17/20', '3/18/20', '3/19/20', '3/20/20', '3/21/20', '3/22/20', '3/23/20', '3/24/20', '3/25/20', '3/26/20', '3/27/20', '3/28/20', '3/29/20', '3/30/20', '3/31/20', '4/1/20', '4/2/20', '4/3/20', '4/4/20', '4/5/20', '4/6/20', '4/7/20', '4/8/20', '4/9/20', '4/10/20', '4/11/20', '4/12/20', '4/13/20', '4/14/20', '4/15/20', '4/16/20', '4/17/20', '4/18/20', '4/19/20', '4/20/20', '4/21/20', '4/22/20', '4/23/20', '4/24/20', '4/25/20', '4/26/20', '4/27/20']
const confirmed = [1, 1, 1, 1, 1, 1, 3, 5, 12, 12, 17, 17, 19, 20, 20, 20, 24, 26, 37, 48, 54, 60, 74, 90, 102, 139, 201, 230, 264, 302, 367, 409, 454, 511, 584, 716, 847, 986, 1171, 1251, 1320, 1423, 1468, 1572, 1666, 1761, 1825, 1914, 1983, 2070, 2160, 2268, 2418, 2534, 2629, 2718, 2811, 2910, 3007, 3127, 3256, 3382, 3517]
const recovered = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 10, 12, 12, 12, 12, 12, 12, 22, 23, 23, 24, 24, 29, 29, 31, 31, 37, 46, 61, 61, 62, 90, 90, 90, 113, 237, 347, 405, 460, 591, 601, 691, 708, 783, 846, 894, 1047, 1099, 1152, 1204, 1355, 1408, 1479, 1508, 1558]
const deaths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 6, 9, 11, 15, 17, 17, 19, 21, 25, 26, 29, 31, 35, 44, 58, 83, 105, 130, 152, 173, 193, 205, 235, 256, 275, 293, 313, 326, 336, 348, 364, 367, 375, 384, 392, 402, 407, 415, 419, 425, 432]
const gender = ['Male', 'Female']
const genderData = [2011, 1506]
const age = ['< 1', '1 - 14', '15 - 24', '25 - 49', '50 - 59', '+60', 'N/A']
const ageConfirmedData = [4, 63, 132, 1315, 608, 1255, 140]
const ageDeathsData = [0, 1, 1, 36, 75, 319, 0]
const lastUpdated = '2020-04-27 17:54'
const provinces = {
  "Aïn Defla": { id: 44, confirmed: 134, recovered: 0, deaths: 5, new_confirmed: 8, new_recovered: 0, new_deaths: 0, reported: "2020-03-27", last_reported: "2020-04-27" },
  "Aïn Témouchent": { id: 46, confirmed: 34, recovered: 0, deaths: 4, new_confirmed: 3, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-04-27" },
  "Adrar": { id: 1, confirmed: 35, recovered: 0, deaths: 1, new_confirmed: 4, new_recovered: 0, new_deaths: 0, reported: "2020-03-15", last_reported: "2020-04-27" },
  "Alger": { id: 16, confirmed: 480, recovered: 11, deaths: 105, new_confirmed: 5, new_recovered: 50, new_deaths: 2, reported: "2020-03-13", last_reported: "2020-04-27" },
  "Annaba": { id: 23, confirmed: 25, recovered: 3, deaths: 3, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-16", last_reported: "2020-04-25" },
  "Béchar": { id: 8, confirmed: 30, recovered: 0, deaths: 0, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-04-03", last_reported: "2020-04-27" },
  "Béjaïa": { id: 6, confirmed: 121, recovered: 1, deaths: 14, new_confirmed: 5, new_recovered: 0, new_deaths: 0, reported: "2020-03-17", last_reported: "2020-04-27" },
  "Batna": { id: 5, confirmed: 26, recovered: 0, deaths: 4, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-26", last_reported: "2020-04-17" },
  "Biskra": { id: 7, confirmed: 52, recovered: 2, deaths: 6, new_confirmed: 8, new_recovered: 0, new_deaths: 0, reported: "2020-03-25", last_reported: "2020-04-27" },
  "Blida": { id: 9, confirmed: 761, recovered: 32, deaths: 107, new_confirmed: 12, new_recovered: 0, new_deaths: 3, reported: "2020-03-01", last_reported: "2020-04-27" },
  "Bordj Bou Arréridj": { id: 34, confirmed: 87, recovered: 0, deaths: 17, new_confirmed: 5, new_recovered: 0, new_deaths: 0, reported: "2020-03-16", last_reported: "2020-04-27" },
  "Bouira": { id: 10, confirmed: 24, recovered: 0, deaths: 3, new_confirmed: 2, new_recovered: 0, new_deaths: 0, reported: "2020-03-16", last_reported: "2020-04-27" },
  "Boumerdès": { id: 35, confirmed: 43, recovered: 1, deaths: 8, new_confirmed: 1, new_recovered: 0, new_deaths: 1, reported: "2020-03-18", last_reported: "2020-04-27" },
  "Chlef": { id: 2, confirmed: 49, recovered: 0, deaths: 1, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-04-20" },
  "Constantine": { id: 25, confirmed: 142, recovered: 0, deaths: 9, new_confirmed: 12, new_recovered: 0, new_deaths: 0, reported: "2020-03-22", last_reported: "2020-04-27" },
  "Djelfa": { id: 17, confirmed: 50, recovered: 0, deaths: 4, new_confirmed: 2, new_recovered: 0, new_deaths: 0, reported: "2020-03-27", last_reported: "2020-04-27" },
  "El Bayadh": { id: 32, confirmed: 3, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-06", last_reported: "2020-04-22" },
  "El Oued": { id: 39, confirmed: 35, recovered: 0, deaths: 8, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-18", last_reported: "2020-04-26" },
  "El Tarf": { id: 36, confirmed: 13, recovered: 0, deaths: 0, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-27", last_reported: "2020-04-27" },
  "Ghardaïa": { id: 47, confirmed: 51, recovered: 0, deaths: 4, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-27", last_reported: "2020-04-26" },
  "Guelma": { id: 24, confirmed: 19, recovered: 0, deaths: 1, new_confirmed: 2, new_recovered: 0, new_deaths: 0, reported: "2020-03-14", last_reported: "2020-04-27" },
  "Illizi": { id: 33, confirmed: 2, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-31", last_reported: "2020-04-05" },
  "Jijel": { id: 18, confirmed: 43, recovered: 0, deaths: 5, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-04-26" },
  "Khenchela": { id: 40, confirmed: 30, recovered: 0, deaths: 2, new_confirmed: 5, new_recovered: 0, new_deaths: 0, reported: "2020-03-20", last_reported: "2020-04-27" },
  "Laghouat": { id: 3, confirmed: 24, recovered: 0, deaths: 0, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-26", last_reported: "2020-04-27" },
  "M'Sila": { id: 28, confirmed: 17, recovered: 0, deaths: 7, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-31", last_reported: "2020-04-23" },
  "Médéa": { id: 26, confirmed: 51, recovered: 1, deaths: 10, new_confirmed: 5, new_recovered: 0, new_deaths: 0, reported: "2020-03-18", last_reported: "2020-04-27" },
  "Mascara": { id: 29, confirmed: 40, recovered: 2, deaths: 4, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-05", last_reported: "2020-04-27" },
  "Mila": { id: 43, confirmed: 11, recovered: 0, deaths: 1, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-04", last_reported: "2020-04-25" },
  "Mostaganem": { id: 27, confirmed: 57, recovered: 0, deaths: 3, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-04-27" },
  "Naâma": { id: 45, confirmed: 3, recovered: 0, deaths: 0, new_confirmed: 2, new_recovered: 0, new_deaths: 0, reported: "2020-04-06", last_reported: "2020-04-27" },
  "Oran": { id: 31, confirmed: 202, recovered: 0, deaths: 13, new_confirmed: 8, new_recovered: 0, new_deaths: 0, reported: "2020-03-19", last_reported: "2020-04-27" },
  "Ouargla": { id: 30, confirmed: 57, recovered: 1, deaths: 5, new_confirmed: 4, new_recovered: 0, new_deaths: 0, reported: "2020-02-25", last_reported: "2020-04-27" },
  "Oum el Bouaghi": { id: 4, confirmed: 59, recovered: 0, deaths: 4, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-26", last_reported: "2020-04-26" },
  "Relizane": { id: 48, confirmed: 24, recovered: 0, deaths: 3, new_confirmed: 5, new_recovered: 0, new_deaths: 0, reported: "2020-03-21", last_reported: "2020-04-27" },
  "Sétif": { id: 19, confirmed: 173, recovered: 2, deaths: 12, new_confirmed: 13, new_recovered: 0, new_deaths: 1, reported: "2020-03-19", last_reported: "2020-04-27" },
  "Saïda": { id: 20, confirmed: 4, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-10", last_reported: "2020-04-21" },
  "Sidi Bel Abbès": { id: 22, confirmed: 41, recovered: 0, deaths: 6, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-04-26" },
  "Skikda": { id: 21, confirmed: 36, recovered: 3, deaths: 4, new_confirmed: 2, new_recovered: 0, new_deaths: 0, reported: "2020-03-12", last_reported: "2020-04-27" },
  "Souk Ahras": { id: 41, confirmed: 9, recovered: 0, deaths: 1, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-12", last_reported: "2020-04-26" },
  "Tébessa": { id: 12, confirmed: 23, recovered: 0, deaths: 3, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-04-03", last_reported: "2020-04-27" },
  "Tamanghasset": { id: 11, confirmed: 1, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-13", last_reported: "2020-04-13" },
  "Tiaret": { id: 14, confirmed: 54, recovered: 0, deaths: 2, new_confirmed: 2, new_recovered: 0, new_deaths: 0, reported: "2020-04-02", last_reported: "2020-04-27" },
  "Tindouf": { id: 37, confirmed: 0, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "", last_reported: "" },
  "Tipaza": { id: 42, confirmed: 126, recovered: 0, deaths: 21, new_confirmed: 4, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-04-27" },
  "Tissemsilt": { id: 38, confirmed: 46, recovered: 1, deaths: 2, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-19", last_reported: "2020-04-26" },
  "Tizi Ouzou": { id: 15, confirmed: 99, recovered: 2, deaths: 14, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-12", last_reported: "2020-04-26" },
  "Tlemcen": { id: 13, confirmed: 71, recovered: 0, deaths: 6, new_confirmed: 10, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-04-27" }
}
