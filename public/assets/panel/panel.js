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
Two Accordions
    - One for filtering
    - One for statistics
    - Hints: search bootstrap
Details in Filter
    - Transportation
    - Housing
Good styling of the whole panel
Accordions Styling
According lab6, show some statistics under the 'div#statistics'
    mock some data
    - scatter plot
    - histogram
Study the refactored code
*/


//zoom in after selected
var optionForDistrict = [
    {value:"Hong Kong Islands",name:"Islands"},
    {value:"Hong Kong Kwai Tsing",name:"Kwai Tsing"},
    {value:"Hong Kong North",name:"North"},
    {value:"Hong Kong Sai Kung",name:"Sai Kung"},
    {value:"Hong Kong Sha Tin",name:"Sha Tin"},
    {value:"Hong Kong Tai Po",name:"Tai Po"},
    {value:"Hong Kong Tsuen Wan",name:"Tsuen Wan"},
    {value:"Hong Kong Tuen Mun",name:"Tuen Mun"},
    {value:"Hong Kong Yuen Long",name:"Yuen Long"},
    {value:"Hong Kong Kowloon City",name:"Kowloon City"},
    {value:"Hong Kong Kwun Tong",name:"Kwun Tong"},
    {value:"Hong Kong Sham Shui Po",name:"Sham Shui Po"},
    {value:"Hong Kong Wong Tai Sin",name:"Wong Tai Sin"},
    {value:"Hong Kong Yau Tsim Mong",name:"Yau Tsim Mong"},
    {value:"Hong Kong Central and Western",name:"Central and Western"},
    {value:"Hong Kong Eastern",name:"Eastern"},
    {value:"Hong Kong Southern",name:"Southern"},
    {value:"Hong Kong Wan Chai",name:"Wan Chai"},
]

optionForDistrict.forEach(district => {
    $('#place-names').append($('<option>', {
        value: district.value,
        text: district.name
    }));
})

