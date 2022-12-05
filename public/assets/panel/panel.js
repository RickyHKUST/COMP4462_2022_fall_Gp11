var optionForDistrict = [
    {value:"Hong Kong",name:"Hong Kong"},
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

var busAndMtrCheckbox = [
    {input:'<input type="checkbox" id="bus" name="selectTypesBus" value="busStop">',label:'<label for="bus">Bus Stops</label>'},
    {input:'<input type="checkbox" id="minibus" name="selectTypesBus" value="miniBusStop">',label:'<label for="minibus">Minibus Stops</label>'},
    {input:'<input type="checkbox" id="mtr" name="selectTypesMtr" value="mtr">',label:'<label for="mtr">MTR Stations</label>'},
    {input:'<input type="checkbox" id="lightRail" name="selectTypeslightRail" value="lightRail">',label:'<label for="lightRail">Light Rail Stations</label>'},
    {input:'<input type="checkbox" id="public" name="publichousing" value="publichousing">',label:'<label for="public">Public Housing</label>'},
    {input:'<input type="checkbox" id="private" name="sprivatehousing" value="publichousing">',label:'<label for="private">Private Housing</label>'}
]

var optionForPlotX = [
    {name:"(Select x-axis)","type":"none"},
    {value:"NearestBus",name:"Nearest bus stop distance","type":"quantitative"},
    {value:"NearestMinibus",name:"Nearest minibus stop distance","type":"quantitative"},
    {value:"NearestMTR",name:"Nearest MTR station distance","type":"quantitative"},
    {value:"district",name:"District","type":"qualitative"},
    {value:"MTRDistance",name:"1/2/3/4/5km to MTR","type":"qualitative"}
]

var optionForPlotY = [
    {name:"(Select y-axis)","type":"none"},
    {value:"NearestBus",name:"Nearest bus stop distance","type":"quantitative"},
    {value:"NearestMinibus",name:"Nearest minibus stop distance","type":"quantitative"},
    {value:"NearestMTR",name:"Nearest MTR station distance","type":"quantitative"},
    {value:"BuildingNumber",name:"Number of Building","type":"quantitative"},
    {value:"BuildingNumberPerKm2",name:"Number of Building per km2","type":"quantitative"}
]

var optionForPlotColor = [
    {value: "", name:"Default"},
    {value: "by_district", name:"By district"}
]

var optionForPlotDistrict = [
    {value: "", name:"Default"},
    {value: "Central and Western", name:"Central and Western"},
    {value: "Islands", name:"Islands"},
    {value: "Kwun Tong", name:"Kwun Tong"},
    {value: "Eastern", name:"Eastern"},
    {value: "Wan Chai", name:"Wan Chai"},
    {value: "Yuen Long", name:"Yuen Long"},
    {value: "Tsuen Wan", name:"Tsuen Wan"},
    {value: "Sha Tin", name:"Sha Tin"},
    {value: "Kowloon City", name:"Kowloon City"},
    {value: "Sham Shui Po", name:"Sham Shui Po"},
    {value: "Tuen Mun", name:"Tuen Mun"},
    {value: "Southern", name:"Southern"},
    {value: "Kwai Tsing", name:"Kwai Tsing"},
    {value: "Tai Po", name:"Tai Po"},
    {value: "Yau Tsim Mong", name:"Yau Tsim Mong"},
    {value: "Sai Kung", name:"Sai Kung"},
    {value: "North", name:"North"},
]

function appendScatterOption(list, jQueryObject){
    list.forEach(e => {
        jQueryObject.append($(`<li data-value="${e.value}" data-type="${e.type?e.type:''}">${e.name}</li>`));
    })
}

appendScatterOption(optionForPlotX,$('.select#x-axis > ul'));
appendScatterOption(optionForPlotY,$('.select#y-axis > ul'));
appendScatterOption(optionForPlotColor,$('.select#color > ul'));
appendScatterOption(optionForPlotDistrict,$('.select#district > ul'));
appendScatterOption(optionForDistrict,$('#place-names > ul'));

busAndMtrCheckbox.forEach(option=>{

    $('#checkbox-container')
    .append(`<div class="checkbox-item">${option.input}${option.label}</div>`)
    });
    
    
$(".accordion").click(function(e){
    e.target.classList.toggle("active");
    e.target.nextElementSibling.classList.toggle("active");
})

$('.select ul li').click((e)=>{
    $(e.target).siblings().toggle();
  }
);
