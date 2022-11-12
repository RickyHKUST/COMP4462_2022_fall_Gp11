$('#statistics').append('<p>later add graph?</p>')


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

const ctx = 'chart';
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
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
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});