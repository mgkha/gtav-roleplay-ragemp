// import { PedHashes } from './peds';
const PedHashes = require('./peds');

mp.events.add('spawn_vehicle', (player: PlayerMp) => {
  const vehicle = mp.vehicles.new(mp.joaat('police3'), new mp.Vector3(player.position.x + 3, player.position.y + 3, player.position.z + 3));
  vehicle.numberPlate = 'EE-3784';
  player.call('spawn_vehicle', [vehicle]);
});

const peds = Object.keys(PedHashes);
let i = 0;
mp.events.add('change_next_ped', (player: PlayerMp) => {
  i++;
  player.model = mp.joaat(peds[i]);
  player.outputChatBox(peds[i]);
});

mp.events.add('change_prev_ped', (player: PlayerMp) => {
  i--;
  player.model = mp.joaat(peds[i]);
  player.outputChatBox(peds[i]);
});
