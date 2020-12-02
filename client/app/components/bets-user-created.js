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
    @action
    deleteBet(id){
        $.get(`${ENV.APP.API_ENDPOINT}/bets/deleteBet?betID=`+ id)
        this.findBetsCreated();


    }

    // get getTime(betInstance){
    //     return betInstance.betData.betParticipants[0].userData.userData;
    // }

    @action
    redirectToIndiv(id){ //this gets the id of the bet to load a detailed page of that betID
        this.args.betInfoHandler(id);// goes to main app hbs to call these functions using cookie
        this.args.changePage('createbet');
    }


    get notEmptyArray(){
        if(this.betsCreated.length == 0)
            return false;
        else
            return true;
    }
}
