const players = [
  {
      id : '00000000-0000-0000-0000-000000000100',
      username : 'j la rata'
  },
  {
      id : '00000000-0000-0000-0000-000000000101',
      username : 'RkT'
  },
  {
      id : '00000000-0000-0000-0000-000000000102',
      username : 'Bajtinovich'
  },
  {
      id : '00000000-0000-0000-0000-000000000103',
      username : 'Beret'
  },
  {
      id : '00000000-0000-0000-0000-000000000104',
      username : 'zql'
  },
  {
      id : '00000000-0000-0000-0000-000000000105',
      username : 'Nerto'
  },
  {
      id : '00000000-0000-0000-0000-000000000106',
      username : 'gBot'
  },
  {
      id : '00000000-0000-0000-0000-000000000107',
      username : 'Pirrón'
  },
  {
      id : '00000000-0000-0000-0000-000000000108',
      username : 'Ballesta'
  },
  {
      id : '00000000-0000-0000-0000-000000000109',
      username : 'Roll'
  },
  {
      id : '00000000-0000-0000-0000-000000000110',
      username : 'Warpathor'

    },
  {
      id : '00000000-0000-0000-0000-000000000111',
      username : 'Cacho&Juana'
  },
  {
      id : '00000000-0000-0000-0000-000000000112',
      username : 'El Duque'
  }
];
const users = [
  {
    email: '001@gmail.com',
    player_id: players[11].id,
    name: 'El Duque',
    password: '103456',
  },
  {
    email: '000@gmail.com',
    player_id: players[0].id,
    name: 'j la rata',
    password: '103456',
  },
  {
    email: '003@gmail.com',
    player_id: null,
    name: 'lauti',
    password: '103456',
  }
];

const leagues = [
  {
      id : '00000000-0000-0000-0000-000000000000',
      name : 'discordfyl',
  },
  {
      id : '00000000-0000-0000-0000-000000000001',
      name : 'duke magic world',
  }
];


const tournaments = [
  {
      id : '00000000-0000-0000-0000-000000000300',
      name : 'bburrowdraft',
      league_id : leagues[0].id,
      champion_id: null,
      date: '0004-10-06'
      
  },
  {
      id : '00000000-0000-0000-0000-000000000301',
      name : 'eldrainedraft',
      league_id : leagues[0].id,
      champion_id : players[0].id,
      date: '0004-09-03'
  },
  {
      id : '00000000-0000-0000-0000-000000000300',
      name : 'power cubo',
      league_id : leagues[1].id,
      champion_id : players[10].id,
      date: '0004-10-03'
  }
];

const games = [
  {
      id : '00000000-0000-0000-0000-000000000400',
      tournament_id : tournaments[0].id,
      round : 1,
  },
  {
      id : '00000000-0000-0000-0000-000000000401',
      tournament_id : tournaments[0].id,
      round : 1,
  },
  {
      id : '00000000-0000-0000-0000-000000000400',
      tournament_id : tournaments[0].id,
      round : 1,
  },
  {
      id : '00000000-0000-0000-0000-000000000403',
      tournament_id : tournaments[0].id,
      round : 0,
  },
  {
      id : '00000000-0000-0000-0000-000000000404',
      tournament_id : tournaments[0].id,
      round : 0,
  },
  {
      id : '00000000-0000-0000-0000-000000000405',
      tournament_id : tournaments[1].id,
      round : 1,
  },
  {
      id : '00000000-0000-0000-0000-000000000406',
      tournament_id : tournaments[1].id,
      round : 1,
  },
  {
      id : '00000000-0000-0000-0000-000000000407',
      tournament_id : tournaments[1].id,
      round : 0,
  },
  {
      id : '00000000-0000-0000-0000-000000000408',
      tournament_id : tournaments[1].id,
      round : 0,
  },
  {
      id : '00000000-0000-0000-0000-000000000409',
      tournament_id : tournaments[0].id,
      round : 1,
  },
  {
      id : '00000000-0000-0000-0000-000000000410',
      tournament_id : tournaments[0].id,
      round : 0,
  },
  {
      id : '00000000-0000-0000-0000-000000000411',
      tournament_id : tournaments[0].id,
      round : 1,
  }
];

