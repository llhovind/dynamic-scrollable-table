<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h2>Dynamic Scrollable Table Demo</h2>
    <a href="https://github.com/llhovind/dynamic-scrollable-table" target="_blank" class="githubLink" title="See Me on GitHub"><img src="./assets/github-mark.svg" alt="GitHub" /></a>
  </header>

  <RouterView />

  <footer>&copy;2022-{{ new Date().getFullYear() }} <a href="http://www.hovind.com" target="_blank">Lawrence L Hovind</a></footer>
</template>

<style lang="scss" scoped>
footer {
  font-size: smaller;
  text-align: center;
  color: gray;
  padding-left: 1rem;
  padding-right: 1rem;
}

header {
  display: block;
  background-image: linear-gradient(to right, rgba(9, 9, 255, .9), rgba(128, 0, 128, .9));
  color: white;
  text-align: center;
  font-size: 1.05rem;
  padding-bottom: 12px;
  margin-left: -4px;
  margin-top: 4px;
  border: 2px solid gold;
  border-radius: 6px;
  box-shadow: 2px 3px 6px gray;
  position: relative;

  h2 {
    color: gold;
    letter-spacing: 2px;
    font-size: 1.6rem;
    font-weight: bold;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
}

a.githubLink {
  position: absolute;
  bottom: 0px;
  right: 6px;

  img {
    height: 24px;
    width: 24px;
  }
}

@media (min-width: 1024px) {

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}
</style>
