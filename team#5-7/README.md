# Trip Assistant

Whenever we want to go for a trip, we don't want it to be spoiled by the bad weather. Suppose we plan to go on a hill station to enjoy the weekend, but all of a sudden it starts raining heavily and our whole trip gets wasted, and money too. So to plan our trips as per the weather forecast of the tourist destination, we have come up with the idea of Trip Assistant. It is a web based application which makes use of OpenWeatherMap api to get the whether forecast of a place, which allows the user to analyze the weather of the place for a particular date, and get the list of all the flights on that day, from his city to the destination searched. So, using Trip Assistant, people can enjoy their trips to the fullest without being disturbed by the unpleasant weather conditions.

### APIs -
[OpenWeatherMap](https://openweathermap.org/api/forecast30) api -

Climate forecast for 30 days - 

``` https://pro.openweathermap.org/data/2.5/forecast/climate?q={city name},{country code}&appid={API key} ```

[Travelpayouts](https://support.travelpayouts.com/hc/en-us/categories/200358578-API-documentations) api -

Autocomplete API for countries, cities and airports - 

``` http://autocomplete.travelpayouts.com/places2?term=Mos&locale=en&types[]=country&callback=function ```

How to determine the user's location by IP address - 

``` http://www.travelpayouts.com/whereami?locale=en&callback=useriata&ip=62.105.128.0 ```

[FlightAPI](https://www.flightapi.io/docs/) - 

``` https://api.flightapi.io/onewaytrip/YOURAPIKEY/LHR/LAX/2019-10-11/2/0/1/Economy/USD ```
