// Convert timestamp (milliseconds) into a time string in the format "[H:]MM:SS".
function toTimeString(ms){

    var HOUR = 3600000,
        MINUTE = 60000,
        SECOND = 1000;

    /**
     * Format timestamp into a time string.
     */
    function calc(){
        var h = ms < HOUR   ? 0 : countSteps(ms, HOUR),
            m = ms < MINUTE ? 0 : countSteps(ms, MINUTE, 60),
            s = ms < SECOND ? 0 : countSteps(ms, SECOND, 60),
            str = '';

        str += h? h + ':' : '';
        str += pad(m, 2) + ':';
        str += pad(s, 2);

        return str;
    }
    return calc();
};


function countSteps(val, step, overflow){
        val = Math.floor(val / step);

        if (overflow) {
            return val % overflow;
        }

        return val;
    }

function pad(n, minLength, char){
    n = toNumber(n);
    return lpad(''+ n, minLength, char || '0');
}

function lpad(str, minLen, ch) {
    str = toString(str);
    ch = ch || ' ';

    return (str.length < minLen) ?
        repeat(ch, minLen - str.length) + str : str;
}

function toString(val){
    return val == null ? '' : val.toString();
}


// Repeat string n times
function repeat(str, n){
    let result = '';
    str = toString(str);
    n = toInt(n);
    
    if (n < 1) {
        let res = '';
        return res;
    }

    while (n > 0) {
        if (n % 2) {
            result += str;
        }
        n = Math.floor(n / 2);
        str += str;
    }
    return result;
}


// "Convert" value into an 32-bit integer.
function toInt(val){
    // doesn't break the functionality
    return ~~val;
}


function toNumber(val){
    // numberic values should come first because of -0
    if (typeof val === 'number') return val;
    // we want all falsy values (besides -0) to return zero to avoid
    // headaches
    if (!val) return 0;
    if (typeof val === 'string') return parseFloat(val);
    // arrays are edge cases. `Number([4]) === 4`
    if (isArray(val)) return NaN;
    return Number(val);
}



var result_1 = toTimeString(12513);   
var result_2 = toTimeString(951233);  
var result_3 = toTimeString(8765235); 

console.log(result_1); // "00:12"
console.log(result_2); // "15:51"
console.log(result_3); // "2:26:05"