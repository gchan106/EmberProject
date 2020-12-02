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
redirectToIndiv(id){ //this gets the id of the bet to load a detailed page of that betID
    this.args.betJoin(id);// goes to main app hbs to call these functions using cookie
    this.args.changePage('createbet');
}


}
