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
    @tracked isFriend = false;
    
    constructor(){
        super(...arguments)
        
        // let fakeUserSender = {firstName: "Jasper" , lastName:"Caballero"}
        // let fakeUserReceiver = {firstName: "George", lastName:"Chan"}

        // console.log(this.args.model)
        this.userRequester = this.args.model.username

        //Change this hardcode to wherever the user clicks on the table.
        //for now continue with fake data to send to db
        this.userReceiver = this.args.userReqReceiver
    }

    addFriendClicked(){
        //on addFriend button click, send a request to the user sending the request 
        //to the other user receiving it. For now, once we click add friend on another profile
        //automatically add that friend to the current user loggedin.
       
        
        //console.log(this.userRequester.firstName + " is sending a friend request to " + this.userReceiver.firstName)
        
        // console.log("add friend clicked, looking for this username" , this.userReceiver)
        $.get(`${ENV.APP.API_ENDPOINT}/friends/addfriend?usernameRequest=${this.userRequester}&usernameReceiver=${this.userReceiver}`).done(res => {
            console.log("What was sent back should be a bool true:" , res)
        })

        this.addFriendIsClicked = true
        //add function call here to make request to db to send a request to other user
        //also maybe update the friends list once friend added is confirmed
    }

    get currentUser(){
        if(this.args.model.username == this.args.userReqReceiver){
            return true;
        }
    }

    get currentFriend(){
        let tempArray = [];

        $.get(`${ENV.APP.API_ENDPOINT}/friends/friendlist?username=`+this.args.model.username).done(friendList => {
            tempArray = friendList.friendsWith;

            for(let i = 0; i < tempArray.length; i++){
                if(tempArray[i].username == this.args.userReqReceiver){
                    this.isFriend = true;
                }
            }
        })

        return this.isFriend;
    }
}