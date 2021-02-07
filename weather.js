var searchButton = $(".searchButton");

var apiKey = "26e36a8540be0a27401889bb4d6409b0";

for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);

    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}