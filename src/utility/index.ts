import { replace } from 'lodash';
import numeral from 'numeral';


export const formatDate2 = (d: any) => {
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

export const numberToWords = (num: number) => {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const convertChunk = (number: number) => {
    if (number < 20) {
      return units[number];
    } else {
      return tens[Math.floor(number / 10)] + ' ' + units[number % 10];
    }
  };

  const convertNumber = (number: number, scale: number):any => {
    if (number === 0) {
      return '';
    } else if (number < 100) {
      return convertChunk(number);
    } else if (number < 1000) {
      return units[Math.floor(number / 100)] + ' Hundred ' + convertChunk(number % 100);
    } else {
      return convertNumber(Math.floor(number / 1000), scale + 1) + ' ' + scaleNames[scale] + ' ' + convertNumber(number % 1000, 0);
    }
  };

  const scaleNames = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
  
  if (num === 0) {
    return 'Zero';
  } else {
    return convertNumber(num, 0);
  }
};
// "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
