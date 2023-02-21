import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config({ path: "config.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/test2/:idplayer", async (req, res) => {
//   const { idplayer } = req.params;

//   let resp = await axios.get(
//     `https://api.football-data.org/v4/persons/${idplayer}`,
//     {
//       headers: {
//         "X-Auth-Token": "66a7adb340ab4243b1bd48fb26198eb9",
//       },
//     }
//   );
//   res.status(200).json(resp.data);
// });

app.get("/competition-info/:leagueCode", async (req, res) => {
  const { leagueCode } = req.params;
  let resp = await axios.get(
    `https://api.football-data.org/v4/competitions/${leagueCode}`,
    {
      headers: {
        "X-Auth-Token": "66a7adb340ab4243b1bd48fb26198eb9",
      },
    }
  );
  res.status(200).json(resp.data);
});

app.get("/competition-standings/:code", async (req, res) => {
  let code = req.params.code;
  console.log(code);

  let resp = await axios.get(
    `https://api.football-data.org/v4/competitions/${code}/standings`,
    {
      headers: {
        "X-Auth-Token": "66a7adb340ab4243b1bd48fb26198eb9",
      },
    }
  );

  let respScores = await axios.get(
    `https://api.football-data.org/v4/competitions/${code}/scorers`,
    {
      headers: {
        "X-Auth-Token": "66a7adb340ab4243b1bd48fb26198eb9",
      },
    }
  );
  res.status(200).json({
    standings: resp.data,
    scorers: respScores.data,
  });
});

app.get("/test4", async (req, res) => {
  let resp = await axios.get(
    `https://api.football-data.org/v4/competitions/FL1/matches?matchday=22`,
    {
      headers: {
        "X-Auth-Token": "66a7adb340ab4243b1bd48fb26198eb9",
      },
    }
  );

  res.status(200).json(resp.data);
});

app.get("/test5/:matchday", async (req, res) => {
  let resp = await axios.get(
    `https://api.football-data.org/v4/competitions/FL1/standings?matchday=${req.params.matchday}`,
    {
      headers: {
        "X-Auth-Token": "66a7adb340ab4243b1bd48fb26198eb9",
      },
    }
  );
  res.status(200).json(resp.data);
});

app.get("/competitions", async (req, res) => {
  let resp = await axios.get(`https://api.football-data.org/v4/competitions`, {
    headers: {
      "X-Auth-Token": "66a7adb340ab4243b1bd48fb26198eb9",
    },
  });
  res.status(200).json(resp.data);
});

app.get("/competion-match/:code/:matchday", async (req, res) => {
  let { code, matchday } = req.params;
  console.log("code", code);
  console.log("matchday", matchday);
  let resp = await axios.get(
    `https://api.football-data.org/v4/competitions/${code}/matches?matchday=${matchday}`,
    {
      headers: {
        "X-Auth-Token": "66a7adb340ab4243b1bd48fb26198eb9",
      },
    }
  );

  res.status(200).json(resp.data);
});

app.get("/competion-teams/:code", async (req, res) => {
  let { code } = req.params;
  console.log("code", code);
  let resp = await axios.get(
    `https://api.football-data.org/v4/competitions/${code}/teams`,
    {
      headers: {
        "X-Auth-Token": "66a7adb340ab4243b1bd48fb26198eb9",
      },
    }
  );

  res.status(200).json(resp.data);
});

app.get("/team/:idteam", async (req, res) => {
  const { idteam } = req.params;
  console.log(idteam);
  const resp = await axios.get(
    `https://api.football-data.org/v4/teams/${idteam}`,
    {
      headers: {
        "X-Auth-Token": "66a7adb340ab4243b1bd48fb26198eb9",
      },
    }
  );
  res.status(200).json({
    team: resp.data,
  });
});

app.listen(3001, () => {
  console.log("app is running");
});
