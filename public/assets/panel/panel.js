$('#statistics').append('<p>later add graph?</p>')

// $('#filter').click(function(){
//     renderFilter()
// })

// function renderFilter(){
    // $('#filter').empty();
    var filtering_context = ''+
    // '<div class="title"> Filter </div>'+
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
// }


/*
terms:
refactor - optimization

TO DO:
Two Accordions
    - One for filtering
    - One for statistics
    - Hints: search bootstrap
Details in Filter
    - Transportation
    - Hosuing
Good styling of the whole panel
*/