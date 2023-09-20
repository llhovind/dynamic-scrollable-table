
export function InitialCaps(txt) {

    if (typeof txt === 'string') {

        let initial = txt[0];

        return initial.toLocaleUpperCase() + txt.substring(1);
    }

    return undefined

}

export function fixedNum(value, precision = 2) {

    if (typeof value === "number") {
        return value.toFixed(precision);
    }
    return "--";
}
