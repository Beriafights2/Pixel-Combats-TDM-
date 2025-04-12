// Библиотека, как для команд двух - матчей.
// Импорт:
import * as Api from './Const_Api.js';
Api.ApiConst();

// Настройки части команд, связывающее по - имени константе:
export const BlueName = 'Blue'; 
export const RedName = 'Red';
export const BlueDisPlayName = '<b>Teams/BlueTeam</b>';
export const RedDisPlayName = '<b>Teams/RedTeam</b>';
export const BlueSpawnPointsaGroup = '1';
export const RedSpawnPointsGroup = '2';
export const BlueBuildBlocksSet = BuildBlocksBlueSet;
export const RedBuildBlocksSet = BuildBlocksRedSet;
export const BlueColor = Color(0, 0, 1, 0);
export const RedColor = Color(1, 0, 0, 0);

// Создание, команды - синие используя параметров из констант:
export function CreateBlueTeam() {
 Teams.Add(BlueName, BlueDisPlayName, BlueColor);
 Spawns.SpawnPointsGroups.Add(BlueSpawnPointsGroup);
