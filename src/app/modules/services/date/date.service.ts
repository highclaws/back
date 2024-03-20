import * as dayjs from 'dayjs';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';
const DATE_TIME_FORMAT = `${DATE_FORMAT}T${TIME_FORMAT}.SSS[Z]`;
const MARKETING_DAYS_TO_SUBTRACT = 7;
const FRENCH_DATE_FORMAT = 'DD/MM/YYYY';

class DateService {
  public getDate(initialDate: string, format: string = DATE_FORMAT): string {
    return dayjs(initialDate).format(format);
  }

  public yesterdayDB(): string {
    return dayjs().add(-1, 'day').format('YYYY-MM-DD');
  }

  public yesterdayORACLE(): string {
    return dayjs().add(-1, 'day').format(FRENCH_DATE_FORMAT);
  }
  public todayORACLE(): string {
    return dayjs().format(FRENCH_DATE_FORMAT);
  }

  public getDateISOString(initialDate: string): string {
    return dayjs(this.getDate(initialDate)).format(DATE_TIME_FORMAT);
  }

  public getTimeISOString() {
    return dayjs().toISOString();
  }

  public today(format: string = DATE_FORMAT): string {
    return dayjs().format(format);
  }

  public now(format: string = TIME_FORMAT): string {
    return dayjs().format(format);
  }

  public addPeriod(
    date: string,
    amount: number,
    unit?: dayjs.ManipulateType,
    format: string = DATE_FORMAT,
  ): string {
    return dayjs(date).add(amount, unit).format(format);
  }

  public subtractPeriod(
    date: string,
    amount: number,
    unit?: dayjs.ManipulateType,
    format: string = DATE_FORMAT,
  ): string {
    return dayjs(date).subtract(amount, unit).format(format);
  }

  public getFirstDayOfTheMonth(
    date: string,
    format: string = DATE_FORMAT,
  ): string {
    return dayjs(date).startOf('month').format(format);
  }

  public getDayDatesInPeriod(
    startDate: string,
    endDate: string,
    format: string = DATE_FORMAT,
  ): string[] {
    if (dayjs(endDate).isBefore(dayjs(startDate))) {
      throw new Error(
        `getDayDatesInPeriod - end-date ${endDate} is before start-date ${startDate}`,
      );
    }

    let dayToPush = dayjs(startDate).format(format);
    const dayDates = [];
    do {
      dayDates.push(dayToPush);
      dayToPush = dayjs(dayToPush).add(1, 'd').format(format);
    } while (
      dayjs(dayToPush).isBefore(dayjs(endDate)) ||
      dayToPush === endDate
    );

    return dayDates;
  }

  public getDispatchDate(): string {
    return dayjs().format(DATE_TIME_FORMAT);
  }

  public isAfter(date1: string, date2: string): boolean {
    return dayjs(date1).startOf('day').isAfter(dayjs(date2).startOf('day'));
  }

  public isBefore(date1: string, date2: string): boolean {
    return dayjs(date1).startOf('day').isBefore(dayjs(date2).startOf('day'));
  }

  public isSameOrBefore(date1: string, date2: string): boolean {
    return dayjs(date1)
      .startOf('day')
      .isSameOrBefore(dayjs(date2).startOf('day'));
  }

  public isSameOrAfter(date1: string, date2: string): boolean {
    return dayjs(date1)
      .startOf('day')
      .isSameOrAfter(dayjs(date2).startOf('day'));
  }

  public isDateISOString(date: string): boolean {
    return dayjs(date, DATE_TIME_FORMAT, true).isValid();
  }
}

export {
  DateService,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
  MARKETING_DAYS_TO_SUBTRACT,
  FRENCH_DATE_FORMAT,
};
