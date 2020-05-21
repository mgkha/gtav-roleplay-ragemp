const loginUrl = 'package://modules/authentication/form/login.html';
const browser = mp.browsers.new(loginUrl);
browser.active = false;

mp.events.add('authenticate', () => {
  browser.active = true;

  setTimeout(() => {
    mp.players.local.position = new mp.Vector3(100, 100, 500);

    //disable player
    mp.players.local.freezePosition(true);
    mp.players.local.setAlpha(0);
    mp.gui.chat.activate(false);
    mp.game.ui.displayRadar(false);
    mp.gui.cursor.show(true, true);

    //unbind keys
    for (let i = 0x41; i < 0x5A; i++) {
      mp.keys.unbind(i, true);
    }
  }, 1);
});

mp.events.add('register', (name, email, password, inviteCode) => {
  mp.events.callRemote('register', name, email, password, inviteCode);
});

mp.events.add('login', (email, password) => {
  mp.events.callRemote('login', email, password);
});

mp.events.add('clientAuthHandler', (action) => {
  switch (action) {
    case 'register_success':
      mp.gui.chat.push('Registeration complete!');
      mp.gui.chat.push('Visit mmrp.jote.ml for more info.');
      browser.destroy();
      mp.events.call('authenticated');
      break;
    case 'register_duplicated_email':
      browser.execute('$("#alert").html("Email already exists!"); $("#alert").show(); $("#signup").prop("disabled", false); $("input[name=password]").val(""); $("input[name=password-repeat]").val("");');
      break;
    case 'register_wrong_invite_code':
      mp.gui.chat.push('Visit mmrp.jote.ml for more info.');
      browser.execute('$("#alert").html("Wrong invite code!"); $("#alert").show(); $("#signup").prop("disabled", false); $("input[name=password]").val(""); $("input[name=password-repeat]").val("");');
      break;
    case 'register_unknown_error':
      mp.gui.chat.push('Unable to register at this time!');
      mp.gui.chat.push('Visit mmrp.jote.ml for more info.');
      browser.url = loginUrl;
      browser.reload(true);
      break;

    case 'login_success':
      mp.gui.chat.push('Logged In!');
      mp.gui.chat.push('Visit mmrp.jote.ml for more info.');
      browser.destroy();
      mp.events.call('authenticated');
      break;
    case 'login_failed':
      browser.execute('$("#alert").html("Email and password doesnt match!"); $("#alert").show(); $("#login").prop("disabled", false); $("input[name=password]").val("");');
      break;
    case 'login_unknown_error':
      mp.gui.chat.push('Unable to login at this time!');
      mp.gui.chat.push('Visit mmrp.jote.ml for more info.');
      browser.url = loginUrl;
      browser.reload(true);
      break;
  }
});
