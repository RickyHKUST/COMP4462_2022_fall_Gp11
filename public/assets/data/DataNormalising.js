'use strict';

const fs = require('fs');
const maths = require('mathjs');
const NormalDistribution = require('normal-distribution');

function generateData(mean,sd,size){
    var array = [];
    for(var i = 0;i<size;i++){
        array.push(new NormalDistribution.NormalDistribution(mean, sd));
    }
    console.log(`mean = ${mean}, sd = ${sd}, size = ${size}`);
    console.log(array);
    return array;
}

let data = JSON.parse(fs.readFileSync('c:/Users/user/Documents/GitHub/COMP4462_2022_fall_Gp11/public/assets/data/privatehousingnearest.json'));

for(var district in data){
    for(var transport in data[district]){
        var array = data[district][transport]
        var Q1 = +maths.quantileSeq(array,1/4);
        var Q3 = +maths.quantileSeq(array,3/4);
        if(Q1==Q3){
            generateData(maths.mean(array),maths.std(array),array.length);
        }
    }
}