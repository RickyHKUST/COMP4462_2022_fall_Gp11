var chart;

$("#scatter").click(()=>{

    if(chart){chart.destroy()}

    chart = new Chart("chart-scatter", {
        type: 'scatter',
        // type: 'bar',
        data: {
            datasets: [{
                label: 'Scatter Plot Testing',
                data: [
                    {x: 30,y: 25},
                    {x: -10,y: 0},
                    {x: -10,y: 0},
                    {x: 0,y: 10},
                    {x: 10,y: 5},
                    {x: 0.5,y: 5.5}
                ],
                backgroundColor: $('#Color')[0].value
            }],
        },
        // data: data_bar,
        options: {
            scales: {
                x:{
                    type: 'linear',
                    position: 'bottom',
                    title:{
                        display: true,
                        text: $('#X-axis')[0].value
                    }
                },
                y: {
                    // beginAtZero: true,
                    title:{
                        display: true,
                        text: $('#Y-axis')[0].value
                    }
                }
            }
        }
    });
})

$("#boxplot").click(()=>{

    var searchBy = 'NearestBus';

    if(chart){chart.destroy()}

    $.getJSON('./assets/panel/mockData.json',(data)=>{
        const districts = Object.keys(data);
        const dataset = [];
        districts.forEach(district => {
            dataset.push(data[district][searchBy]);
        })
        boxplotData = {
            labels:districts,
            datasets:[
                {
                    label:searchBy,
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
        chart = new Chart("chart-scatter", {
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