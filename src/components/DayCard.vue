<template>
  <div class="day-card-wrapper">
    <img
      :src="
        'https://openweathermap.org/img/wn/' +
        dayForecast.weather_icon +
        '@2x.png'
      "
      width="50px"
    />
    <div>
      <div class="date-text">{{ dayForecast.date }}</div>
      <div class="description-text">{{ dayForecast.weather_description }}</div>
    </div>
    <div class="temp-wrapper">
      <div>{{ dayForecast.temp_max }}</div>
      <div>{{ dayForecast.temp_min }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  dayForecast: {
    date: String,
    temp_max: String,
    temp_min: String,
    weather_icon: String,
    weather_description: String,
  },
});
</script>
<style lang="css" scoped>
.day-card-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 20px;
  border-top: 1px #ededed solid;
}
.temp-wrapper {
  display: flex;
  flex-direction: row;
  gap: 10px;
  color: black;
  font-weight: 500;
  font-size: 14px;
}

.date-text {
  font-size: 15px;
  font-weight: 500;
  color: black;
  padding-top: 8px;
}

.description-text {
  font-size: 12px;
  color: gray;
  font-weight: 400;
}
</style>
