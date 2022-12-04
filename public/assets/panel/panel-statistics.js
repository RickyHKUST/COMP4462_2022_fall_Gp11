var chart;
var xElement;
var yElement;
var colorElement;

$(".modal-btn").click(()=>{
    if(chart){chart.destroy()}
    xElement = $("[name='x-axis'] ul li:visible")[0];
    yElement = $("[name='y-axis'] ul li:visible")[0];
    colorElement = $("[name='color'] ul li:visible")[0];
})

$("#barChart").click(()=>{

    if(chart){chart.destroy()}

    data_bar = {
        labels: ['Mong Kok', 'Central', 'Wan Chai', 'Sha Tin', 'Admiralty', 'Sai Ying Pun'],
        datasets: [{
            label: '# of Housing Estates',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }

    chart = new Chart("statistics-modal-chart", {
        type: 'bar',
        data: data_bar,
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

$("#scatter").click(()=>{

    if(chart){chart.destroy()};

    xLabel = xElement.getAttribute('data-value');
    yLabel = yElement.getAttribute('data-value');

    scatterData = [];

    $.getJSON('./assets/panel/data/nearestTransportation.json',(json)=>{
        for(var district in json){
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

    var searchBy = yElement.getAttribute('data-value');

    if(chart){chart.destroy()}

    $.getJSON('./assets/panel/data/nearestTransportation.json',(data)=>{
        const dataset = [];
        const districts = [];
        for(var district in data){
            dataset.push(data[district][searchBy]);
            districts.push(district);
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