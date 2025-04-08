<template>
  <div class="hour-card-wrapper">
    <div class="temp-text">{{ hourForecast.temp }}</div>
    <div class="prep-text">{{ hourForecast.prep }}</div>
    <img
      :src="
        'https://openweathermap.org/img/wn/' +
        hourForecast.weather_icon +
        '@2x.png'
      "
      width="50px"
    />
    <div class="hour-text">{{ hourForecast.hour }}</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  hourForecast: {
    temp: String,
    hour: String,
    prep: String,
    weather_icon: String,
  },
});
</script>
<style lang="css" scoped>
.hour-card-wrapper {
  display: flex;
  flex-direction: column;
  border-right: 1px #ededed solid;
  width: 77px;
  justify-content: center;
  align-items: center;
  padding-top: 4px;
}

.temp-text {
  color: black;
  font-size: 11px;
  font-weight: 500;
}

.prep-text {
  color: #0cc6f0;
  font-size: 11px;
}

.hour-text {
  color: gray;
  font-size: 11px;
}
</style>
