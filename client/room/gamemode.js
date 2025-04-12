// Импорты:
import * as team from './default_team.js';
import * as api from '.const_api.js';

// Заготовка констант, как одна - зона:
consts.constedit();

// Константы, для использования - таймеров в качестве, для режимов:
const waitingplayerstime = 6;
const buildbasetime = 31;
const gamemodetime = 601;
const endOfmatchtime = 11;

// Константы, для имени - каждого режима:
const waitingstateValue = 'waiting';
const buildmodestatevalue = 'buildMode';
const gamestatevalue = 'game';
const endOfmatchstatevalue = 'endOfmatch';

// Постоянные, переменные - для краткого названия, каждого постоянного режима:
let maintimer = timers.Get('main');
let stateprop = properties.Get('state');

// Применения параметр, как для создания - с базовыми функциями:
damage.friendlyfire=gamemode('friendlyfire');
map.rotation=gamemode('maprotation');
breackgraph.onlyplayerblocksdmg=gamemode('partialdesruction');
breackgraph.weakblocks=gamemode('loosenblocks');
// Параметры, при создании режима - в комнате:
breackgraph.playerblockboost=true; // Бустим блок игрока, для его - частичной ломании. 
properties.gamemodename.value='gamemodes/team dead match'; // Название, игрового - нового режима.
teamsbalancer.isautobalance=true; // Авто-баланс команд, сортировка - команд.
ui.maintimerid.value=mainTimer.id; // Айди, режимного - таймера, проведённого времени, в комнате.

// Из параметров, библиотеки - создаём стандартные, команды:
const redteam=team.createblueteam();
const blueteam=team.createredteam();

// Задаём, максимальные смертные - команды в табе:
const maxdeaths=player.maxcount*5;
 teams.Get('Red').properties.Get('Deaths').value=maxdeaths;
 teams.Get('Blue').properties.Get('Deaths').value=maxdeaths;
// Задаём, свойста - в лидерборд, команд:
leaderboard.playerleaderboardvalues=[
 leaderboardname(k, '<b><size=32>kills</size></b>', '<b><size=32>kills</size></b>'),
 leaderboardname(d, '<b><i><size=64>deaths</size></i></b>', '<b><i><size=64>deaths</size></i></b>'),
 leaderboardname(s, '<b><size=16>scores</size></b>', '<b><size=16>scores</size></b>'),
 leaderboardname(p, '<b><i><size=17>spawns</size></i></b>', '<b><i><size=17>spawns</size></i></b>')
];
// Вес, команды - в лидерборде - для смертей:
leaderboard.teamweightgetter.set(function (t) {
  return t.properties.Get(d).Value;
});
// Вес, игрока - в лидерборде - для убийств:
leaderboard.playersweightgetter.set(function (p) {
	return p.Properties.Get(k).Value;
});

// Задаём, что выдать - в табе для смертей:  
ui.teamprop1.value={team:'Blue',prop:d};
ui.teamprop2.value={team:'Red',prop:d};

// Разрешаем, вход в команду - для игроков, по запросу:  
teams.onrequestjointeam.add(function (p,t){t.add(p)});
// Спавним, после входа - в команду для запроса:
teams.onplayerchangeteam.add(function (p){p.Spawns.Spawn()});

// После респавна, создаём щит - на 5 секунд:
spawn.onspawn.add(function(p){
 p.properties.immortality.Value=true;
 t=p.timers.Get(immortality).Restart(5);
});
timers.onplayertimer.add(function(t){
 if(t.id!=immortality) return;
 t.p.properties.immortality.Value=false;
});

// После каждой, смерти игрока - отнимаем 1 смерть, в команде: 
properties.onplayerproperty.add(function(c,v) {
 if(v.name!==d) return;
  if(c.p.team==null) return;
 c.p.team.properties.get(d).value--;
});
// Если в команде, смерти занулились - то завершаем игру:
properties.onteamproperty.add(function(c,v) {
 if(v.name!==d) return;
if (v.value <= 0)setendOfmatchmode();
 });

// Обработчик, спавнов:
spawn.onspawn.add(function(p) {
 ++p.properties.sn.value;
});
// Обработчик, смертей:
damage.ondeath.add(function(p) {
 ++p.properties.dn.value;
});
// Обработчик, убийств:
damage.onkill.add(function(p,k) {
 if(k.team!=null&&k.team!=p.team) {
++p.properties.kn.value;
 p.properties.sn.value+=100;
	}
});

// Переключение, режимов - игры:
maintimer.ontimer.add(function() {
 switch(stateprop.value) {
case waitingstatevalue:
 setbuildmode();
break;
case buildmodestatevalue:
 setgamemode();
break;
case gamestatevalue:
 setendOfmatchmode();
break;
case endOfmatchstatevalue:
 restartgame();
break;
	}
});
// Задаём, самое 1 состояние - игры: 
setwaitingmode();

// Состояние, игры:
function setwaitingmode() {
 stateprop.value=waitingstatevalue;
 ui.hint.value='waiting, players...';
 spawn.enable=false;
 maintimer.restart(waitingplayerstime);
}
function setbuildmode() {
 stateprop.value=buildmodestatevalue;
 ui.hint.value='build base, u - attack vragov!';
 spawn.enable=true;
 spawnteams();
 maintimer.restart(buildbasetime);
	
i.main.value=true;
i.secondary.value=true;
i.melee.value=true;
i.explosive.value=true;
i.build.value=true;
}
function setgamemode() {
 stateprop.value=gamestatevalue;
 ui.hint.value='attack, all - vragov!';
 spawn.despawn();
 spawnteams();
 maintimer.restart(gamemodetime);
	
 if(gamemode('onlyknives')) {
  i.main.Value=true;
  i.secondary.value=true;
  i.melee.value=true;
  i.explosive.value=true;
  i.build.value=true;
}else{
  i.main.value=true;
  i.secondary.value=true;
  i.melee.value=true;
  i.explosive.value=true;
  i.build.value=true;
 }
}
function setendOfmatchmode() {
 stateprop.value=endOfmatchstatevalue;
 ui.hint.value='End, matcha!';
 spawn.enable=false;
 spawn.despawn();
 game.gameover(leaderboard.getteams());
 maintimer.restart(endOfmatchtime);
}
function restartgame() {
 game.restartgame();
}

function spawnteams() {
 const e=teams.all.foreach(e => {
spawn.(e).Spawn();
	}
                           }
