import User from '../../models/user.model';

mp.events.add('playerJoin', (player: PlayerMp) => {
  console.log('playerJoin');
  player.call('playerConnect', [{ lang: process.env.LANGUAGE }]);
});

mp.events.add('playerReady', (player: PlayerMp) => {
  console.log(`Player - ${player.id} is ready!`);
});

mp.events.add('playerLogin', (player: PlayerMp) => {
  mp.world.time.set(23, 59, 59);
  mp.world.setWeatherTransition('THUNDER');

  player.position = new mp.Vector3(100, 100, 80);
  //change naked
  player.setClothes(RageEnums.ClothesComponent.TORSO, 15, 0, 0); // eslint-disable-line
  player.setClothes(RageEnums.ClothesComponent.ACCESSORIES_1, 15, 0, 0); // eslint-disable-line
  player.setClothes(RageEnums.ClothesComponent.DECALS, 15, 0, 0); // eslint-disable-line

  player.setClothes(RageEnums.ClothesComponent.LEGS, 21, 0, 0); // eslint-disable-line
  player.setClothes(RageEnums.ClothesComponent.FOOT, 34, 0, 0); // eslint-disable-line

  setTimeout(() => {
    const car: VehicleMp = mp.vehicles.new(0xE644E480, new mp.Vector3(player.position.x + 2, player.position.y, player.position.z));
    car.numberPlate = 'EE-3784';
    console.log(`Vehicle - ${car.id} has spawned!`);
  }, 2000);
});

mp.events.add('playerSpawn', (player: PlayerMp) => {
  console.log(`Player - ${player.id} has spawned!`);
});

mp.events.add('playerDeath', (player: PlayerMp) => {
  player.spawn(player.position);
  player.health = 100;
});

mp.events.add('register', async (player: PlayerMp, name, email, password, inviteCode) => {
  if (inviteCode != 'mmroleplay') {
    player.call('clientAuthHandler', ['register_wrong_invite_code']);
    return;
  }
  try {
    const user = new User();
    user.name = name;
    user.gender = true;
    user.email = email;
    user.password = password;
    await user.save();
    player.call('clientAuthHandler', ['register_success']);
  }
  catch (err) {
    console.log(err.errmsg);
    if (err.errmsg.includes('duplicate key')) {
      player.call('clientAuthHandler', ['register_duplicated_email']);
    }
    else {
      player.call('clientAuthHandler', ['register_unknown_error']);
    }
  }
});

mp.events.add('login', async (player: PlayerMp, email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user && user.comparePassword(password)) {
      player.call('clientAuthHandler', ['login_success']);
    }
    else {
      player.call('clientAuthHandler', ['login_failed']);
    }
  }
  catch (err) {
    console.log(err);
    player.call('clientAuthHandler', ['login_unknown_error']);
  }
});

mp.events.add('console', (_player: PlayerMp, log) => {
  console.log(log);
});
