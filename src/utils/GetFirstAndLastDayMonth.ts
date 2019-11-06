import moment from 'moment';

export default (month: number, year: number) => {
    const startOfMonth = moment([year, month - 1]).toDate();
    const endOfMonth = moment(startOfMonth).endOf('month').toDate();
    return {
        startOfMonth,
        endOfMonth
    }
}