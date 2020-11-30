import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import { inject as service }from '@ember/service';
import $ from 'jquery';
import ENV from 'client/config/environment';

export default class SignupComponent extends Component {
    @tracked userName = null;
    @tracked userPass = null;
    @service router;
    @tracked message = null;
    @tracked status = false;

    constructor(){
        super(...arguments);
        this.hideAlert();
    }
    
    checkInfo(){
        if(this.userName && this.userPass){
            $.post(`${ENV.APP.API_ENDPOINT}/auth/signup`, ({username: this.userName,password: this.userPass}), (result)=>{
                if(result){
                    this.message = "Signed up successfully!"
                    this.status = true;
                    this.router.transitionTo('login', {queryParams: {signedup: this.status}});              
                }
                else{
                    this.message = "User already exists!"
                    this.status = true;
                    this.hideAlert();
                }
            })
        }
        else{
            this.message = "Please enter a username or password!"
            this.status = true;
            this.hideAlert();
        }
    }

    getUsername(input){
        this.userName = input.target.value;       
    }

    getUserpass(input){
        this.userPass = input.target.value;
    }

    hideAlert(){
        if(this.status == true){
            setTimeout(()=> {
                this.status = false;
                this.message = null;
            }, 3000)            
        }
    }

    dismissAlert(){
        this.status = false;
    }
}
