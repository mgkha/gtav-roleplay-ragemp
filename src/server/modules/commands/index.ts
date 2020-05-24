mp.events.addCommand('tp', (player: PlayerMp, _text: string, ...location: string[]) => {
  player.position = new mp.Vector3(Number(location[0]), Number(location[1]), Number(location[2]));
});

mp.events.addCommand('kill', (player: PlayerMp) => {
  player.health = 0;
});

mp.events.addCommand('car', (player: PlayerMp, text: string) => {
  const vehicle = mp.vehicles.new(mp.joaat(text), new mp.Vector3(player.position.x + 1.5, player.position.y , player.position.z ));
  vehicle.numberPlate = 'EE-3784';
  player.call('spawn_vehicle', [vehicle]);
});

mp.events.addCommand('weapon', (player: PlayerMp, text: string) => {
  player.giveWeapon(mp.joaat(text), 3000);
});
