'use strict';

const fs = require('fs');
const maths = require('mathjs');
const NormalDistribution = require('normal-distribution');
function semiSort(array){
    let max = array.length;
    for(var i=parseInt(Math.random() * (max - max/10) + max/10); i<array.length; i+=parseInt(max/(Math.random() * (9.9 - 8) + 8))){
        for(var j=i+parseInt(max/(Math.random() * (25 - 10) + 10)); j<max && j>i; j--){
            let k = Math.random() * ((j-i) - 1) + 1
            if(array[j]<array[j-k]){
                let temp = array[j]
                array[j] = array[j-k]
                array[j-k] = temp
            }
        }
    }
    return array
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
let data = JSON.parse(fs.readFileSync('C:/Users/IVAN/Desktop/HKUST/2022Fall/COMP4462/COMP4462_2022_fall_Gp11/public/assets/data/privatehousingnearest.json'));
let obj = {};

for(var district in data){
    obj[district] = {}
    console.log(district);
    for(var transport in data[district]){
        console.log(transport);
        let res;
        var array = data[district][transport]
        // var Q1 = +maths.quantileSeq(array,1/4);
        // var Q3 = +maths.quantileSeq(array,3/4);
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
        let size;
        if (res.length < 1000) {
            size = parseInt(res.length * 4*2.2**(-Math.log10(res.length)));
        }
        if (res.length > 1000 && res.length < 10000) {
            size = parseInt(res.length * 4*2.2**(-Math.log10(res.length)));
        }
        if (res.length > 10000 && res.length < 100000) {
            size = parseInt(res.length * 4*2.2**(-Math.log10(res.length)));
        }
        
        switch (transport) {
            case "NearestBus":
                for (let i=0; i<size*5; i++){
                    res = semiSort(res);
                }
                console.log("after calling");
                console.log(res);
                obj[district]["NearestBus"] = res;
                break;
            case "NearestMTR": 
                for (let i=0; i<size*5; i++){
                    res = semiSort(res);
                }
                console.log("after calling");
                console.log(res);
                obj[district]["NearestMTR"] = res;
                break;
            case "NearestMinibus": 
                for (let i=0; i<size*5; i++){
                    res = semiSort(res);
                }
                console.log("after calling");
                console.log(res);
                obj[district]["NearestMinibus"] = res;
                break;
        }
    }
}
fs.writeFileSync("C:/Users/IVAN/Desktop/HKUST/2022Fall/COMP4462/COMP4462_2022_fall_Gp11/public/assets/data/mockNormalizedData.json", JSON.stringify(obj, null, " "));
