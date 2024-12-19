const players = [
  {
      id : '00000000-0000-0000-0000-000000000100',
      username : 'username'
  },
  {
    id : '00000000-0000-0000-0000-000000000100',
    username : 'another username'
  }
];
const users = [
  {
    email: '000@gmail.com',
    player_id: players[0].id,
    name: 'name',
    password: 'password',
  }
];

const leagues = [
  {
      id : '00000000-0000-0000-0000-000000000000',
      name : 'league name',
  }
];

const tournaments = [
  {
      id : '00000000-0000-0000-0000-000000000300',
      name : 'tournament name',
      league_id : leagues[0].id,
      champion_id: null,
      date: '2024-10-06'
      
  }
];

const games = [
  {
      id : '00000000-0000-0000-0000-000000000400',
      tournament_id : tournaments[0].id,
      round : 1,
  }
];

const player_games = [
  {
    player_id: players[0].id, 
    game_id: games[0].id,
    wins: 2
  },
  {
    player_id: players[1].id, 
    game_id: games[0].id,
    wins: 0
  }
];

const league_players =
[
  {
    league_id: leagues[0].id,
    player_id: players[0].id,
    player_role: 'admin'
  },
  {
    league_id: leagues[0].id,
    player_id: players[1].id,
    player_role: 'player'
  }
]

export { players, users, leagues, tournaments, games, player_games, league_players };
