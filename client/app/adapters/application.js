import DS from 'ember-data';
import ENV from 'client/config/environment';


export default DS.RESTAdapter.extend({
    //api endpoint is the localhost
    host: ENV.APP.API_ENDPOINT
});