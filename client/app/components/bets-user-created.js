import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import {action} from '@ember/object';
import $ from 'jquery';
import ENV from 'client/config/environment';

export default class BetsUserCreatedComponent extends Component {
    constructor(){
        super(...arguments);
        this.betsCreated = [];
        this.cookie = this.args.model.cookie;
        this.findBetsCreated();
    }

    @tracked betsCreated = [];
    @tracked cookie = null;
    
    findBetsCreated(){
        $.get(`${ENV.APP.API_ENDPOINT}/profile/getUsersBets?userCookie=`+this.cookie).done(betsUserCreatedList => {
            this.betsCreated = betsUserCreatedList;
        });
    }

    // get getTime(betInstance){
    //     return betInstance.betData.betParticipants[0].userData.userData;
    // }

    @action
    redirectToIndiv(id){
        this.args.betInfoHandler(id);
        this.args.changePage('createbet', 'false');
    }


    get notEmptyArray(){
        if(this.betsCreated.length == 0)
            return false;
        else
            return true;
    }
}
