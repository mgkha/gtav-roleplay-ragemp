import { playerInteractionMenu } from 'modules/menu';
import { turnOnEngine, turnOffEngine } from 'modules/player/vehicles';

const registeredKeys: number[] = [];

// @ts-ignore
let chatOpen = false;

const registerKeyBinding = (keyCode: number, handler: Function, keyHold = true): void => {
  registeredKeys.push(keyCode);
  mp.keys.bind(keyCode, keyHold, handler);
};

const unBindRegisteredKeys = (): void => {
  //unbind keys,
  for (let i = 0; i < registeredKeys.length ; i++) {
    mp.keys.unbind(registeredKeys[i], true);
  }
  registeredKeys.length = 0;
};

const bindRegisteredKeys = (): void => {
  registerKeyBinding(KeyCode.Home, function () {  
    mp.players.local.vehicle && turnOnEngine(mp.players.local.vehicle);
  });
  
  registerKeyBinding(KeyCode.End, function () {
    mp.players.local.vehicle && turnOffEngine(mp.players.local.vehicle);
  });

  registerKeyBinding(KeyCode.M, function () {
    if (playerInteractionMenu.Visible) { playerInteractionMenu.Close(); } else { playerInteractionMenu.Open(); }
  });

  registerKeyBinding(KeyCode.N, function () {
    //spawn vehicle from server
    mp.events.callRemote('spawn_vehicle');
  });

  // registerKeyBinding(KeyCode.LeftArrow, function () {
  //   mp.events.callRemote('change_prev_ped');
  // });

  // registerKeyBinding(KeyCode.RightArrow, function () {
  //   mp.events.callRemote('change_next_ped');
  // });
  
  registerKeyBinding(KeyCode.T, function () { 
    chatOpen = true;
    unBindRegisteredKeys();
  });

};

mp.keys.bind(KeyCode.Enter, true, function () {
  if(chatOpen) {
    bindRegisteredKeys();
  }
  chatOpen = false;
});

export const BindAllKeys = (): void => {
  bindRegisteredKeys();
};

export const unBindAllKeys = (): void => {
  unBindRegisteredKeys();
};