mp.events.addCommand('goto', (player: PlayerMp, _text: string, ...location: string[]) => {
  player.position = new mp.Vector3(Number(location[0]), Number(location[1]), Number(location[2]));
});

mp.events.addCommand('kill', (player: PlayerMp) => {
  player.health = 0;
});

mp.events.addCommand('car', (player: PlayerMp, text: string) => {
  const car: VehicleMp = mp.vehicles.new(mp.joaat(text), new mp.Vector3(player.position.x + 1, player.position.y, player.position.z + 1));
  car.numberPlate = 'EE-3784';
});

mp.events.addCommand('weapon', (player: PlayerMp, text: string) => {
  player.giveWeapon(mp.joaat(text), 3000);
});
