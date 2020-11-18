import Route from '@ember/routing/route';
import $ from 'jquery';
import ENV from 'client/config/environment';
import { inject as service } from '@ember/service';

const FAKE_COOKIE = 123123123;
export default class IndexRoute extends Route {
    @service store;
    
    model(params) {
      // const REAL_COOKIE = parseInt(params.cookie);
      const cookie =localStorage.getItem('cookie');
        return $.get(`${ENV.APP.API_ENDPOINT}/auth/isloggedin?cookie=${cookie}`);
    }

    afterModel(model, transition) {
        if (!model) { // if there model is empty, take us to log in route
          this.transitionTo('login');
        }
      }
}
