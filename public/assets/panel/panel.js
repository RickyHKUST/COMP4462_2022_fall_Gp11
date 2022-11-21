$('#filter').append('<p>Filter</p>')

function render(){

}

//zoom in after selected
var optionForDistrict = [
    {value:"Hong Kong Tung Chung Station",name:"Islands"},
    {value:"Hong Kong Kwai Tsing",name:"Kwai Tsing"},
    {value:"Hong Kong Sheung Shui",name:"North"},
    {value:"Hong Kong Sai Kung",name:"Sai Kung"},
    {value:"Hong Kong Sha Tin",name:"Sha Tin"},
    {value:"Hong Kong Tai Po",name:"Tai Po"},
    {value:"Hong Kong Tsuen Wan",name:"Tsuen Wan"},
    {value:"Hong Kong Tuen Mun",name:"Tuen Mun"},
    {value:"Hong Kong Yuen Long",name:"Yuen Long"},
    {value:"Hong Kong Kowloon City",name:"Kowloon City"},
    {value:"Hong Kong Kwun Tong",name:"Kwun Tong"},
    {value:"Hong Kong Sham Shui Po",name:"Sham Shui Po"},
    {value:"Hong Kong Wong Tai Sin station",name:"Wong Tai Sin"},
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

var busAndMtrCheckbox = [
    {input:'<input type="checkbox" id="bus" name="selectTypesBus" value="busStop">',label:'<label for="bus">Bus Stops</label>'},
    {input:'<input type="checkbox" id="minibus" name="selectTypesBus" value="miniBusStop">',label:'<label for="minibus">Minibus Stops</label>'},
    {input:'<input type="checkbox" id="mtr" name="selectTypesMtr" value="mtr">',label:'<label for="mtr">MTR Stations</label>'},
    {input:'<input type="checkbox" id="lightRail" name="selectTypeslightRail" value="lightRail">',label:'<label for="lightRail">Light Rail Stations</label>'},
    {input:'<input type="checkbox" id="public" name="publichousing" value="publichousing">',label:'<label for="public">Public Housing</label>'},
    {input:'<input type="checkbox" id="private" name="sprivatehousing" value="publichousing">',label:'<label for="private">Private Housing</label>'}
]

busAndMtrCheckbox.forEach(option=>{

    $('#checkboxForbus')
    .append(option.input)
    .append(option.label)
    .append('<br>');
    });
    
    
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
