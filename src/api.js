const URL = 'https://api.corona-dz.live/'

export function getProvinceData(provinceId) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}province/${provinceId}/all`).then((response) => {
      return response.json()
    }).then((data) => {
      if (data) {
        // console.log('hello', data[0].data)
        resolve(data[0].data)
      }
      reject(Error(`getProvinceSummary provinceId:${provinceId}`))
    })
  })
}
