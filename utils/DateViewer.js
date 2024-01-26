import CONFIG from '/config';
import moment from 'moment';

export const DateViewer = (currentLanguage, date) => {
  if (date === null || date === '' || date === undefined) return false;
  let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return new Intl.DateTimeFormat(currentLanguage, { dateStyle: [CONFIG.DATE_STYLE], timeZone: timeZone }).format(moment(date + 'Z'));
};
export const DateTimeViewer = (currentLanguage, dateTime) => {
  if (dateTime === null || dateTime === '' || dateTime === undefined) return '';
  let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return new Intl.DateTimeFormat(currentLanguage, {
    dateStyle: [CONFIG.DATE_STYLE],
    timeStyle: [CONFIG.TIME_STYLE],
    hour12: false,
    timeZone: timeZone
  }).format(moment(dateTime + 'Z'));
};
