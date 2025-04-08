<template>
  <ul class="nav nav-underline">
    <li class="nav-item" @click="changeTabs('Rio de Janeiro')">
      <a
        class="nav-link"
        :class="{ active: currentActive === 'Rio de Janeiro' }"
        aria-current="page"
        href="#"
      >
        RIO DE JANEIRO</a
      >
    </li>
    <li class="nav-item" @click="changeTabs('Beijing')">
      <a
        class="nav-link"
        href="#"
        :class="{ active: currentActive === 'Beijing' }"
        >BEIJING</a
      >
    </li>
    <li class="nav-item" @click="changeTabs('Los Angeles')">
      <a
        class="nav-link"
        :class="{ active: currentActive === 'Los Angeles' }"
        href="#"
        >LOS ANGELES</a
      >
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["tabClick"]);
const currentActive = ref("Rio de Janeiro");
const changeTabs = (link: string) => {
  currentActive.value = link;
  emit("tabClick", link);
};
</script>
<style lang="css" scoped>
.nav-underline .nav-link.active {
  border-bottom-color: red !important;
}

.nav-underline .nav-link {
  color: black;
  opacity: 0.7;
}
.nav-underline .nav-link:hover {
  color: black;
  opacity: 0.7;
}
.nav-underline .nav-item {
  padding-right: 15px;
  padding-left: 10px;
}

.nav-underline {
  background-color: white;
}
</style>
