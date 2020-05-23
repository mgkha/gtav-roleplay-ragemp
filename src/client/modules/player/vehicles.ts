import { sendHelpMessage } from 'utils/ui';

const PlayerVehicleStates: [VehicleMp, boolean][] = [];

mp.events.add(RageEnums.EventKey.RENDER, () => { // eslint-disable-line
  PlayerVehicleStates.forEach(el => {
    el[0].setEngineOn(el[1], true, true);
  });
});

export const registerVehicle = (vehicle: VehicleMp): void => {
  if(!PlayerVehicleStates.find(el => el[0].id === vehicle.id)) {
    PlayerVehicleStates.push([vehicle, false]);
  }
};

export const turnOnEngine = (vehicle: VehicleMp): void => {
  if(vehicle.getIsEngineRunning()) { return; }
  setTimeout(() => {
    const vh = PlayerVehicleStates.find(el => el[0].id == vehicle.id);
    if(!vh) { return; }
    vh[1] = true;

    sendHelpMessage('Press ~g~End ~w~button to start engine');
  }, 1500);
};

export const turnOffEngine = (vehicle: VehicleMp): void => {
  if(vehicle.getSpeed() > 0) { return; }
  setTimeout(() => {
    const vh = PlayerVehicleStates.find(el => el[0].id == vehicle.id);
    if(!vh) { return; }
    vh[1] = false;
    
    sendHelpMessage('Press ~g~Home ~w~button to stop engine');
  }, 500);
};
