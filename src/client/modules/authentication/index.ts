const loginUrl = 'package://modules/authentication/form/login.html';
const loginBrowser = mp.browsers.new(loginUrl);
loginBrowser.active = false;

mp.events.add('authenticate', () => {
  loginBrowser.active = true;

  setTimeout(() => {
    mp.players.local.position = new mp.Vector3(550, 800, 400);

    //disable player
    mp.players.local.freezePosition(true);
    mp.players.local.setAlpha(0);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
    mp.gui.cursor.show(true, true);
    
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
      loginBrowser.destroy();
      mp.events.call('authenticated');
      break;
    case 'register_duplicated_email':
      loginBrowser.execute('$("#alert").html("Email already exists!"); $("#alert").show(); $("#signup").prop("disabled", false); $("input[name=password]").val(""); $("input[name=password-repeat]").val("");');
      break;
    case 'register_wrong_invite_code':
      mp.gui.chat.push('Visit mmrp.jote.ml for more info.');
      loginBrowser.execute('$("#alert").html("Wrong invite code!"); $("#alert").show(); $("#signup").prop("disabled", false); $("input[name=password]").val(""); $("input[name=password-repeat]").val("");');
      break;
    case 'register_unknown_error':
      mp.gui.chat.push('Unable to register at this time!');
      mp.gui.chat.push('Visit mmrp.jote.ml for more info.');
      loginBrowser.url = loginUrl;
      loginBrowser.reload(true);
      break;

    case 'login_success':
      mp.gui.chat.push('Logged In!');
      mp.gui.chat.push('Visit mmrp.jote.ml for more info.');
      loginBrowser.destroy();
      mp.events.call('authenticated');
      break;
    case 'login_failed':
      loginBrowser.execute('$("#alert").html("Email and password doesnt match!"); $("#alert").show(); $("#login").prop("disabled", false); $("input[name=password]").val("");');
      break;
    case 'login_unknown_error':
      mp.gui.chat.push('Unable to login at this time!');
      mp.gui.chat.push('Visit mmrp.jote.ml for more info.');
      loginBrowser.url = loginUrl;
      loginBrowser.reload(true);
      break;
  }
});
