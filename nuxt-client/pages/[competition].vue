<template>
  <div>
    <NuxtLink to="/about">Retour à l'accueil</NuxtLink>
    <div class="panel-informations">
      <img :src="competitionInfo.emblem" alt="Emblème de la compétition" />
      <img
        :src="competitionInfo.area.flag"
        alt="Drapeau de la zone géographique de la compétition"
      />
      <p>Journée {{ competitionInfo.currentSeason.currentMatchday }}</p>
      <div>
        <p>Date de début : {{ competitionInfo.currentSeason.startDate }}</p>
        <p>Date de fin : {{ competitionInfo.currentSeason.endDate }}</p>
      </div>
    </div>

    <div>
      <ul class="panel-teams">
        <li v-for="team in teams" :key="team.id" @click="goToOneTeam(team.id)">
          <img :src="team.image" alt="" />
          <p>{{ team.name }}</p>
        </li>
      </ul>
    </div>

    <div>
      <label for="matchday-select">Sélectionner une journée :</label>
      <select
        id="matchday-select"
        v-model="selectedMatchday"
        @change="getMatchesByMatchday(selectedMatchday)"
      >
        <option v-for="matchday in matchdays" :value="matchday">
          {{ matchday }}
        </option>
      </select>

      <ul class="matchs-list">
        <li v-for="match in matches" :key="match.id">
          <div class="match-teams">
            <img :src="match.homeTeam.crest" alt="" class="team-crest" />
            <p>{{ match.homeTeam.name }}</p>
            <span>vs.</span>
            <p>{{ match.awayTeam.name }}</p>
            <img :src="match.awayTeam.crest" alt="" class="team-crest" />
          </div>
          <p class="match-score">
            {{ match.score.fullTime.home }} -
            {{ match.score.fullTime.away }}
          </p>
        </li>
      </ul>
    </div>

    <div class="table-responsive">
      <p class="categories">
        <strong @click="getTable('tableS')">Classement général</strong>
        <strong @click="getTable('table2S')">Classement domicile</strong>
        <strong @click="getTable('table3S')">Classement exterieur</strong>
      </p>
      <table class="table" v-show="showTable">
        <thead>
          <tr>
            <th>Rang</th>
            <th>Équipe</th>
            <th>Points</th>
            <th>Joués</th>
            <th>Gagnés</th>
            <th>Nuls</th>
            <th>Perdus</th>
            <th>Buts pour</th>
            <th>Buts contre</th>
            <th>Différence de buts</th>
            <th>Forme</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(equipe, index) in table" :key="index">
            <td>{{ equipe.position }}</td>
            <td>{{ equipe.team.name }}</td>
            <td>{{ equipe.points }}</td>
            <td>{{ equipe.playedGames }}</td>
            <td>{{ equipe.won }}</td>
            <td>{{ equipe.draw }}</td>
            <td>{{ equipe.lost }}</td>
            <td>{{ equipe.goalsFor }}</td>
            <td>{{ equipe.goalsAgainst }}</td>
            <td>{{ equipe.goalDifference }}</td>
            <td>{{ equipe.form }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <table>
        <thead>
          <tr>
            <th>Buteur</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Nationalité</th>
            <th>Poste</th>
            <th>Buts</th>
            <th>Passes décisives</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(equipe, index) in scorers" :key="index">
            <td>{{ equipe.goals }}</td>
            <td>{{ equipe.player.name }}</td>
            <td>{{ equipe.player.firstName }}</td>
            <td>{{ equipe.player.nationality }}</td>
            <td>{{ equipe.player.position }}</td>
            <td>{{ equipe.goals }}</td>
            <td>{{ equipe.assists }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      matches: [],
      selectedMatchday: 1, // Journée sélectionnée par défaut
      matchdays: Array.from({ length: 38 }, (v, i) => i + 1),
      // Tableau contenant les numéros de toutes les journées
      teams: [],
      table: [],
      competitionInfo: {
        name: "",
        emblem: "",
        area: {
          name: "",
        },
        currentSeason: {
          currentMatchday: "",
          startDate: "",
          endDate: "",
        },
      },
      tableShow: {
        tableS: true,
        table2S: false,
        table3S: false,
      },
      showTable: true,
      scorers: [],
      matches: [],
    };
  },

  methods: {
    async getParams() {
      const { competition } = useRoute().params;
      this.id = competition;
    },
    async getCompetitionInfo() {
      let res = await axios.get(
        `http://localhost:3001/competition-info/${this.id}`
      );

      console.log(res.data);

      this.competitionInfo = {
        name: res.data.name,
        emblem: res.data.emblem,
        area: {
          name: res.data.area.name,
          flag: res.data.area.flag,
        },
        currentSeason: {
          currentMatchday: res.data.currentSeason.currentMatchday,
          startDate: res.data.currentSeason.startDate,
          endDate: res.data.currentSeason.endDate,
        },
      };
    },
    async getTable(tableType) {
      let res = await axios.get(
        `http://localhost:3001/competition-standings/${this.id}`
      );
      switch (tableType) {
        case "tableS":
          this.table = res.data.standings.standings[0].table;
          break;
        case "table2S":
          this.table = res.data.standings.standings[1].table;
          break;
        case "table3S":
          this.table = res.data.standings.standings[2].table;
          break;
        default:
          this.table = [];
          break;
      }
      this.scorers = res.data.scorers.scorers;
      this.showTable = true;
    },
    async getMatches() {
      let matchday = 1;
      const res = await axios.get(
        `http://localhost:3001/competion-match/${this.id}/${matchday}`
      );

      this.matches = res.data.matches;

      // Calculer le nombre total de journées pour la compétition
      const totalMatchdays = res.data.season.currentMatchday;

      // Ajouter les numéros de toutes les journées dans le tableau "matchdays"
      for (let i = 1; i <= totalMatchdays; i++) {
        this.matchdays.push(i);
      }
    },
    async getMatchesByMatchday(matchday) {
      console.log("je suis dans getMatchesByMatchday" + matchday);

      const res = await axios.get(
        `http://localhost:3001/competion-match/${this.id}/${matchday}`
      );

      this.matches = res.data.matches;
    },
    async getAllTeams() {
      let res = await axios.get(
        `http://localhost:3001/competion-teams/${this.id}`
      );
      console.log(res.data);
      for (const iterator of res.data.teams) {
        this.teams.push({
          name: iterator.name,
          image: iterator.crest,
          id: iterator.id,
          coach: iterator.coach.firstName + " " + iterator.coach.lastName,
        });
      }
    },
    goToOneTeam(id) {
      // const router = useRouter();
      this.$router.push({ path: `test/${id}` });

      console.log("je suis dans goToOneTeam" + id);
      // this.$router.push({ path: `/${code}` });
      // this.$router.push({ params: "team", path: `/team/${id}` });
    },
  },
  mounted() {
    this.getParams();
    this.getCompetitionInfo();
    this.getTable("tableS");
    this.getMatches();
    this.getAllTeams();
  },
};
</script>

