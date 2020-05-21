import User from "../../models/user.model";

mp.events.add('playerJoin', (player: PlayerMp) => {
    console.log('playerJoin');
    player.call('playerConnect', [{ lang: process.env.LANGUAGE }]);
});

mp.events.add('playerReady', (_player: PlayerMp) => {
    console.log('playerReady');
});

mp.events.add('playerSpawn', (player: PlayerMp) => {
    console.log(`${player.id} has spawned!`);
    
    //change naked
    player.setClothes(RageEnums.ClothesComponent.TORSO, 15, 0, 0);
    player.setClothes(RageEnums.ClothesComponent.ACCESSORIES_1, 15, 0, 0);
    player.setClothes(RageEnums.ClothesComponent.DECALS, 15, 0, 0);
    
    player.setClothes(RageEnums.ClothesComponent.LEGS, 21, 0, 0);
    player.setClothes(RageEnums.ClothesComponent.FOOT, 34, 0, 0);
});

mp.events.add('playerDeath', (player: PlayerMp) => {
    player.spawn(player.position);
    player.health = 100;
});

mp.events.add('register', async (player: PlayerMp, name, email, password, inviteCode) => {
    if(inviteCode != 'mmroleplay') { 
        player.call('clientAuthHandler', ['register_wrong_invite_code']);
        return;
    }
    try {
        let user = new User();
        user.name = name;
        user.gender = true;
        user.email = email;
        user.password = password;
        await user.save()
        player.call('clientAuthHandler', ['register_success']);
    }
    catch(err) {
        console.log(err.errmsg);
        if (err.errmsg.includes('duplicate key') ) {
            player.call('clientAuthHandler', ['register_duplicated_email']);
        }
        else {
            player.call('clientAuthHandler', ['register_unknown_error']);
        }
    }
});

mp.events.add('login', async (player: PlayerMp, email, password) => {
    try { 
        let user = await User.findOne({ email });
        if(user && user.comparePassword(password)) {
            player.call('clientAuthHandler', ['login_success']);
        }
        else {
            player.call('clientAuthHandler', ['login_failed']);
        }
    }
    catch(err) {
        console.log(err);
        player.call('clientAuthHandler', ['login_unknown_error']);
    }
})