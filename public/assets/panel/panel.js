$(".accordion").click(function(e){
    e.target.classList.toggle("active");
    e.target.nextElementSibling.classList.toggle("active");
})