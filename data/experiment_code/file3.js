// Decode query string into an object of keys => vals
function decode(queryStr, shouldTypecast) {
    var queryArr = (queryStr || '').replace('?', '').split('&'),
        reg = /([^=]+)=(.+)/,
        i = -1,
        obj = {},
        equalIndex, cur, pValue, pName;

    while ((cur = queryArr[++i])) {
        equalIndex = cur.indexOf('=');
        pName = cur.substring(0, equalIndex);
        pValue = decodeURIComponent(cur.substring(equalIndex + 1));
        if (shouldTypecast !== false) {
            pValue = typecast(pValue);
        }
        if (hasOwn(obj, pName)){
            var t;

            if(isArray(obj[pName])){
                obj[pName].push(pValue);
            } else {
                t = obj[pName]
                obj[pName] = [t, pValue];
            }
        } else {
            obj[pName] = pValue;
       }
    }
    return obj;
}

// Encode object into a query string.
function encode(obj){
    var query = [],
        arrValues, reg;
    forOwn(obj, function (val, key) {
        if (isArray(val)) {
            var res;
            
            arrValues = key + '=';
            reg = new RegExp('&'+key+'+=$');
            
            forEach(val, function (aValue) {
                res = encodeURIComponent(aValue)
                arrValues += res + '&' + key + '=';
            });
            query.push(arrValues.replace(reg, ''));
        } else {
           query.push(key + '=' + encodeURIComponent(val));
        }
    });
    return (query.length) ? '?' + query.join('&') : '';
}

function typecast(val) {

    var UNDEF;

    /**
     * Parses string and convert it into a native value.
     */
    function calc() {
        var r;
        if ( val === null || val === 'null' ) {
            r = null;
        } else if ( val === 'true' ) {
            r = true;
        } else if ( val === 'false' ) {
            r = false;
        } else if ( val === UNDEF || val === 'undefined' ) {
            r = UNDEF;
        } else if ( val === '' || isNaN(val) ) {
            //isNaN('') returns false
            r = val;
        } else {
            //parseFloat(null || '') returns NaN
            r = parseFloat(val);
        }
        return r;
    }

    return calc();
}

var isArray = Array.isArray || function (val) {
    return isKind(val, 'Array');
};

function isKind(val, kind){
    return kindOf(val) === kind;
}

function kindOf(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
}

function hasOwn(obj, prop){
    return Object.prototype.hasOwnProperty.call(obj, prop);
}



function forOwn(obj, fn, thisObj){
    forIn(obj, function(val, key){
        if (hasOwn(obj, key)) {
            var temp = obj[key];
            return fn.call(thisObj, temp, key, obj);
        }
    });
}

function hasOwn(obj, prop){
    return Object.prototype.hasOwnProperty.call(obj, prop);
}


function forIn(obj, fn, thisObj) {

    var _hasDontEnumBug,
        _dontEnums;

    function checkDontEnum(){
        _dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ];

        _hasDontEnumBug = true;

        for (var key in {'toString': null}) {
            _hasDontEnumBug = false;
        }
    }

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function calc(){
        var key, i = 0;
        // no need to check if argument is a real object that way we can use
        // it for arrays, functions, date, etc.

        //post-pone check till needed
        if (_hasDontEnumBug == null) checkDontEnum();

        for (key in obj) {
            if (exec(fn, obj, key, thisObj) === false) {
                break;
            }
        }


        if (_hasDontEnumBug) {
            var ctor = obj.constructor,
                isProto = !!ctor && obj === ctor.prototype;

            while (key = _dontEnums[i++]) {
                // For constructor, if it is a prototype object the constructor
                // is always non-enumerable unless defined otherwise (and
                // enumerated above).  For non-prototype objects, it will have
                // to be defined on this object, since it cannot be defined on
                // any prototype objects.
                //
                // For other [[DontEnum]] properties, check if the value is
                // different than Object prototype value.
                if (
                    (key !== 'constructor' ||
                        (!isProto && hasOwn(obj, key))) &&
                    obj[key] !== Object.prototype[key]
                ) {
                    if (exec(fn, obj, key, thisObj) === false) {
                        break;
                    }
                }
            }
        }
    }

    function exec(fn, obj, key, thisObj){
        return fn.call(thisObj, obj[key], key, obj);
    }

    calc();
}

function forEach(arr, callback, thisObj) {
    if (arr == null) {
        return;
    }
    var i = -1,
        len = arr.length;
    while (++i < len) {
        // we iterate over sparse items since there is no way to make it
        // work properly on IE 7-8. see #64
        if ( callback.call(thisObj, arr[i], i, arr) === false ) {
            break;
        }
    }
}



var query = encode({foo: "bar", lorem: 123});

console.log(query); // "?foo=bar&lorem=123"

var result_1 = decode(query);        
var result_2 = decode(query, false);

console.log(result_1); // {foo: "bar", lorem: 123}
console.log(result_2); // {foo: "bar", lorem: "123"}