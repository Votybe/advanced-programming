<template>
  <div class="team">
    <h2 class="team__name">{{ team.name }}</h2>
    <img
      class="team__crest"
      :src="team.crest"
      :alt="team.shortName"
      width="150"
    />
    <p class="team__founded">Founded: {{ team.founded }}</p>
    <p class="team__club-colors">Club colors: {{ team.clubColors }}</p>
    <p class="team__venue">Venue: {{ team.venue }}</p>
    <h3 class="team__squad-title">Squad</h3>
    <ul class="team__squad-list">
      <li
        v-for="player in team.squad"
        :key="player.id"
        class="team__squad-player"
      >
        <p>{{ player.name }}</p>
        <p>{{ player.position }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Team",
  data() {
    return {
      team: {
        name: "",
        crest: "",
        founded: "",
        clubColors: "",
        venue: "",
        squad: [],
      },
    };
  },
  methods: {
    async getTeam() {
      // const instance = axios.create({
      //   baseURL: "https://api.football-data.org/v4",
      // });
      // instance.interceptors.request.use((config) => {
      //   config.headers["Access-Control-Allow-Origin"] = "*";
      //   return config;
      // });
      // const idPsg = 524;
      // // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      // const response2 = await axios.get(`http://localhost:3001/team/${idPsg}`, {
      //   "Content-Type": "application/json",
      //   "X-Auth-Token": "66a7adb340ab4243b1bd48fb26198eb9",
      // });
      // console.log(response2);
      // this.team = response2.data;
      // this.team.squad = {
      //   name: response2.data.squad.name,
      //   position: response2.data.squad.position,
      // };
    },
  },
  mounted() {
    this.getTeam();
  },
};
</script>

<style lang="scss" scoped>
/* Ajoutez votre style SCSS ici */

.team {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;

  &__name {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  &__crest {
    margin-bottom: 1rem;
  }

  &__founded,
  &__club-colors,
  &__venue {
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }

  &__squad-title {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  &__squad-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;

    .team__squad-player {
      background-color: rgb(13, 13, 106);
      color: aliceblue;
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      text-align: center;
      margin: 2rem;
      width: 10%;
      list-style: none;
    }
  }
}
</style>
