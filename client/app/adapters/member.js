import RESTAdapter from '@ember-data/adapter/rest';
import ENV from 'client/config/environment';

export default class LoginAdapter extends RESTAdapter {
    host = ENV.APP.API_ENDPOINT;

}

