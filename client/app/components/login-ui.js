import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service} from "@ember/service";
import $ from 'jquery';
import ENV from 'client/config/environment';


export default class LoginUIComponent extends Component {
    @service store;
    @service router;

    constructor(owner, args){
        super(owner, args);
    }

    @tracked username;
    @tracked password;

    @action
    logIn(){
        if(this.username && this.password){
            $.post(`${ENV.APP.API_ENDPOINT}/auth/login`, ({username: this.username,password: this.password}), (result)=>{
                if(result && result.isLoggedIn){
                    localStorage.setItem('cookie',result.cookie);
                    this.router.transitionTo('/');
                }
              });

        }
    }

}
