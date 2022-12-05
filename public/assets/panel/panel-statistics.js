var chart;
var xElement;
var yElement;
var colorElement;

$(".modal-btn").click(()=>{
    if(chart){chart.destroy()}
    xElement = $(".select[name='x-axis'] ul li:visible")[0];
    yElement = $(".select[name='y-axis'] ul li:visible")[0];
    colorElement = $(".select[name='color'] ul li:visible")[0];
    districtElement = $(".select[name='district'] ul li:visible")[0];
})

$("#barChart").click(()=>{

    if(chart){chart.destroy()};

    yLabel = yElement.getAttribute('data-value');
    districtLabel = districtElement.getAttribute('data-value');
    
    $.getJSON('./assets/panel/data/buildingAroundMTR.json',(json)=>{

        labels = [];
        data = [];
        for(var i = 1;i<=5;i++){
            if(districtLabel==''){
                labels.push(`${i}km around the MTR station in Hong Kong`);
            }
            else{
                labels.push(`${i}km around the MTR station in ${districtLabel} district`);
            }
        }
        for(var km in json){
            var sum = 0;
            var iteration = km.match(/\d/g).join("");
            for(var district in json[km]){
                if(districtLabel=='' || districtLabel == district){
                    for(var station in json[km][district]){
                        sum += json[km][district][station]['BuildingNumber']
                    }
                }
            }
            switch(yLabel){
                case "BuildingNumber": data.push(sum);break;
                case "BuildingNumberPerKm2": data.push(sum/(iteration*iteration));break;
            }
        }

        barData = {
            labels: labels,
            datasets: [{
                label: yElement.innerHTML,
                data: data,
                borderWidth: 1
            }]
        }
    
        chart = new Chart("statistics-modal-chart", {
            type: 'bar',
            data: barData,
            options: {
                scales: {
                    x:{
                        title:{
                            display: true,
                            text: xElement.innerHTML
                        }
                    },
                    y: {
                        title:{
                            display: true,
                            text: yElement.innerHTML
                        }
                    }
                }
            }
        });
    })
})

$("#scatter").click(()=>{

    if(chart){chart.destroy()};

    xLabel = xElement.getAttribute('data-value');
    yLabel = yElement.getAttribute('data-value');
    districtLabel = districtElement.getAttribute('data-value');

    $.getJSON('./assets/panel/data/nearestTransportation.json',(json)=>{

        scatterData = [];

        for(var district in json){
            if(districtLabel=="" || districtLabel==district){        
                data = [];
                for(var i = 0; i<json[district][xLabel].length && i<json[district][yLabel].length; i++){
                    data.push({x:json[district][xLabel][i],y:json[district][yLabel][i]});
                }
                scatterData.push(
                    {
                        label: district,
                        data: data,
                        backgroundColor: $('#color')[0].value
                    }
                )
            }
        }
        
        chart = new Chart("statistics-modal-chart", {
            type: 'scatter',
            data: {
                datasets: scatterData,
            },
            options: {
                scales: {
                    x:{
                        type: 'linear',
                        position: 'bottom',
                        title:{
                            display: true,
                            text: xElement.innerHTML
                        }
                    },
                    y: {
                        title:{
                            display: true,
                            text: yElement.innerHTML
                        }
                    }
                }
            }
        });
    })
})

$("#boxplot").click(()=>{

    if(chart){chart.destroy()}

    yLabel = yElement.getAttribute('data-value');

    $.getJSON('./assets/panel/data/nearestTransportation.json',(data)=>{
        const dataset = [];
        const districts = [];
        for(var district in data){
            if(districtElement.getAttribute('data-value')=="" || districtElement.getAttribute('data-value')==district){
                dataset.push(data[district][yLabel]);
                districts.push(district);
                console.log(districtElement.getAttribute('data-value'));
                console.log(district);
            }
        }
        console.log(dataset);
        boxplotData = {
            labels:districts,
            datasets:[
                {
                    label:yElement.innerHTML,
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    borderColor: 'red',
                    borderWidth: 1,
                    outlierColor: '#999999',
                    padding: 10,
                    itemRadius: 0,
                    data: dataset
                }
            ]
        }
        chart = new Chart("statistics-modal-chart", {
            type: 'boxplot',
            data: boxplotData,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Box Plot Chart'
                }
            }
        });
    });
})