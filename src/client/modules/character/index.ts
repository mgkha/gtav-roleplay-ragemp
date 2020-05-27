const url = 'package://modules/character/form/index.html';
let characterCreationBrowser = mp.browsers.new(url);
characterCreationBrowser.active = false;


mp.events.add('characterCreator', () => {
  mp.events.add(RageEnums.EventKey.RENDER, () => {
    for (let i = 0; i <= 33; i++) {
      mp.game.controls.disableAllControlActions(i);
    }
  });

  setTimeout(() => {
    mp.players.local.setHeading(-185.0);
    mp.players.local.position = new mp.Vector3(402.8664, -996.4108, -99.00027);
    //disable player
    mp.players.local.freezePosition(true);
    mp.players.local.setAlpha(255);
    mp.players.local.clearTasksImmediately();
  
    // mp.gui.chat.activate(false);
    // mp.gui.chat.show(false);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.gui.cursor.show(true, true);
  
    let creatorCamera: CameraMp;
    creatorCamera = mp.cameras.new("creatorCamera", new mp.Vector3(402.8664, -997.5515, -98.5), new mp.Vector3(0, 0, 0), 45);
    creatorCamera.pointAtCoord(402.8664, -996.4108, -98.5);
    creatorCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
   
    characterCreationBrowser.active = true;
  }, 1);
});

mp.events.add('change', (name, value) => {
  mp.gui.chat.push(`${name} ${value}`);
  mp.events.callRemote('setCustomization', name, value);
  
});