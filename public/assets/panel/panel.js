// $('#statistics').append('<p>later add graph?</p>')


$(".accordion").click(function(e){
    e.target.classList.toggle("active");
    e.target.nextElementSibling.classList.toggle("active");
    if (e.target.nextElementSibling.style.display === "block") {
        e.target.nextElementSibling.style.display = "none";
    } 
    else {
        e.target.nextElementSibling.style.display = "block";
    }
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

// var map_modal = 
// '<div class="container">'+
//     '<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal2">Graph</button>'+
//         '<div class="modal fade" id="myModal2" role="dialog">'+
//         '<div class="modal-dialog">'+
//             '<div class="modal-content">'+
//             '<div class="modal-header">'+
//                 '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
//                 '<h4 class="modal-title">Graph</h4>'+
//             '</div>'+
//             '<div class="modal-body">'+
//                 '<canvas id="chart" width="400" height="400"></canvas>'+
//             '</div>'+
//             '<div class="modal-footer">'+
//                 '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
//             '</div>'+
//             '</div>'+
//         '</div>'+
//         '</div>'+
// '</div>'

// $('#statistics').append(map_modal);
