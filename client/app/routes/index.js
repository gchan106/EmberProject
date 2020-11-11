import Route from '@ember/routing/route';
import $ from 'jquery';
import ENV from 'client/config/environment';

const FAKE_COOKIES = 123123123
export default class IndexRoute extends Route {
    model() {
        return $.get(`${ENV.APP.API_ENDPOINT}/auth/isloggedin?cookie=${FAKE_COOKIES}`);
    }

    afterModel(model, transition) {
        if (!model) {
          this.transitionTo('login');
        }
      }
}