<style lang="scss">
.panel-teams {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem;
  img {
    margin: 1rem;
    width: 100px;
    height: 100px;
  }
  p {
    margin: 1rem;
  }

  li {
    list-style: none;
    &:hover {
      cursor: pointer;
      scale: 1.1;
    }
  }
}

.panel-informations {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  p {
    margin: 2rem;
  }

  img {
    margin: 1rem;
    width: 100px;
    height: 100px;
  }
}

.categories {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 1.5rem;
  font-weight: bold;
  strong {
    margin: 1rem;
    cursor: pointer;
  }
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: #fff;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  vertical-align: middle;
  border-top: 1px solid #dee2e6;
}

th {
  font-weight: bold;
  text-align: left;
  background-color: #f2f2f2;
}

tbody tr:nth-of-type(even) {
  background-color: #f8f9fa;
}

@media (max-width: 767px) {
  .table-responsive {
    width: 100%;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .table {
    margin-bottom: 0;
  }

  .table thead {
    display: none;
  }

  .table tbody {
    display: block;
    width: 100%;
  }

  .table tbody tr {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid #dee2e6;
  }

  .table td {
    display: block;
    padding: 0.25rem;
    text-align: center;
    border-top: none;
  }

  .table td::before {
    content: attr(data-label);
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    display: block;
  }

  .table td:first-child {
    margin-top: 1rem;
  }
}

// ---- -- -- - -- -- - --- -- - - -- -- --

.panel-informations {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 100%;
  max-width: 500px;
}

.panel-informations img {
  width: 100%;
  max-width: 150px;
  margin-bottom: 10px;
}

.panel-informations p {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 10px;
}

.panel-informations div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media only screen and (min-width: 768px) {
  .panel-informations {
    flex-direction: row;
  }

  .panel-informations img {
    max-width: 200px;
    margin-right: 20px;
    margin-bottom: 0;
  }

  .panel-informations p {
    margin-bottom: 0;
  }

  .panel-informations div {
    align-items: flex-start;
  }
}

// liste des matchs stylisés

.matchs-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.matchs-list li {
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
}

.match-teams {
  display: flex;
  align-items: center;
}

.team-crest {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.match-score {
  font-weight: bold;
  font-size: 20px;
}
</style>
