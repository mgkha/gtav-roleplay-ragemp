const PlayerVehicleStates: [VehicleMp, boolean][] = [];

mp.events.add(RageEnums.EventKey.RENDER, () => { 
  PlayerVehicleStates.forEach(el => {
    el[0].setEngineOn(el[1], true, true);
  });
});

mp.events.add('spawn_vehicle', (vehicle: VehicleMp) => {
  setTimeout(() => {
    vehicle.setEngineHealth(400);
    vehicle.setBodyHealth(0);
  }, 1000);
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
    
    mp.game.graphics.notify('Press ~g~End ~w~button to stop engine');
    
  }, 1500);
};

export const turnOffEngine = (vehicle: VehicleMp): void => {
  if(vehicle.getSpeed() === 0) { 
    setTimeout(() => {
      const vh = PlayerVehicleStates.find(el => el[0].id == vehicle.id);
      if(!vh) { return; }
      vh[1] = false;
      
      mp.game.graphics.notify('Press ~g~Home ~w~button to start engine');
    }, 500);
  }
  else {
    mp.game.graphics.notify('You cannot stop engine while driving!');
  }
  
};
