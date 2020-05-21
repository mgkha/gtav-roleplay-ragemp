mp.events.addCommand('goto', (player: PlayerMp, _text: string, ...location: string[]) => {
  player.position = new mp.Vector3(Number(location[0]), Number(location[1]), Number(location[2]));
});

mp.events.addCommand('kill', (player: PlayerMp) => {
  player.health = 0;
});
