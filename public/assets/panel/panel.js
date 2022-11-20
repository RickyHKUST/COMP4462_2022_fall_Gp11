$(".accordion").click(function(e){
    e.target.classList.toggle("active");
    e.target.nextElementSibling.classList.toggle("active");
})

var optionForScatterX = [
    {value:"Private Housing",name:"Private Housing"},
    {value:"Public Housing",name:"Public Housing"},
    {value:"Bus Stops",name:"Bus Stops"},
    {value:"MTR",name:"MTR"},
]

var optionForScatterY = [
    {value:"Private Housing",name:"Private Housing"},
    {value:"Public Housing",name:"Public Housing"},
    {value:"Bus Stops",name:"Bus Stops"},
    {value:"MTR",name:"MTR"},
]

var optionForScatterColor = [
    {value: "#FF69B4", name:"Hot Pink"},
    {value: "#FF7F50", name:"Coral"},
    {value: "#EE82EE", name:"Violet"},
    {value: "#20B2AA", name:"Light Sea Green"},
    {value: "#1E90FF", name: "Dodger Blue"},
    {value: "#808080", name: "Gray"}
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

appendScatterOption(optionForScatterX,$('#X-axis > ul'));
appendScatterOption(optionForScatterY,$('#Y-axis > ul'));
appendScatterOption(optionForScatterColor,$('#Color > ul'));

$('.select ul li').click((e)=>{
    $(e.target).siblings().toggle();
  }
);