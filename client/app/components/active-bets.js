import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import $ from 'jquery';
import ENV from 'client/config/environment';
import {action} from '@ember/object';


export default class IndividualBetComponent extends Component {

@tracked betList = [];

constructor(){
    super(...arguments)
    this.requestAllBetData();
}

requestAllBetData(){
    $.get(`${ENV.APP.API_ENDPOINT}/bets/requestalldata`).done(data => { 
        this.betList = data;
    });
}

@action
redirectToIndiv(id){
    this.args.betJoin(id);
    this.args.changePage('createbet');
}


}
