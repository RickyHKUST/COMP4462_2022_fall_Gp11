$(".accordion").click(function(e){
    e.target.classList.toggle("active");
    e.target.nextElementSibling.classList.toggle("active");
})

var optionForScatterX = [
    {value:"bus_dist",name:"Nearest bus stop distance"},
    {value:"minibus_dist",name:"Nearest minibus stop distance"},
    {value:"#bus_100",name:"Number of bus stops within 100m"},
    {value:"#minibus_100",name:"Number of minibus stops within 100m"},
]

var optionForScatterY = [
    {value:"bus_dist",name:"Nearest bus stop distance"},
    {value:"minibus_dist",name:"Nearest minibus stop distance"},
    {value:"#bus_100",name:"Number of bus stops within 100m"},
    {value:"#minibus_100",name:"Number of minibus stops within 100m"},
]

var optionForScatterColor = [
    {value: "#FF69B4", name:"Hot Pink"},
    {value: "#FF7F50", name:"Coral"},
    {value: "#EE82EE", name:"Violet"},
    {value: "#20B2AA", name:"Light Sea Green"},
    {value: "#1E90FF", name: "Dodger Blue"},
    {value: "#808080", name: "Gray"}
]

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

function appendScatterOption(list, jQueryObject){
    list.forEach(e => {
        jQueryObject.append($('<li>', {
            value: e.value,
            text: e.name
        }
        ));
    })
}

appendScatterOption(optionForScatterX,$('#x-axis > ul'));
appendScatterOption(optionForScatterY,$('#y-axis > ul'));
appendScatterOption(optionForScatterColor,$('#color > ul'));
appendScatterOption(optionForDistrict,$('#place-names > ul'));

$('.select ul li').click((e)=>{
    $(e.target).siblings().toggle();
  }
);