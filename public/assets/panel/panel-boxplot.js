var boxplotData;
var searchBy = 'NearestBus';

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
});

$(".modal-btn").click(()=>{
    window.myBar = new Chart("chart-boxplot", {
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
})