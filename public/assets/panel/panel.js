$('#filter').append('<p>Filter</p>')

function render(){

}

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

var optionForBusCheckbox = [
    {input:'<input type="checkbox" id="bus" name="selectTypes" value="busStop">',label:'<label for="bus">Bus Stops</label>'},
    {input:'<input type="checkbox" id="minibus" name="selectTypes" value="miniBusStop">',label:'<label for="minibus">Minibus Stops</label>'}
]

optionForBusCheckbox.forEach(option=>{

    $('#checkboxForbus')
    .append(option.input)
    .append(option.label)
    .append('<br>');
    });
    