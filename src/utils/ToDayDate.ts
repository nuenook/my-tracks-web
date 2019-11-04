import moment from 'moment';

const ToDayDate = (date: any) => {

    return moment(date).format('MM-DD-YYYY')
}

export default ToDayDate