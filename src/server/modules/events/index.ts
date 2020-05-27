import User from '../../models/user.model';
import Character from '../../models/character.model';

mp.events.add('playerJoin', (player: PlayerMp) => {
  console.log('playerJoin');
  player.call('playerConnect', [{ lang: process.env.LANGUAGE }]);
});

mp.events.add('playerReady', (player: PlayerMp) => {
  console.log(`Player - ${player.id} is ready!`);
});

mp.events.add('playerLoggedin', async (player: PlayerMp) => {
  player.call('disablePlayer', [true]);
  
  const char = await Character.findOne({ serial: player.serial });
  if(char) {
    player.position = new mp.Vector3(char.stats.position[0], char.stats.position[1], char.stats.position[2]);
    player.setCustomization(!!char.gender, 
      char.components.shapeFirst, 
      char.components.shapeSecond, 
      char.components.shapeThird, 
      char.components.skinFirst, 
      char.components.skinSecond, 
      char.components.skinThird, 
      char.components.shapeMix, 
      char.components.skinMix, 
      char.components.thirdMix, 
      char.components.eyeColor, 
      char.components.hairColor, 
      char.components.hightlightColor, []
      );
    player.setClothes(2, char.components.hairStyle, 0, 0);

    console.log(`Player - ${player.id} has spawned!`);
    player.call('enablePlayer');
  }
  else {
    player.call('enterCharacterCreation');
  }
  //change naked
  // player.setClothes(RageEnums.ClothesComponent.TORSO, 15, 0, 0);
  // player.setClothes(RageEnums.ClothesComponent.ACCESSORIES_1, 15, 0, 0);
  // player.setClothes(RageEnums.ClothesComponent.DECALS, 15, 0, 0);

  // player.setClothes(RageEnums.ClothesComponent.LEGS, 21, 0, 0);
  // player.setClothes(RageEnums.ClothesComponent.FOOT, 34, 0, 0);

});

interface PlayerLooks {
  [key: string]: number;
}

let customizeData: PlayerLooks = {
  gender: 1,
  shapeFirst: 0,
  shapeSecond: 0,
  shapeThird: 0,
  skinFirst: 0,
  skinSecond: 0,
  skinThird: 0,
  shapeMix: 0,
  skinMix: 0,
  thirdMix: 0,
  eyeColor: 0,
  hairColor: 0,
  hightlightColor: 0,
  hairStyle: 0
}

mp.events.add('setCustomization', async (player: PlayerMp, name, value) => {
  if(name === 'save') {
    const char = new Character();
    char.serial = player.serial;
    char.socialClub = player.socialClub;
    char.name = 'name here';
    char.gender = customizeData.gender;
    char.stats = {
      position: [100,100, 80],
      hunger: 100,
      thirst: 100
    }
    char.components = {
      shapeFirst: customizeData.shapeFirst, 
      shapeSecond: customizeData.shapeSecond, 
      shapeThird: customizeData.shapeThird, 
      skinFirst: customizeData.skinFirst, 
      skinSecond: customizeData.skinSecond, 
      skinThird: customizeData.skinThird, 
      shapeMix: customizeData.shapeMix, 
      skinMix: customizeData.skinMix, 
      thirdMix: customizeData.thirdMix, 
      eyeColor: customizeData.eyeColor, 
      hairColor: customizeData.hairColor, 
      hightlightColor: customizeData.hightlightColor,
      hairStyle: customizeData.hairStyle
    };
    await char.save();
    player.position = new mp.Vector3(100, 100, 80);
    player.call('enablePlayer');
  }
  console.log(`${name} ${value}`);
  customizeData[name] = Number(value);

  player.setCustomization(!!customizeData.gender, 
    customizeData.shapeFirst, 
    customizeData.shapeSecond, 
    customizeData.shapeThird, 
    customizeData.skinFirst, 
    customizeData.skinSecond, 
    customizeData.skinThird, 
    customizeData.shapeMix, 
    customizeData.skinMix, 
    customizeData.thirdMix, 
    customizeData.eyeColor, 
    customizeData.hairColor, 
    customizeData.hightlightColor, []
    );
  player.setClothes(2, customizeData.hairStyle, 0, 0);
});

mp.events.add('playerSpawn', async (player: PlayerMp) => {
  const char = await Character.findOne({ serial: player.serial });
  if(char) {
    player.position = new mp.Vector3(char.stats.position[0], char.stats.position[1], char.stats.position[2]);
    console.log(`Player - ${player.id} has spawned!`);
  }
  else {
    player.outputChatBox('~b~Error! Cannot Spawn Character');
  }
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
    user.email = email;
    user.password = password;
    user.serial = player.serial;
    user.socialClub = player.socialClub;
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
