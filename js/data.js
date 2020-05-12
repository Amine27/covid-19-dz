const date = ['2/25/20', '2/26/20', '2/27/20', '2/28/20', '2/29/20', '3/1/20', '3/2/20', '3/3/20', '3/4/20', '3/5/20', '3/6/20', '3/7/20', '3/8/20', '3/9/20', '3/10/20', '3/11/20', '3/12/20', '3/13/20', '3/14/20', '3/15/20', '3/16/20', '3/17/20', '3/18/20', '3/19/20', '3/20/20', '3/21/20', '3/22/20', '3/23/20', '3/24/20', '3/25/20', '3/26/20', '3/27/20', '3/28/20', '3/29/20', '3/30/20', '3/31/20', '4/1/20', '4/2/20', '4/3/20', '4/4/20', '4/5/20', '4/6/20', '4/7/20', '4/8/20', '4/9/20', '4/10/20', '4/11/20', '4/12/20', '4/13/20', '4/14/20', '4/15/20', '4/16/20', '4/17/20', '4/18/20', '4/19/20', '4/20/20', '4/21/20', '4/22/20', '4/23/20', '4/24/20', '4/25/20', '4/26/20', '4/27/20', '4/28/20', '4/29/20', '4/30/20', '5/1/20', '5/2/20', '5/3/20', '5/4/20', '5/5/20', '5/6/20', '5/7/20', '5/8/20', '5/9/20', '5/10/20', '5/11/20', '5/12/20']
const confirmed = [1, 1, 1, 1, 1, 1, 3, 5, 12, 12, 17, 17, 19, 20, 20, 20, 24, 26, 37, 48, 54, 60, 74, 90, 102, 139, 201, 230, 264, 302, 367, 409, 454, 511, 584, 716, 847, 986, 1171, 1251, 1320, 1423, 1468, 1572, 1666, 1761, 1825, 1914, 1983, 2070, 2160, 2268, 2418, 2534, 2629, 2718, 2811, 2910, 3007, 3127, 3256, 3382, 3517, 3649, 3848, 4006, 4154, 4295, 4474, 4648, 4838, 4997, 5182, 5369, 5558, 5723, 5891, 6067]
const recovered = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 10, 12, 12, 12, 12, 12, 12, 22, 23, 23, 24, 24, 29, 29, 31, 31, 37, 46, 61, 61, 62, 90, 90, 90, 113, 237, 347, 405, 460, 591, 601, 691, 708, 783, 846, 894, 1047, 1099, 1152, 1204, 1355, 1408, 1479, 1508, 1558, 1651, 1702, 1779, 1821, 1872, 1936, 1998, 2067, 2197, 2323, 2467, 2546, 2678, 2841, 2998]
const deaths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 6, 9, 11, 15, 17, 17, 19, 21, 25, 26, 29, 31, 35, 44, 58, 83, 105, 130, 152, 173, 193, 205, 235, 256, 275, 293, 313, 326, 336, 348, 364, 367, 375, 384, 392, 402, 407, 415, 419, 425, 432, 437, 444, 450, 453, 459, 463, 465, 470, 476, 483, 488, 494, 502, 507, 515]
const treatment = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1248, 1704, 1752, 1752, 1752, 2679, 2890, 3213, 3213, 3213, 3213, 4076, 4156, 4205, 4205, 4852, 4852, 5235, 5644, 5863, 6174, 6424, 6666, 6805, 7026, 7305, 7373, 7710, 7994, 8298, 8706, 8880, 9157, 9323, 9557, 9876]
const gender = ['Male', 'Female']
const genderData = [3397, 2670]
const age = ['< 1', '1 - 14', '15 - 24', '25 - 49', '50 - 59', '+60', 'N/A']
const ageConfirmedData = [6, 121, 249, 2416, 1027, 2013, 235]
const ageDeathsData = [0, 1, 1, 42, 81, 390, 0]
const lastUpdated = '2020-05-12 17:27'
const provinces = {
  "Aïn Defla": { id: 44, confirmed: 299, recovered: 0, deaths: 5, new_confirmed: 5, new_recovered: 0, new_deaths: 0, reported: "2020-03-27", last_reported: "2020-05-12" },
  "Aïn Témouchent": { id: 46, confirmed: 77, recovered: 0, deaths: 4, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-05-11" },
  "Adrar": { id: 1, confirmed: 70, recovered: 0, deaths: 3, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-15", last_reported: "2020-05-11" },
  "Alger": { id: 16, confirmed: 677, recovered: 11, deaths: 115, new_confirmed: 37, new_recovered: 0, new_deaths: 0, reported: "2020-03-13", last_reported: "2020-05-12" },
  "Annaba": { id: 23, confirmed: 107, recovered: 3, deaths: 4, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-16", last_reported: "2020-05-11" },
  "Béchar": { id: 8, confirmed: 87, recovered: 0, deaths: 0, new_confirmed: 4, new_recovered: 0, new_deaths: 0, reported: "2020-04-03", last_reported: "2020-05-12" },
  "Béjaïa": { id: 6, confirmed: 178, recovered: 1, deaths: 16, new_confirmed: 3, new_recovered: 0, new_deaths: 0, reported: "2020-03-17", last_reported: "2020-05-12" },
  "Batna": { id: 5, confirmed: 83, recovered: 0, deaths: 7, new_confirmed: 4, new_recovered: 0, new_deaths: 2, reported: "2020-03-26", last_reported: "2020-05-12" },
  "Biskra": { id: 7, confirmed: 81, recovered: 2, deaths: 6, new_confirmed: 5, new_recovered: 0, new_deaths: 0, reported: "2020-03-25", last_reported: "2020-05-12" },
  "Blida": { id: 9, confirmed: 939, recovered: 32, deaths: 115, new_confirmed: 5, new_recovered: 0, new_deaths: 1, reported: "2020-03-01", last_reported: "2020-05-12" },
  "Bordj Bou Arréridj": { id: 34, confirmed: 198, recovered: 0, deaths: 26, new_confirmed: 3, new_recovered: 0, new_deaths: 0, reported: "2020-03-16", last_reported: "2020-05-12" },
  "Bouira": { id: 10, confirmed: 46, recovered: 0, deaths: 4, new_confirmed: 4, new_recovered: 0, new_deaths: 0, reported: "2020-03-16", last_reported: "2020-05-12" },
  "Boumerdès": { id: 35, confirmed: 68, recovered: 1, deaths: 8, new_confirmed: 3, new_recovered: 0, new_deaths: 0, reported: "2020-03-18", last_reported: "2020-05-12" },
  "Chlef": { id: 2, confirmed: 68, recovered: 0, deaths: 1, new_confirmed: 5, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-05-12" },
  "Constantine": { id: 25, confirmed: 272, recovered: 0, deaths: 12, new_confirmed: 13, new_recovered: 0, new_deaths: 0, reported: "2020-03-22", last_reported: "2020-05-12" },
  "Djelfa": { id: 17, confirmed: 102, recovered: 0, deaths: 6, new_confirmed: 0, new_recovered: 0, new_deaths: 1, reported: "2020-03-27", last_reported: "2020-05-11" },
  "El Bayadh": { id: 32, confirmed: 16, recovered: 0, deaths: 1, new_confirmed: 0, new_recovered: 0, new_deaths: 1, reported: "2020-04-06", last_reported: "2020-05-11" },
  "El Oued": { id: 39, confirmed: 48, recovered: 0, deaths: 8, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-18", last_reported: "2020-05-10" },
  "El Tarf": { id: 36, confirmed: 21, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-27", last_reported: "2020-05-10" },
  "Ghardaïa": { id: 47, confirmed: 84, recovered: 0, deaths: 5, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-27", last_reported: "2020-05-12" },
  "Guelma": { id: 24, confirmed: 36, recovered: 0, deaths: 1, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-14", last_reported: "2020-05-10" },
  "Illizi": { id: 33, confirmed: 3, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-31", last_reported: "2020-05-10" },
  "Jijel": { id: 18, confirmed: 49, recovered: 0, deaths: 5, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-05-08" },
  "Khenchela": { id: 40, confirmed: 57, recovered: 0, deaths: 3, new_confirmed: 7, new_recovered: 0, new_deaths: 0, reported: "2020-03-20", last_reported: "2020-05-12" },
  "Laghouat": { id: 3, confirmed: 49, recovered: 0, deaths: 0, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-26", last_reported: "2020-05-12" },
  "M'Sila": { id: 28, confirmed: 48, recovered: 0, deaths: 9, new_confirmed: 0, new_recovered: 0, new_deaths: 1, reported: "2020-03-31", last_reported: "2020-05-11" },
  "Médéa": { id: 26, confirmed: 148, recovered: 1, deaths: 10, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-03-18", last_reported: "2020-05-12" },
  "Mascara": { id: 29, confirmed: 86, recovered: 2, deaths: 6, new_confirmed: 0, new_recovered: 0, new_deaths: 1, reported: "2020-03-05", last_reported: "2020-05-11" },
  "Mila": { id: 43, confirmed: 30, recovered: 0, deaths: 2, new_confirmed: 5, new_recovered: 0, new_deaths: 0, reported: "2020-04-04", last_reported: "2020-05-12" },
  "Mostaganem": { id: 27, confirmed: 60, recovered: 0, deaths: 3, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-04-30" },
  "Naâma": { id: 45, confirmed: 33, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-06", last_reported: "2020-05-11" },
  "Oran": { id: 31, confirmed: 376, recovered: 0, deaths: 14, new_confirmed: 23, new_recovered: 0, new_deaths: 0, reported: "2020-03-19", last_reported: "2020-05-12" },
  "Ouargla": { id: 30, confirmed: 138, recovered: 1, deaths: 12, new_confirmed: 5, new_recovered: 0, new_deaths: 0, reported: "2020-02-25", last_reported: "2020-05-12" },
  "Oum el Bouaghi": { id: 4, confirmed: 120, recovered: 0, deaths: 6, new_confirmed: 4, new_recovered: 0, new_deaths: 1, reported: "2020-03-26", last_reported: "2020-05-12" },
  "Relizane": { id: 48, confirmed: 37, recovered: 0, deaths: 3, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-21", last_reported: "2020-05-07" },
  "Sétif": { id: 19, confirmed: 309, recovered: 2, deaths: 19, new_confirmed: 21, new_recovered: 0, new_deaths: 0, reported: "2020-03-19", last_reported: "2020-05-12" },
  "Saïda": { id: 20, confirmed: 6, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-10", last_reported: "2020-05-11" },
  "Sidi Bel Abbès": { id: 22, confirmed: 61, recovered: 0, deaths: 8, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-05-11" },
  "Skikda": { id: 21, confirmed: 69, recovered: 3, deaths: 5, new_confirmed: 5, new_recovered: 0, new_deaths: 0, reported: "2020-03-12", last_reported: "2020-05-12" },
  "Souk Ahras": { id: 41, confirmed: 27, recovered: 0, deaths: 1, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-12", last_reported: "2020-05-10" },
  "Tébessa": { id: 12, confirmed: 43, recovered: 0, deaths: 3, new_confirmed: 4, new_recovered: 0, new_deaths: 0, reported: "2020-04-03", last_reported: "2020-05-12" },
  "Tamanghasset": { id: 11, confirmed: 3, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-04-13", last_reported: "2020-04-29" },
  "Tiaret": { id: 14, confirmed: 127, recovered: 0, deaths: 7, new_confirmed: 1, new_recovered: 0, new_deaths: 0, reported: "2020-04-02", last_reported: "2020-05-12" },
  "Tindouf": { id: 37, confirmed: 14, recovered: 0, deaths: 0, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-05-01", last_reported: "2020-05-10" },
  "Tipaza": { id: 42, confirmed: 231, recovered: 0, deaths: 28, new_confirmed: 7, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-05-12" },
  "Tissemsilt": { id: 38, confirmed: 63, recovered: 1, deaths: 2, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-19", last_reported: "2020-05-10" },
  "Tizi Ouzou": { id: 15, confirmed: 124, recovered: 2, deaths: 15, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-12", last_reported: "2020-05-10" },
  "Tlemcen": { id: 13, confirmed: 199, recovered: 0, deaths: 7, new_confirmed: 0, new_recovered: 0, new_deaths: 0, reported: "2020-03-23", last_reported: "2020-05-11" }
}
