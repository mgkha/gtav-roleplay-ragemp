import { hideHudElements } from 'utils/hud';
import { playerInteractionMenu } from 'modules/menu';

function bindKeys(): void {
  mp.keys.bind(0x42, true, function() { //B Key
    mp.players.local.freezePosition(false);
    mp.players.local.setAlpha(255);
    mp.gui.chat.activate(true);
    mp.game.ui.displayRadar(true);
    mp.gui.cursor.show(false, false);
  });
  
  mp.keys.bind(0x4D, true, function() { //M Key
    if(playerInteractionMenu.Visible) { playerInteractionMenu.Close(); } else { playerInteractionMenu.Open(); }
  });
}

mp.events.add('clientLaunched', (): void => {
  hideHudElements([1, 3]);
  mp.discord.update('GTAV Roleplay', 'A Developer');
  mp.game.vehicle.defaultEngineBehaviour = false;
  mp.gui.chat.push('Please login to enter the world!');
  mp.events.call('authenticate');
});

mp.events.add('authenticated', (): void => {
  mp.players.local.position = new mp.Vector3(100, 100, 80);
  //enable player
  mp.players.local.freezePosition(false);
  mp.players.local.setAlpha(255);
  mp.gui.chat.activate(true);
  mp.game.ui.displayRadar(true);
  mp.gui.cursor.show(false, false);

  mp.events.callRemote('playerSpawn');
  bindKeys();
});

mp.events.add('playerReady', () => {
  mp.gui.chat.push('I am Ready!');
});



mp.events.add(RageEnums.EventKey.RENDER, () => {
  const location = `${Math.round(mp.players.local.position.x)} ${Math.round(mp.players.local.position.y)} ${Math.round(mp.players.local.position.z)}`;
  mp.game.graphics.drawText(location, [0.05, 0.005], {
    font: 2,
    centre: false,
    color: [255, 255, 255, 255],
    scale: [0.8, 0.8], 
    outline: false
  });
});