const player_games = [
  {
    player_id: players[0].id, 
    game_id: games[0].id,
    wins: 0
  },
  {
    player_id: players[1].id, 
    game_id: games[0].id,
    wins: 0
  },
  {
    player_id: players[0].id, 
    game_id: games[1].id,
    wins: 0
  },
  {
    player_id: players[3].id, 
    game_id: games[1].id,
    wins: 1
  },
  {
    player_id: players[4].id, 
    game_id: games[0].id,
    wins: 1
  },
  {
    player_id: players[5].id, 
    game_id: games[0].id,
    wins: 1
  },
  {
    player_id: players[6].id, 
    game_id: games[3].id,
    wins: 0
  },
  {
    player_id: players[7].id, 
    game_id: games[3].id,
    wins: 0
  }, 
  {
    player_id: players[8].id, 
    game_id: games[4].id,
    wins: 0
  },
  {
    player_id: players[9].id, 
    game_id: games[4].id,
    wins: 0
  },
  {
    player_id: players[0].id, 
    game_id: games[5].id,
    wins: 0
  },
  {
    player_id: players[0].id, 
    game_id: games[5].id,
    wins: 1
  },
  {
    player_id: players[1].id, 
    game_id: games[6].id,
    wins: 1
  },
  {
    player_id: players[3].id, 
    game_id: games[6].id,
    wins: 1
  },
  {
    player_id: players[4].id, 
    game_id: games[7].id,
    wins: 0
  },
  {
    player_id: players[6].id, 
    game_id: games[7].id,
    wins: 0
  },
  {
    player_id: players[5].id, 
    game_id: games[8].id,
    wins: 0
  },
  {
    player_id: players[7].id, 
    game_id: games[8].id,
    wins: 1
  },
  {
    player_id: players[8].id, 
    game_id: games[9].id,
    wins: 1
  },
  {
    player_id: players[0].id, 
    game_id: games[9].id,
    wins: 1
  },
  {
    player_id: players[9].id, 
    game_id: games[10].id,
    wins: 0
  },
  {
    player_id: players[1].id, 
    game_id: games[10].id,
    wins: 0
  },
  {
    player_id: players[0].id, 
    game_id: games[11].id,
    wins: 0
  },
  {
    player_id: players[5].id, 
    game_id: games[11].id,
    wins: 1
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
  },
  {
    league_id: leagues[0].id,
    player_id: players[0].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[3].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[4].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[5].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[6].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[7].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[8].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[9].id,
    player_role: 'player'
  },
  {
    league_id: leagues[1].id,
    player_id: players[0].id,
    player_role: 'player'
  },
  {
    league_id: leagues[1].id,
    player_id: players[1].id,
    player_role: 'admin'
  },
  {
    league_id: leagues[1].id,
    player_id: players[0].id,
    player_role: 'player'
  },
  {
    league_id: leagues[1].id,
    player_id: players[3].id,
    player_role: 'player'
  },
  {
    league_id: leagues[1].id,
    player_id: players[4].id,
    player_role: 'player'
  },
  {
    league_id: leagues[1].id,
    player_id: players[5].id,
    player_role: 'player'
  },
  {
    league_id: leagues[1].id,
    player_id: players[6].id,
    player_role: 'player'
  },
  {
    league_id: leagues[1].id,
    player_id: players[7].id,
    player_role: 'player'
  },
  {
    league_id: leagues[1].id,
    player_id: players[8].id,
    player_role: 'player'
  },
  {
    league_id: leagues[1].id,
    player_id: players[9].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[0].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[1].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[2].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[3].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[4].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[5].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[6].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[7].id,
    player_role: 'player'
  },
  {
    league_id: leagues[0].id,
    player_id: players[8].id,
    player_role: 'admin'
  },
  {
    league_id: leagues[0].id,
    player_id: players[9].id,
    player_role: ''
  },
]



export { players, users, leagues, tournaments, games, player_games, league_players };
