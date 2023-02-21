<template>
  <div>
    <h1>{{ msg }}</h1>
    <ul class="test">
      <li v-for="competition in competitions" :key="competition.id">
        <div class="container-team">
          <div class="home-team" @click="changePage(competition.code)">
            <!-- <NuxtLink to="/competition">go</NuxtLink> -->
            <div>
              <!-- <h4>{{ competition.name }}</h4> -->
              <img :src="competition.emblem" alt="" />
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "About",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      competitions: [],
    };
  },
  methods: {
    // async getCompetitions() {
    //   let res = await axios.get("http://localhost:3001/competitions");
    //   this.competitions = res.data.competitions;
    // },
    async getCompetitions() {
      let result = await axios.get("http://localhost:8080/test");
      console.log(result);
    },
    changePage(code) {
      this.$router.push({ path: `/${code}` });
    },
  },
  mounted() {
    this.getCompetitions();
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0;
  margin: 0;
  li {
    width: 200px;
    height: 200px;
    background-color: #fff;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    h4 {
      margin: 0;
      padding: 0;
      font-size: 1.2rem;
    }
    img {
      width: 100px;
      height: 100px;
    }
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
}
</style>
