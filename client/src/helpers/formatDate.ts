import moment from 'moment';

export function formatDate(dateString: string) {
  const date = moment.utc(dateString).local();
  return date.format('MMMM DD, YYYY [at] HH:mm:ss');
}