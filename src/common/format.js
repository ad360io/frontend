export const  formatNumberAbbr = (number, decPlaces, customize = false) => {
    // if(customize) {
    //
    //     if(number > Math.pow(10, 12)) {
    //         return (number / Math.pow(10, 6)).toFixed(1).replace(/\.0$/, '') + 'b';
    //     }
    //
    //     if(number > Math.pow(10, 6)) {
    //         return (number / Math.pow(10, 6)).toFixed(1).replace(/\.0$/, '') + 'm';
    //     }
    //
    //     return formatNumber(number, 0);
    // }

    decPlaces = Math.pow(10, decPlaces);

    // let abbrev = ["k", "m", "b", "t"];
    let abbrev = ["k", "m"];

    for (let i = abbrev.length - 1; i >= 0; i--) {

        let size = Math.pow(10, (i + 1) * 3);

        if (size <= number) {
            number = Math.round(number * decPlaces / size) / decPlaces;

            if((number == 1000) && (i < abbrev.length - 1)) {
                number = 1;
                i++;
            }

            number += abbrev[i];
            break;
        }
    }

    return number;
}
