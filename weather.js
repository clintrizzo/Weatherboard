var searchButton = $(".searchButton");

var apiKey = "26e36a8540be0a27401889bb4d6409b0";

for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);

    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<p>" + city + "</p>");
}
//for the cities to append to the searched card//
var keyCount = 1;

searchButton.click(function() {

    var searchInput = $(".searchInput").val();


    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";


    if (searchInput === "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function(response) {
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<p>" + response.name + "</p>");
            //for cities to be appeneded and called

            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;
            //current weather appended items
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);

            var time = new Date(response.dt * 1000);
            currentName.append(response.name + " " + time.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

            var currentTemp = currentName.append("<p>");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
        });
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function(response) {
            var day = [0, 8, 16, 24, 32];
            var fiveDayWeather = $(".fiveDay").addClass("card-body");
            var fiveDayDiv = $(".fiveDay").addClass("card-text");
            fiveDayDiv.empty();
            day.forEach(function(i) {
                var FiveDayTime = new Date(response.list[i].dt * 1000);
                FiveDayTime = FiveDayTime.toLocaleDateString("en-US");
                //code for the five day weather cards
                fiveDayDiv.append("<div class=fiveDayWeather>" + "<p>" + FiveDayTime + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "<hr>" + "</div>");
            })
        });
    }
});