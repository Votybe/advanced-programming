<template>
  <div>
    <h1>{{ msg }}</h1>
    <NuxtLink to="/about">About</NuxtLink>
    <ul class="test">
      <li v-for="item in matchs" :key="item.id">
        <div class="container-team">
          <div class="home-team">
            <div>
              <p>{{ item.homeTeam.name }}</p>
              <img :src="item.homeTeam.crest" alt="" />
            </div>
          </div>
          <div class="scores">
            <h4>{{ item.score.fullTime.home }}</h4>
            <h4>{{ item.score.fullTime.away }}</h4>
          </div>
          <div class="away-team">
            <div>
              <p>{{ item.awayTeam.name }}</p>
              <img :src="item.awayTeam.crest" alt="" />
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 
    <label for="numero">Choisissez un numéro :</label>
    <select
      id="numero"
      v-model="selectedNumero"
      @change="chetGpa(selectedNumero)"
    >
      <option v-for="numero in numeros" :value="numero">{{ numero }}</option>
    </select> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      teams: [],
      matchs: [],
      matchsDays: [],
      idpsg: 330301,
      numeros: Array.from({ length: 38 }, (_, i) => i + 1),
      selectedNumero: 1,
    };
  },
  methods: {
    async nuxtInit() {
      let res = await axios.get("http://localhost:3001/test");
      //   console.log(res);
      this.teams = res.data.squad;
    },
    // async chetGpa(number) {
    //   console.log(number);
    //   let res = await axios.get(`http://localhost:3001/test5/${number}`);
    //   console.log(res.data);
    //   this.table = res.data.standings[0].table;
    // },
    async getTable() {
      let res = await axios.get(`http://localhost:3001/test3/${this.idpsg}`);
      console.log(res.data);
      this.table = res.data.standings[0].table;
    },
    async getMatch() {
      let res = await axios.get(`http://localhost:3001/test4`);
      this.matchs = res.data.matches;
    },
  },
  mounted() {
    // this.nuxtInit();
    // this.getTable();
  },
};
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
  padding: 10px;
  list-style: none;

  li {
    border: 1px solid black;
    margin: 2rem;
    padding: 1.5rem 0;
    width: 25%;
  }
  img {
    width: 50px;
    height: 50px;
  }
}
.container-team {
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  width: 100%;
  .home-team {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
  .away-team {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
}
</style>
