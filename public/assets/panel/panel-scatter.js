var optionForScatterX = [
    {value:"Private Housing",name:"Private Housing"},
    {value:"Public Housing",name:"Public Housing"},
    {value:"Bus Stops",name:"Bus Stops"},
    {value:"MTR",name:"MTR"},
]

optionForScatterX.forEach(X => {
    $('#X-axis').append($('<option>', {
        value: X.value,
        text: X.name
    }));
})

var optionForScatterY = [
    {value:"Private Housing",name:"Private Housing"},
    {value:"Public Housing",name:"Public Housing"},
    {value:"Bus Stops",name:"Bus Stops"},
    {value:"MTR",name:"MTR"},
]

optionForScatterY.forEach(Y => {
    $('#Y-axis').append($('<option>', {
        value: Y.value,
        text: Y.name
    }));
})

var optionForScatterColor = [
    {value: "#FF69B4", name:"Hot Pink"},
    {value: "#FF7F50", name:"Coral"},
    {value: "#EE82EE", name:"Violet"},
    {value: "#20B2AA", name:"Light Sea Green"},
    {value: "#1E90FF", name: "Dodger Blue"},
    {value: "#808080", name: "Gray"}
]

optionForScatterColor.forEach(Color => {
    $('#Color').append($('<option>', {
        value: Color.value,
        text: Color.name
    }));
})

var chart;

$(".modal-btn").click(e=>{

    if(chart){chart.destroy()}

    chart = new Chart("chart", {
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