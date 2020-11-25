import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import {action} from '@ember/object';
import $ from 'jquery';
import ENV from 'client/config/environment';

export default class BetsUserCreatedComponent extends Component {
    constructor(){
        super(...arguments);
        this.betsCreated = [];
        this.username = this.args.username;
        this.findBetsCreated();
    }

    @tracked betsCreated = [];
    @tracked username = null;
    
    findBetsCreated(){
        $.get(`${ENV.APP.API_ENDPOINT}/profile/getUsersBets?username=`+this.username).done(betsUserCreatedList => {
            this.betsCreated = betsUserCreatedList;
        })
    }

    @action
    redirectToIndiv(id){
        this.args.betInfoHandler(id);
        this.args.changePage('createbet');
    }


    get notEmptyArray(){
        if(this.betsCreated.length == 0)
            return false;
        else
            return true;
    }
}
