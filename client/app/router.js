import EmberRouter from '@ember/routing/router';
import config from 'client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('login',{path:'/'});
  this.route('home');
  // this.route('signup');
  // this.route('profile');
  // this.route('activebets');
  // this.route('createbet');
});
