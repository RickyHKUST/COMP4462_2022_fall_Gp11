var panelChart;
var colorElement;

$(".modal-btn").click(()=>{

    if(panelChart){panelChart.destroy()}

    xLabel = $(".select[name='x-axis'] ul li:visible")[0].getAttribute('data-value');
    xType = $(".select[name='x-axis'] ul li:visible")[0].getAttribute('data-type');
    xText = $(".select[name='x-axis'] ul li:visible")[0].innerHTML;

    yLabel =  $(".select[name='y-axis'] ul li:visible")[0].getAttribute('data-value');
    yType =  $(".select[name='y-axis'] ul li:visible")[0].getAttribute('data-type');
    yText =  $(".select[name='y-axis'] ul li:visible")[0].innerHTML;

    districtLabel = $(".select[name='district'] ul li:visible")[0].getAttribute('data-value');

    colorElement = $(".select[name='color'] ul li:visible")[0];

    $(".plotOption").removeClass("d-none");

    if(xType=="quantitative"){
        $(".plotOption > #barChart").parent().addClass("d-none");
        $(".plotOption > #boxplot").parent().addClass("d-none");
    }
    if(xType=="qualitative"){
        $(".plotOption > #scatter").parent().addClass("d-none");
    }
    if(yLabel=="BuildingNumber" || yLabel=="BuildingNumberPerKm2"){
        $(".plotOption > #scatter").parent().addClass("d-none");
        $(".plotOption > #boxplot").parent().addClass("d-none");
    }
    if(yLabel!="BuildingNumber" && yLabel!="BuildingNumberPerKm2"){
        $(".plotOption > #barChart").parent().addClass("d-none");
    }
})

$("#barChart").click(()=>{

    if(panelChart){panelChart.destroy()};
    
    $.getJSON('./assets/panel/data/buildingAroundMTR.json',(json)=>{

        labels = [];
        barData = [];
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
    
        panelChart = new Chart("statistics-modal-chart", {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: yText,
                    data: barData,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x:{
                        title:{
                            display: true,
                            text: xText
                        }
                    },
                    y: {
                        title:{
                            display: true,
                            text: yText
                        }
                    }
                }
            }
        });
    })
})

$("#scatter").click(()=>{

    if(panelChart){panelChart.destroy()};

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
        
        panelChart = new Chart("statistics-modal-chart", {
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
                            text: xText
                        }
                    },
                    y: {
                        title:{
                            display: true,
                            text: yText
                        }
                    }
                }
            }
        });
    })
})

$("#boxplot").click(()=>{

    if(panelChart){panelChart.destroy()}

    $.getJSON('./assets/panel/data/nearestTransportation.json',(data)=>{
        const dataset = [];
        const districts = [];
        for(var district in data){
            if(districtLabel=="" || districtLabel==district){
                dataset.push(data[district][yLabel]);
                districts.push(district);
            }
        }
        boxplotData = {
            labels:districts,
            datasets:[
                {
                    label:yText,
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
        panelChart = new Chart("statistics-modal-chart", {
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