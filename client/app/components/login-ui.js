import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service} from "@ember/service";

export default class LoginUIComponent extends Component {
    @service store;

    constructor(owner, args){
        super(owner, args);
    }

    @tracked username;
    @tracked password;


    @action
    logIn(){
        if(this.username && this.password){
            this.store.createRecord('member', {
                username: this.username,
                password: this.password
              });
        }
    }

}
