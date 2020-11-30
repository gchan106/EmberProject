import { helper } from '@ember/component/helper';

function alert(args){
  if(args == 'true'){
    return 'show';
  }
  else{
    return 'hide';
  }
}

export default helper(alert);