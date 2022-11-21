var chart;

$(".modal-btn").click(()=>{

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
                backgroundColor: $('#color')[0].value
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
                        text: $('#x-axis')[0].value
                    }
                },
                y: {
                    // beginAtZero: true,
                    title:{
                        display: true,
                        text: $('#y-axis')[0].value
                    }
                }
            }
        }
    });
})