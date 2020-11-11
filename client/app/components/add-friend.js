import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'


export default class AddFriendComponent extends Component {

    //current user that is loggedIn
    @tracked userRequester

    //profile that we are currently looking at with the addFriend button
    @tracked userReceiver
    @tracked addFriendIsClicked = false

    
    constructor(){
        super(...arguments)
        
        let fakeUserSender = {firstName: "Jasper" , lastName:"Caballero"}
        let fakeUserReceiver = {firstName: "George", lastName:"Chan"}

        this.userRequester = fakeUserSender
        this.userReceiver = fakeUserReceiver
    }

    addFriendClicked(){
        //on addFriend button click, send a request to the user sending the request 
        //to the other user receiving it. (Do I show that the request is pending? 
        //Or assume that the other user is automatically added as a friend?)
        console.log(this.userRequester.firstName + " is sending a friend request to " + this.userReceiver.firstName)

        this.addFriendIsClicked = true
        //add function call here to make request to db to send a request to other user
        //also maybe update the friends list once friend added is confirmed
    }




}