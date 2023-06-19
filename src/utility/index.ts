import { replace } from 'lodash';
import numeral from 'numeral';


export const formatDate2 = (d: string | number | Date) => {
    try {
        const date = d instanceof Date ? d : new Date(d);
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const date_ = date.getDate();
        const year = date.getFullYear();
        const month = monthNames[date.getMonth()];
        return `${month} ${date_}, ${year}`;
    } catch (e) {
        return "";
    }
};


export const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  

// ----------------------------------------------------------------------

export function fCurrency(number: unknown) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number: any) {
  return numeral(number).format();
}

export function fShortenNumber(number: any) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number: any) {
  return numeral(number).format('0.0 b');
}
