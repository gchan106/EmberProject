import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import { inject as service }from '@ember/service';
import $ from 'jquery';
import ENV from 'client/config/environment';

export default class LoginComponent extends Component {
    @tracked userName = null;
    @tracked userPass = null;
    @tracked message = null;
    @tracked status = false;
    @service router;
    @tracked username;
    @tracked password;
    @tracked logInSuccess = true;

    constructor(){
        super(...arguments);
        this.status = this.router.currentRoute.queryParams.signedup;
        if(this.status == 'true'){
            this.status = true;
            this.message = "Signed up Sucessfully!"
        }
        this.hideAlert();
    }

    checkInfo(){
        if(this.userName && this.userPass){
            $.post(`${ENV.APP.API_ENDPOINT}/auth/login`, ({username: this.userName,password: this.userPass}), (result)=>{
                if(result && result.isLoggedIn){
                    localStorage.setItem('cookie',result.cookie);
                    this.router.transitionTo('/');
                }
                else{
                    this.message = "Wrong username or password!"
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
            
    logIn(){
        if(this.username && this.password){
            $.post(`${ENV.APP.API_ENDPOINT}/auth/login`, ({username: this.username,password: this.password}), (result)=>{
                if(result && result.isLoggedIn){
                    localStorage.setItem('cookie',result.cookie);
                    this.router.transitionTo('/');
                    this.logInSuccess = true;

                }
                else{
                    this.message = "Wrong username or password!"
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

            //     else
            //     {
            //         this.logInSuccess = false;
            //     }
            //   });
             
        }
        

    

    dismissAlert(){
        this.status = false;
    }
}
