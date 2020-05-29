import { hideHudElements } from 'utils/hud';
import { registerVehicle } from 'modules/player/vehicles';
import { BindAllKeys, unBindAllKeys } from 'modules/keymanager';

let lastVehicle: VehicleMp;

mp.events.add('clientLaunched', (): void => {
  hideHudElements([1, 3]);
  mp.discord.update('GTAV Roleplay', 'A Developer');
  mp.gui.chat.push('Please login to enter the world!');
  mp.events.call('authenticate');
  // mp.events.call('authenticated');
});

mp.events.add('authenticated', (): void => {
  mp.events.callRemote('playerLoggedin');
});

mp.events.add('enablePlayer', (invisible: boolean = false): void => {
  //enable player
  if (invisible) {
    mp.players.local.setAlpha(0);
  }
  else {
    mp.players.local.setAlpha(255);
  }
  mp.players.local.freezePosition(false);
  mp.gui.chat.activate(true);
  mp.gui.chat.show(true);
  mp.game.ui.displayRadar(true);
  mp.game.ui.displayHud(true);
  mp.gui.cursor.show(false, false);
  BindAllKeys();
});

mp.events.add('disablePlayer', (invisible: boolean = false): void => {
  //disable player
  if (invisible) {
    mp.players.local.setAlpha(0);
  }
  else {
    mp.players.local.setAlpha(255);
  }
  mp.players.local.freezePosition(true);
  mp.gui.chat.activate(false);
  mp.gui.chat.show(false);
  mp.game.ui.displayRadar(false);
  mp.game.ui.displayHud(false);
  mp.gui.cursor.show(true, true);
  unBindAllKeys();
});

mp.events.add('playerReady', () => {
  mp.gui.chat.push('I am Ready!');
});

mp.events.add('enterCharacterCreation', () => {
  mp.gui.chat.push('enterCharacterCreation');

  mp.events.call('characterCreator');
});

mp.events.add('playerEnterVehicle', (vehicle: VehicleMp) => {
  lastVehicle = vehicle;
  registerVehicle(vehicle);
  mp.game.graphics.notify('Press ~g~Home ~w~button to start engine');
});

mp.events.add(RageEnums.EventKey.RENDER, () => { 
  const location = `${Math.round(mp.players.local.position.x)} ${Math.round(mp.players.local.position.y)} ${Math.round(mp.players.local.position.z)}`;
  mp.game.graphics.drawText(location, [0.8, 0.005], {
    font: 0,
    centre: false,
    color: [255, 255, 255, 255],
    scale: [0.8, 0.8],
    outline: false
  });

  if(lastVehicle) {
    mp.game.graphics.drawText(`Engine Health - ${lastVehicle.getEngineHealth().toString()}`, [0.5, 0.005], {
      font: 0,
      centre: false,
      color: [255, 255, 255, 255],
      scale: [0.6, 0.6],
      outline: false
    });
    mp.game.graphics.drawText(`Vehicle Armor - ${lastVehicle.getBodyHealth().toString()}`, [0.5, 0.05], {
      font: 0,
      centre: false,
      color: [255, 255, 255, 255],
      scale: [0.6, 0.6],
      outline: false
    });

    mp.game.graphics.drawText(`Acceleration - ${lastVehicle.getAcceleration().toString()}`, [0.5, 0.095], {
      font: 0,
      centre: false,
      color: [255, 255, 255, 255],
      scale: [0.6, 0.6],
      outline: false
    });
    mp.game.graphics.drawText(`RPM - ${lastVehicle.rpm.toString()}`, [0.5, 0.14], {
      font: 0,
      centre: false,
      color: [255, 255, 255, 255],
      scale: [0.6, 0.6],
      outline: false
    });
    mp.game.graphics.drawText(`Speed - ${lastVehicle.getSpeed().toString()}`, [0.5, 0.185], {
      font: 0,
      centre: false,
      color: [255, 255, 255, 255],
      scale: [0.6, 0.6],
      outline: false
    });
  }

});
