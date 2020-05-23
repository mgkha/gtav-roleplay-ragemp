import { playerInteractionMenu } from 'modules/menu';
import { turnOnEngine, turnOffEngine } from 'modules/player/vehicles';

// @ts-ignore
let chatOpen = false; // eslint-disable-line

const unBindKeys = (): void => {
  //unbind keys
  for (let i = 0x01; i < 0xFE; i++) {
    if(i == 0x0D) { continue; }
    mp.keys.unbind(i, true);
  }
};

const bindKeys = (): void => {

  mp.keys.bind(0x24, true, function () { // Home Key
    mp.players.local.vehicle && turnOnEngine(mp.players.local.vehicle);
  });

  mp.keys.bind(0x23, true, function () { // End Key
    mp.players.local.vehicle && turnOffEngine(mp.players.local.vehicle);
  });

  mp.keys.bind(0x4D, true, function () { //M Key
    if (playerInteractionMenu.Visible) { playerInteractionMenu.Close(); } else { playerInteractionMenu.Open(); }
  });

  mp.keys.bind(0x4E, true, function () { // N Key
    const player = mp.players.local;
    const vehicle = mp.vehicles.new(mp.game.joaat('minivan'), new mp.Vector3(player.position.x + 2, player.position.y, player.position.z + 2));
    
    setTimeout(()=> {
      vehicle.setEngineHealth(400);
      vehicle.setBodyHealth(0);
    }, 1000);
    
    mp.gui.chat.push(`${vehicle.id} has spawned!`);
  });

  mp.keys.bind(0x54, true, function () { // T Key
    chatOpen = true;
    unBindKeys();
  });

};

mp.keys.bind(0x0D, true, function () { // Enter Key
  chatOpen = false;
  bindKeys();
});

// Enter Key 0x0D T Key 0x54
export const registerKeyBinding = (): void => {
  bindKeys();
};
