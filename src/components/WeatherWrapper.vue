<template>
  <div class="app-wrapper">
    <div class="search-wrapper">
      <div class="app-title">Simple Weather</div>
      <i class="fas fa-search"></i>
    </div>
    <WeatherTab @tab-click="tabClickHandler" />
    <div class="next-hours-wrapper">
      <div class="weather-next-title">Next hours</div>
      <div class="next-hour-card-wrapper">
        <div v-for="hour in hourly_array" :key="hour.hour">
          <HourCard :hourForecast="hour" />
        </div>
      </div>
    </div>
    <div class="next-days-wrapper">
      <div class="weather-next-title">Next 5 days</div>
      <div>
        <div v-for="day in day_array" :key="day.date">
          <DayCard :dayForecast="day" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import WeatherTab from "./WeatherTab.vue";
import HourCard from "./HourCard.vue";
import DayCard from "./DayCard.vue";
import { ref, onMounted, watch } from "vue";
import moment from "moment";

let currentCity = ref("Rio de Janeiro");

const tabClickHandler = (e: any) => {
  currentCity.value = e;
};

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const data = ref(null);
let day_array = ref([] as any);
let hourly_array = ref([] as any);
onMounted(fetchData);
watch(
  () => currentCity.value,
  (e: any) => {
    day_array.value = [];
    hourly_array.value = [];
    fetchData();
  }
);

//Get data from api, using 5 Day / 3 Hour Forecast api from OpenWeather API
async function fetchData() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity.value}&units=metric&appid=${apiKey}`,
    {
      method: "GET",
    }
  );
  const json = await res.json();
  data.value = json;
  //Populate date_array for the Next 5 Day forecast, find the high and low temp, as well as get an weather icon and description
  for (let i = 0; i < 5; i++) {
    let new_date = moment().add(i, "days").utc().format().substring(0, 10);
    let current_max_temp = 0;
    let current_min_temp = 100;
    let weather_icon = "";
    let weather_description = "";
    data.value?.list.forEach((item: any) => {
      if (item.dt_txt.substring(0, 10) === new_date) {
        if (item.main.temp_max > current_max_temp) {
          current_max_temp = item.main.temp_max;
        }
        if (item.main.temp_min < current_min_temp) {
          current_min_temp = item.main.temp_min;
        }
        //Picking 21:00:00 time for icon and description. Since 21:00:00 time will always be present.
        // Idealy API should only return one icon for 5 day forecast, but working with free tier api so it shows 5 day forecast for every 3 hours
        if (
          item.dt_txt.substring(item.dt_txt.length - 8, item.dt_txt.length) ===
          "21:00:00"
        ) {
          weather_icon = item.weather[0].icon;
          weather_description = item.weather[0].description;
        }
      }
    });
    day_array.value.push({
      date: moment(new_date).format("ddd, MMM Do"),
      temp_max: current_max_temp.toFixed(0) + "°",
      temp_min: current_min_temp.toFixed(0) + "°",
      weather_icon: weather_icon,
      weather_description: weather_description,
    });
  }
  //Populate Next Hours with the first 5 hours in the list, date is in UTC time. Could be from current date hours or next day hours
  for (let i = 0; i < 5; i++) {
    hourly_array.value.push({
      temp: data.value?.list[i].main.temp.toFixed(0) + "°",
      hour: moment(
        data.value?.list[i].dt_txt.substring(
          data.value?.list[i].dt_txt.length - 8,
          data.value?.list[i].dt_txt.length
        ),
        "hh"
      ).format("LT"),
      prep: (data.value?.list[i].pop * 100).toFixed(0) + "%",
      weather_icon: data.value?.list[i].weather[0].icon,
    });
  }
}
</script>
<style lang="css" scoped>
.app-wrapper {
  width: 400px;
  height: 650px;
  background-color: whitesmoke;
}
.search-wrapper {
  background-color: #2766cc;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.fa-search {
  color: white;
  padding-top: 6px;
}
.app-title {
  color: white;
  font-size: 18px;
  font-weight: 500;
}

.next-hours-wrapper {
  height: 170px;
  margin: 10px;
  background-color: white;
  overflow-x: scroll;
  overflow-y: hidden;
}

.next-days-wrapper {
  height: 350px;
  margin: 10px;
  background-color: white;
  overflow-y: scroll;
}
.next-hour-card-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border-top: 1px #ededed solid;
  align-items: center;
}

.weather-next-title {
  color: black;
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: 500;
  margin: 10px;
  padding-top: 4px;
}

html {
  overflow: scroll;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
