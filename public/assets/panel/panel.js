$('#statistics').append('<p>later add graph?</p>')


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

/*
terms:
refactor - optimization

TO DO:
Accordions Styling
According lab6, show some statistics under the 'div#statistics'
    mock some data
    - scatter plot
    - histogram
Study the refactored code
*/