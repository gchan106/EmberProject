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

@tracked validAmount = true
@tracked betAgainst = null;
@tracked userIdNum;
@tracked userData;
@tracked currentBetID;

@tracked currentBetTitleValue;
@tracked currentBetAmountValue;
@tracked currentDescriptionValue;
    



constructor(){
    super(...arguments)
    this.currentBetID = '' ; 
    this.userIdNum = localStorage.getItem('cookie');
    this.requestUserData();

}

get getDisplay(){
    this.displayCreateBet = this.args.displayCreateBet;
    if(!this.displayCreateBet){
        this.requestData(this.args.betId);

    }
    return this.displayCreateBet;
}

get checkAdmin(){
    this.isAdmin = JSON.parse(this.args.isAdmin);
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
    if(hour > 12){
        hour = hour - 12;
        amPM = 'PM';
    }
    if(hour == 0){
        hour = 12;
        amPM = 'AM'
    }
    
    min = t.getMinutes();
    if(min < 10){ 
        min = "0" + min;
    }
    sec = t.getSeconds();
    if(sec < 10){ 
        sec = "0" + sec;
    }
    this.currentTime = '' + month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec + ' ' + amPM
}

createBet(title, amount, detail){

    
    if (title==null)
    {
        alert("The bet is missing a title try again");
    }
    else if (amount==null)
    {
        alert("The bet is missing an amount try again!!");
    }

    else if (detail==null)
    {
        alert("The bet is missing a description try again!!");
    }
    
    else{
    this.currentTime = new Date();
    this.individualBet = {
        betData: {             
            betTitle: title,
            betAmount: amount,
            betAdmin: this.userData[0].username,
            betResolution: false,
            betDetail: detail,
            betParticipants:[]
        }
    }
    this.getTimeAndDate()
    this.individualBet.betData.betParticipants.pushObject({userID:this.userIdNum,userData:{userName: this.userData[0].username, userTime: this.currentTime, betSide: this.betAgainst, }})
    this.displayCreateBet = false;
    this.createData();
    alert("The bet Has been successfully created");
}
}

joinBet(){

    console.log(this.userData)
    this.getTimeAndDate()
    this.individualBet.betData.betParticipants.pushObject({
        userID: this.userIdNum, 
        userData:{
            userName: this.userData[0].username, 
            userTime: this.currentTime,
            betSide: this.betAgainst, 
        }
    })
    
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

requestData(betID){
    $.get(`${ENV.APP.API_ENDPOINT}/bets/requestdata?betID=`+betID).done(bets => { 
        this.individualBet = bets[0];
        for(var i = 0; i <this.individualBet.betData.betParticipants.length; i++){
        this.individualBet.betData.betParticipants[i].userData.betSide = JSON.parse(this.individualBet.betData.betParticipants[i].userData.betSide);
        }
    });
}

requestUserData(){
    $.get(`${ENV.APP.API_ENDPOINT}/bets/requestuserdata`, {userIdNum: this.userIdNum}).done( user=> { 
      this.userData = user;
    })
}
updateData(){
    $.get(`${ENV.APP.API_ENDPOINT}/bets/updatedata`, {
        betID: this.args.betId,
        betData: this.individualBet.betData
        }

    )}

createData(){
    this.currentBetID = Date.parse(new Date()), 
    $.get(`${ENV.APP.API_ENDPOINT}/bets/createdata`, {
        betID: this.currentBetID, 
        betData: this.individualBet.betData,
        }
    )}

updateResolution(){
    this.requestData(this.args.betId);
    console.log(this.args.betId)
    $.get(`${ENV.APP.API_ENDPOINT}/bets/updatebetresolution`, {
        betID: this.args.betId})
}

changeAdminUnResolvedBet(){
    this.betResolution = true;
    this.betDataEntered = true;
}



}
