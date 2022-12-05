'use strict';

const fs = require('fs');
const maths = require('mathjs');
function semiSort(array){
    let max = array.length;
    for(var offset = 0;offset<3;offset++){
        for(var i = 0;i<max/2;i++){
            if(array[i]>array[max-i-offset]){
                let temp = array[max-i-offset];
                array[max-i-offset] = array[i];
                array[i] = temp;
            }
        }
    }
    return array;
}

function generateData(mean,sd,size){
    var array = [];
    for(var i = 0;i<size;i++){
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        array.push(parseInt(Math.abs(z0 * sd + mean)))
    }
    return array;
}
let data = JSON.parse(fs.readFileSync('C:/Users/RickyL/Documents/GitHub/COMP4462_2022_fall_Gp11/public/assets/data/privatehousingnearest.json'));
let obj = {};

for(var district in data){
    obj[district] = {}
    console.log(district);
    for(var transport in data[district]){
        console.log(transport);
        let res;
        var array = data[district][transport]
        var sd = maths.std(array)
        var mean = maths.mean(array);
        if (mean > 3000) {
            mean = Math.random() * (1500 - 800) + 800
            sd = Math.random() * (500 - 250) + 250
        }
        if (sd < 1 || mean < sd || mean < 170 || mean > sd * 5) {
            mean = Math.random() * (800 - 300) + 300
            sd = Math.random() * (300 - 250) + 250
        }
        res = generateData(mean,sd,array.length);
        res = semiSort(res);
        obj[district][transport] = res;

    }
}
fs.writeFileSync("C:/Users/RickyL/Documents/GitHub/COMP4462_2022_fall_Gp11/public/assets/data/mockNormalizedData.json", JSON.stringify(obj, null, " "));
