import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import $ from 'jquery';
import ENV from 'client/config/environment';


export default class IndividualBetComponent extends Component {

@tracked currentTime;

@tracked betResolution = true;
@tracked isAdmin = true;
@tracked displayCreateBet;
@tracked nameList = [];
@tracked individualBet = {}
@tracked betAgainst = null;
@tracked userIdNum;
@tracked userData;
@tracked currentBetID; //depends on which bet you join get the ID of the bet

@tracked currentBetTitleValue;
@tracked currentBetAmountValue;
@tracked currentDescriptionValue;
    



constructor(){
    super(...arguments)
    this.currentBetID = '' ; 
    this.userIdNum = localStorage.getItem('cookie');
    this.requestUserData(); // when you are at this page you need to get the current user to create a bet and join
<<<<<<< HEAD
    //this.getTimeAndDate();
    //console.log(this.userIdNum);
=======
    console.log(this.userIdNum);
>>>>>>> 930b42be... updated home, ui, added delete

}

get getDisplay(){
    this.displayCreateBet = this.args.displayCreateBet;
    if(!this.displayCreateBet){
        this.requestData(this.args.betId);
        console.log(this.args.betId)
    }
    return this.displayCreateBet;
}

get checkAdmin(){
    this.isAdmin = this.args.isAdmin;
    console.log(this.isAdmin)
    return this.isAdmin;
    
}

getTimeAndDate(){
    var hour = null;
    var min = null;
    var sec = null;
    var day = null;
    var month = null;
    var year = null;
    var amPM = 'AM';

    var t = new Date();
    month = t.getMonth() + 1;
    day = t.getDate();
    year = t.getFullYear();

    hour = t.getHours();
    if(hour > 12){ // Get 12 Hour clock
        hour = hour - 12;
        amPM = 'PM';
    }
    if(hour == 0){
        hour = 12;
        amPM = 'AM'
    }
    
    min = t.getMinutes();
    if(min < 10){ // 0 infront of minutes if less than 10
        min = "0" + min;
    }
    sec = t.getSeconds();
    if(sec < 10){ // 0 infront of seconds if less than 10
        sec = "0" + sec;
    }
<<<<<<< HEAD
this.currentTime = '' + month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec + ' ' + amPM
//console.log(this.currentTime)

}


loadSampleData(){

    this.individualBet = {

        //betID: '001',
        betData: {             
            betTitle: 'Jerry wont Fail',
            betAmount: 20,
            betAdmin: 'Rick',
            isAdmin: true, 
            betResolution: false,
            displayCreateBet: false,
            betDetail: 'Jerry will fail to impress Rick',
            betParticipants:[],

        }
    }
    this.individualBet.betData.betParticipants.pushObject({userID:'101',userData:{userName: 'Rick', userTime: '1:00', betSide: false, }})
    this.individualBet.betData.betParticipants.pushObject({userID:'102',userData:{userName: 'Morty', userTime: '2:00', betSide: true, }})
    this.individualBet.betData.betParticipants.pushObject({userID:'103',userData:{userName: 'Beth', userTime: '3:00', betSide: false, }}) 
    this.individualBet.betData.betParticipants.pushObject({userID:'104',userData:{userName: 'Jerry', userTime: '4:00', betSide: true, }})
    this.individualBet.betData.betParticipants.pushObject({userID:'105',userData:{userName: 'Summer', userTime: '5:00', betSide: false, }})
    this.nameList = this.individualBet.betData.betParticipants;
    //console.log(this.nameList)
    //console.log(this.individualBet.betData.betParticipants.length)
    this.createData();
}

createBet(title, amount, detail){
=======
    this.currentTime = '' + month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec + ' ' + amPM
    console.log(this.currentTime)
}

createBet(title, amount, detail){// theres no create problems in creatiion but only reading fix it.
>>>>>>> 930b42be... updated home, ui, added delete
    this.currentTime = new Date();
    this.individualBet = {
        betData: {             
            betTitle: title,
            betAmount: amount,
            betAdmin: this.userData[0].username, // should be a unique key as identifier it is currently the cookie
            betResolution: false,
            betDetail: detail,
            betParticipants:[],
        }
    }
    this.getTimeAndDate()
    this.individualBet.betData.betParticipants.pushObject({userID:this.userIdNum,userData:{userName: this.userData[0].username, userTime: this.currentTime, betSide: this.betAgainst, }})
    //this.nameList = this.individualBet.betData.betParticipants;
    this.displayCreateBet = false;
    this.createData();
}

joinBet(){

    //console.log(this.userData)
    this.getTimeAndDate()
    this.individualBet.betData.betParticipants.pushObject({
        userID: this.userIdNum, // users unique ID to be logged
        userData:{
            userName: this.userData[0].username, // use the ID to retrieve the name
            userTime: this.currentTime,
            betSide: this.betAgainst, 
        }
    })
<<<<<<< HEAD
    //console.log(this.individualBet.betData.betParticipants)
=======
    console.log(this.individualBet.betData.betParticipants)
    console.log(this.betAgainst)
>>>>>>> 930b42be... updated home, ui, added delete
    this.updateData();
}
resolveBet(){
    this.individualBet.betData.betResolution = true
}
inputBetTitleValue(input){
    this.currentBetTitleValue  = input.target.value;    
}
inputBetAmountValue(input){
    this.currentBetAmountValue  = input.target.value;   
}
inputBetDescriptionValue(input){
    this.currentBetDescriptionValue  = input.target.value;    
}

requestData(betID){// so dan made it to request only the first which this should request all need to make and divide for both// maybe make this for user requests
    $.get(`${ENV.APP.API_ENDPOINT}/bets/requestdata?betID=`+betID).done(bets => { 
        this.individualBet = bets[0];
        for(var i = 0; i <this.individualBet.betData.betParticipants.length; i++){
        this.individualBet.betData.betParticipants[i].userData.betSide = JSON.parse(this.individualBet.betData.betParticipants[i].userData.betSide);
        }
        console.log(this.individualBet)
        console.log(this.individualBet.betData.betParticipants.length)
    });
}

requestUserData(){
    $.get(`${ENV.APP.API_ENDPOINT}/bets/requestuserdata`, {userIdNum: this.userIdNum}).done( user=> { 
    // pulls the users data using local storage 'cookie' from login
      this.userData = user;
      //console.log(this.userData)
    })
}
updateData(){
    $.get(`${ENV.APP.API_ENDPOINT}/bets/updatedata`, {
    // pulls the users data using local storage 'cookie' from login
    // bedID should already exist it should update to mongoDB
        betID: this.args.betId,
        betData: this.individualBet.betData
        }

    )}

createData(){
    this.currentBetID = Date.parse(new Date()), 
    $.get(`${ENV.APP.API_ENDPOINT}/bets/createdata`, {
    // creates a unique ID from date, pass the bet data thru query and BetID as a unique key unless you want to use object_id w/e its called
        betID: this.currentBetID, 
        betData: this.individualBet.betData,
        
        }
    )}

updateResolution(){
    //this.currentBetID;//should pull when called
    this.requestData(this.args.betId);
    console.log(this.args.betId)
    $.get(`${ENV.APP.API_ENDPOINT}/bets/updatebetresolution`, {
        betID: this.args.betId})// so when calling u need to get it from profile
}
loadFakeData() {this.displayCreateBet = false}// still useful to just click not type.

changeUser() {this.displayCreateBet = false}//delete

changeAdmin() {this.displayCreateBet = true}//delete

changeAdminUnResolvedBet(){ // delete
    this.betResolution = true;
    this.betDataEntered = true;
}

changeUserUnResolvedBet(){// delete
    this.betResolution = true;
    this.betDataEntered = false;
}

changeAdminResolvedBet(){//delete
    this.betResolution = false;
    this.updateResolution();
    this.updateData();
}


}
