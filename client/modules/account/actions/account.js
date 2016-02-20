export default {
  register({Meteor, LocalState, FlowRouter}, {email, username, password}) {
    LocalState.set('REGISTRATION_ERROR', null);
    if (email === '' || !email) {
      LocalState.set('REGISTRATION_ERROR', 'Enter an email');
    }
    if (username === '' || !username) {
      LocalState.set('REGISTRATION_ERROR', 'Enter a username.');
    }

    function _register() {
      return new Promise((resolve, reject) => {
        Meteor.call('account.register', {email, username, password}, (err) => {
          if (err) { reject(err); }
          else { resolve('registered'); }
        });
      });
    }

    function _login() {
      return new Promise((resolve, reject) => {
        Meteor.loginWithPassword(username, password, (err) => {
          if (err) { reject(err); }
          else { resolve('logged in'); }
        });
      });
    }

    _register()
    .then(_login)
    .then(() => FlowRouter.go('/home'))
    .catch((err) => {
      console.log(err);
    });
  },

  login({Meteor, LocalState, FlowRouter}, {usernameOrEmail, password}) {
    LocalState.set('LOGIN_ERROR', null);

    Meteor.loginWithPassword(usernameOrEmail, password, (err) => {
      if (err && err.reason) { LocalState.set('LOGIN_ERROR', err.reason); }
      else { FlowRouter.go('/home'); }
    });
  },

  clearErrors({LocalState}) {
    LocalState.set('REGISTRATION_ERROR', null);
    LocalState.set('LOGIN_ERROR', null);
    return null;
  },
};
