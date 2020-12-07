import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object'
import $ from 'jquery';
import ENV from 'client/config/environment';


export default class FriendsListComponent extends Component {

    @tracked friendsListData

    constructor(){
        super(...arguments)

        //is there
        //${this.args.model.username}
        $.get(`${ENV.APP.API_ENDPOINT}/friends/friendlist?username=${this.args.model.username}`).done(friendList => {
            console.log("response from db" , friendList)
            //console.log(friendList.friendsWith)
            this.friendsListData = friendList.friendsWith

            console.log("what i set data to" , this.friendsListData)
        })
        // let fakeFriendsData = [{firstName: "Jasper", lastName: "Caballero", img: "http://placekitten.com/200/300"} , {firstName: "Daniel", lastName: "Dolan", img:"http://placekitten.com/300/300"}, {firstName: "Victoria", lastName: "Fischer", img: "http://placekitten.com/201/300"}]
        // this.friendsListData = fakeFriendsData

       
    }

    @action 
    deleteFriend(name){
        let username = this.args.model.username;

        console.log(name)
        console.log(username)
        $.get(`${ENV.APP.API_ENDPOINT}/friends/deleteFriend?username=`+username+`&name=`+name).done(updatedFriendsList=> { 
                this.friendsListData = updatedFriendsList;
        });
    }
}