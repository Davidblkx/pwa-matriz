<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <button @click="init()">click me</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";
import { MatrixHandler } from "./core/matrix-handler";

@Options({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  public init() {
    const handler = new MatrixHandler(3);

    handler.setCoordinate("A", 1, "123");
    handler.setCoordinate("A", 2, "456");
    handler.setCoordinate("A", 3, "789");
    handler.setCoordinate("B", 1, "123");
    handler.setCoordinate("B", 2, "456");
    handler.setCoordinate("B", 3, "789");
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
