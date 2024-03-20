import { DateService, DATE_FORMAT } from './date.service'

describe('DateService', () => {
  let dateService: DateService

  beforeEach(() => {
    dateService = new DateService()
  })

  describe('getDate', () => {
    it('should return the date with a specified format', () => {
      const initialDate = '2022-07-05T14:10:49.000Z'
      const date = dateService.getDate(initialDate, DATE_FORMAT)
      expect(date).toEqual('2022-07-05')
    })
  })

  describe(DateService.prototype.getDateISOString.name, () => {
    it('should return the date with a date-time specified format', () => {
      const spy = jest.spyOn(dateService, 'getDate')
      const initialDate = '2022-07-05'
      const expectedDate = '2022-07-05T00:00:00.000Z'
      const date = dateService.getDateISOString(initialDate)
      expect(spy).toBeCalledWith(initialDate)
      expect(date).toEqual(expectedDate)
    })
  })

  describe('addPeriod', () => {
    it('should add a period to a date and return it to the right format', () => {
      const initialDate = '2018-05-05'
      const expectedDate = '2018-05-07'

      const result = dateService.addPeriod(initialDate, 2, 'days')

      expect(result).toBe(expectedDate)
    })
    it('should subtract a period from a date and return it to the right format', () => {
      const initialDate = '2018-05-05'
      const expectedDate = '2018-05-03'

      const result = dateService.addPeriod(initialDate, -2, 'days')

      expect(result).toBe(expectedDate)
    })
  })

  describe('subtractPeriod', () => {
    it('should subtract a period from a date and return it to the right format', () => {
      const initialDate = '2018-05-05'
      const expectedDate = '2018-05-03'

      const result = dateService.subtractPeriod(initialDate, 2, 'days')

      expect(result).toBe(expectedDate)
    })
  })

  describe('getFirstDayOfTheMonth', () => {
    it('should return the first of the month', () => {
      const TODAY = '2018-04-25'
      const result = dateService.getFirstDayOfTheMonth(TODAY)
      const expectedResult = '2018-04-01'

      expect(result).toEqual(expectedResult)
    })
  })

  describe('getDayDatesInPeriod', () => {
    it('should return all date in a period', () => {
      const result = dateService.getDayDatesInPeriod('2018-01-01', '2018-01-03')
      const expectedResult = ['2018-01-01', '2018-01-02', '2018-01-03']

      expect(result.length).toEqual(3)
      expect(result).toEqual(expectedResult)
    })

    it('should return only one date', () => {
      const result = dateService.getDayDatesInPeriod('2018-01-01', '2018-01-01')
      const expectedResult = ['2018-01-01']

      expect(result.length).toEqual(1)
      expect(result).toEqual(expectedResult)
    })

    it('should return only one date', () => {
      try {
        dateService.getDayDatesInPeriod('2018-01-02', '2018-01-01')
      } catch (e: any) {
        expect(e.message).toEqual('getDayDatesInPeriod - end-date 2018-01-01 is before start-date 2018-01-02')
      }
    })
  })
})
