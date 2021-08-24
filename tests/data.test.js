import {
  date, confirmed, recovered, deaths, critical, lastUpdated, provinces, vaccinatedDate, vaccinatedPartly, vaccinatedFully, populationTotal
} from '../src/data.js'

import moment from 'moment'

describe('Data test routines', () => {
  const LAST_VALUE = 1
  const BEFORE_LAST_VALUE = 2
  const PROVINCES_NUMBER = 48
  const POPULATION_TOTAL = 43900000

  test('test that date, confirmed, recovered and deaths arrays have the same length', () => {
    expect(date.length).toBe(confirmed.length)
    expect(date.length).toBe(recovered.length)
    expect(date.length).toBe(deaths.length)
  })

  test('test that last date format is correct', () => {
    expect(moment(date[date.length - LAST_VALUE], 'M/D/YY', true).isValid()).toBeTruthy()
  })

  test('test that last date value is correct', () => {
    const newDay = date[date.length - LAST_VALUE]
    const calcNewDay = moment(date[date.length - BEFORE_LAST_VALUE], 'M/D/YY').add(1, 'day').format('M/D/YY')
    expect(newDay).toBe(calcNewDay)
  })

  test('test that last confirmed value is correct', () => {
    expect(confirmed[confirmed.length - LAST_VALUE]).toBeGreaterThanOrEqual(confirmed[confirmed.length - BEFORE_LAST_VALUE])
  })

  test('test that last recovered value is correct', () => {
    expect(recovered[recovered.length - LAST_VALUE]).toBeGreaterThanOrEqual(recovered[recovered.length - BEFORE_LAST_VALUE])
  })

  test('test that last deaths value is correct', () => {
    expect(deaths[deaths.length - LAST_VALUE]).toBeGreaterThanOrEqual(deaths[deaths.length - BEFORE_LAST_VALUE])
  })

  test('test that critical value is correct', () => {
    expect(Number.isNaN(critical)).toBeFalsy()
  })

  test('test that lastUpdated format is correct', () => {
    expect(moment(lastUpdated, 'YYYY-MM-DD HH:mm', true).isValid()).toBeTruthy()
  })

  test('test that vaccinated date, fully and partly have the same length', () => {
    expect(vaccinatedDate.length).toBe(vaccinatedFully.length)
    expect(vaccinatedDate.length).toBe(vaccinatedPartly.length)
  })

  test('test that vaccinated values are correct', () => {
    expect(vaccinatedFully[vaccinatedFully.length - LAST_VALUE]).toBeLessThanOrEqual(vaccinatedPartly[vaccinatedPartly.length - LAST_VALUE])
  })

  test('test that population is correct', () => {
    expect(populationTotal).toBe(POPULATION_TOTAL)
  })

  test('test that provinces length is correct', () => {
    expect(Object.keys(provinces).length).toBe(PROVINCES_NUMBER)
  })
})
