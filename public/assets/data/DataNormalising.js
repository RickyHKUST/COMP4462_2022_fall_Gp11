'use strict';

const fs = require('fs');
const maths = require('mathjs');
const NormalDistribution = require('normal-distribution');

function generateData(mean,sd,size){
    var array = [];
    for(var i = 0;i<size;i++){
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        array.push(parseInt(Math.abs(z0 * sd + mean)))
        // array.push(new NormalDistribution.NormalDistribution(mean, sd));
    }
    return array;
}

let data = JSON.parse(fs.readFileSync('./COMP4462_2022_fall_Gp11/public/assets/data/privatehousingnearest.json'));
let obj = {};

for(var district in data){
    obj[district] = {}
    for(var transport in data[district]){
        let res;
        var array = data[district][transport]
        var Q1 = +maths.quantileSeq(array,1/4);
        var Q3 = +maths.quantileSeq(array,3/4);
        var sd = maths.std(array)
        var mean = maths.mean(array);
        if (sd == 0) {
            mean = Math.random() * (800 - 500) + 500
            sd = Math.random() * (300 - 250) + 250
        }
        if(Q1==Q3){
            res = generateData(mean,sd,array.length);
            switch (transport) {
                case "NearestBus": obj[district]["NearestBus"] = res; break;
                case "NearestMTR": obj[district]["NearestMTR"] = res; break;
                case "NearestMinibus": obj[district]["NearestMinibus"] = res; break;
            }
        }
        else {
            switch (transport) {
                case "NearestBus": obj[district]["NearestBus"] = array; break;
                case "NearestMTR": obj[district]["NearestMTR"] = array; break;
                case "NearestMinibus": obj[district]["NearestMinibus"] = array; break;
            }
        }
    }
}
fs.writeFileSync("./COMP4462_2022_fall_Gp11/public/assets/data/mockNormalizedData.json", JSON.stringify(obj, null, " "));
