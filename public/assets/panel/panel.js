$(".accordion").click(function(e){
    e.target.classList.toggle("active");
    e.target.nextElementSibling.classList.toggle("active");
})

var filtering_context = ''+
'<div class="context"> Select which kinds of data you would like to filter </context>'+
'<br>'+
    '<div class="box">'+
        '<input type="checkbox" class="checkbox" id="housing" value="Housing">'+
        '<label for="Housing"> Housing </label>'+
    '</div>'+
    '<div class="box">'+
        '<input type="checkbox" class="checkbox" id="transportation" value="Transportation>'+
        '<label for="Transportation"> Transportation </label>'+
    '</div>'
$('#filter').append(filtering_context);

new Chart("chart", {
    type: 'scatter',
    // type: 'bar',
    data: data_scatter,
    // data: data_bar,
    options: {
        scales: {
            x:{
                type: 'linear',
                position: 'bottom',
                title:{
                    display: true,
                    text: '# of housing estates'
                }
            },
            y: {
                // beginAtZero: true,
                title:{
                    display: true,
                    text: '# of bus stops'
                }
            }
        }
    }
});