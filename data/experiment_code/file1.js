/*
*   Appends an array to the end of the other.
*   The first array will be modified and will contain the appended items.
*/
function append(arr1, arr2) {
    
    if (arr2 == null) {
        return arr1;
    }

    var pad = arr1.length;
    var i = -1;
    var len = arr2.length;

    while (++i < len) {
        arr1[pad + i] = arr2[i];
    }

    return arr1;
}


/*
*   Maps the items in arr and concatenates the resulting arrays.
*/
function collect(arr, callback, thisObj) {
    callback = makeIterator(callback, thisObj);
    
    var results = [];
    
    if (arr == null) {
        return results;
    }

    var i = -1;
    var len = arr.length;
    
    while (++i < len) {
        var value = callback(arr[i], i, arr);
        
        if (value != null) {
            var temp = value;
            append(results, temp);
        }
    }

    return results;
}


function makeIterator(src, thisObj){
    if (src == null) {
        return identity;
    }
    
    switch(typeof src) {
        case 'function':
            return (typeof thisObj !== 'undefined') ? function(val, i, arr){
                var res = src.call(thisObj, val, i, arr);
                return res;
            } : src;
        case 'object':
            return function(val){
                return deepMatches(val, src);
            };
        case 'string':
        case 'number':
            return prop(src);
    }
}


/*
*   Returns the first argument provided to it.
*/
function identity(val){
    return val;
}


/*
*   Returns a function that gets a property with given name from supplied object.
*/
function prop(name){
    return function(obj){
        return obj[name];
    };
}



var source_1 = [0, 1, 2, 3];

var results_1 = collect(source_1, function(val) {
    return [val, val % 2];
});

console.log(results_1); //[0, 0, 1, 1, 2, 0, 3, 1];




var source_2 = ['a', 'bb', ''];

var results_2 =  collect(source_2, function(val) {
    return val.split('');
});

console.log(results_2); // ['a', 'b', 'b']


