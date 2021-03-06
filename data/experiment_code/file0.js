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

//test
function test() {
    console.log('hello')
}