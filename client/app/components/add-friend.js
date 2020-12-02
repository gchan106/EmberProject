import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'
import $ from 'jquery';
import ENV from 'client/config/environment';


export default class AddFriendComponent extends Component {

    //current user that is loggedIn
    @tracked userRequester

    //profile that we are currently looking at with the addFriend button
    @tracked userReceiver
    @tracked addFriendIsClicked = false
    @tracked addFriendSuccess = false

    
    constructor(){
        super(...arguments)
        
        // let fakeUserSender = {firstName: "Jasper" , lastName:"Caballero"}
        // let fakeUserReceiver = {firstName: "George", lastName:"Chan"}

        this.userRequester = this.args.model.username

        //userReceiver TBD how to go through other users' profiles
        //for now continue with fake data to send to db
        this.userReceiver = "Victoria"
    }

    addFriendClicked(){
        //on addFriend button click, send a request to the user sending the request 
        //to the other user receiving it. For now, once we click add friend on another profile
        //automatically add that friend to the current user loggedin.
        //how do I traverse through other users' profiles to click this button? Right now its rendered automatically.
        //created sample new user in db Victoria, will erase when committing
        
        //console.log(this.userRequester.firstName + " is sending a friend request to " + this.userReceiver.firstName)
        
        $.get(`${ENV.APP.API_ENDPOINT}/friends/addfriend?usernameRequest=${this.userRequester}&usernameReceiver=${this.userReceiver}`).done(res => {
            console.log("What was sent back should be a bool true:" , res)
        })

        this.addFriendIsClicked = true
        //add function call here to make request to db to send a request to other user
        //also maybe update the friends list once friend added is confirmed
    }




}