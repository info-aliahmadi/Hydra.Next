import CONFIG from '@root/config';
import moment from 'moment';

type DateStyle = "short" | "full" | "long" | "medium";

export const DateViewer = (currentLanguage : string, date?: Date | number) => {
  if (date === null || date === undefined) return false;
  let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let dateStype = CONFIG.DATE_STYLE as DateStyle;
  return new Intl.DateTimeFormat(currentLanguage, { dateStyle: dateStype, timeZone: timeZone }).format(moment(date + 'Z').toDate());
};
export const DateTimeViewer = (currentLanguage : string, dateTime : string) => {
  if (dateTime === null || dateTime === '' || dateTime === undefined) return '';
  let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let dateStype = CONFIG.DATE_STYLE as DateStyle;
  let timeStyle = CONFIG.TIME_STYLE as DateStyle;
  return new Intl.DateTimeFormat(currentLanguage, {
    dateStyle: dateStype,
    timeStyle: timeStyle,
    hour12: false,
    timeZone: timeZone
  }).format(moment(dateTime + 'Z').toDate());
};
