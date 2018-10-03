/*
*   Appends an array to the end of the other.
*   The first array will be modified and will contain the appended items.
*/
function affix(arr1, arr2) {
    
    if (arr2 == null) {
        return arr1;
    }

    let pad = arr1.length;
    let i = -1;
    let length = arr2.length;

    while (++i < length) {
        arr1[pad + i] = arr2[i];
    }

    return arr1;
}


/*
*   Maps the items in arr and concatenates the resulting arrays.
*/
function gather(arr, callback, thisObj) {
    callback = makeRepeatable(callback, thisObj);
    
    let results = [];
    
    if (arr == null) {
        return results;
    }

    let i = -1;
    let len = arr.length;
    
    while (++i < len) {
        let val = callback(arr[i], i, arr);
        
        if (val != null) {
            let temp_value = val;
            affix(results, temp);
        }
    }

    return results;
}


function makeRepeatable(src, thisObj){
    if (src == null) {
        return identity;
    }
    
    switch(typeof src) {
        case 'function':
            return (typeof thisObj !== 'undefined') ? function(val, i, arr){
                let result = src.call(thisObj, val, i, arr);
                return result;
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



let source_1 = [0, 1, 2, 3];

let results_1 = gather(source_1, function(val) {
    return [val, val % 2];
});

console.log(results_1); //[0, 0, 1, 1, 2, 0, 3, 1];




let source_2 = ['a', 'bb', ''];

let results_2 =  gather(source_2, function(val) {
    return val.split('');
});

console.log(results_2); // ['a', 'b', 'b']


