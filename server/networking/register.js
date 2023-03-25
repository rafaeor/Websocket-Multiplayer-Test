import * as database from '../networking/database.js';

export let USERS = {
};

export let isValidPassword = function(data){
    let username = data.username;
    let password = data.password;
    //database.find("mygame","progress",{username:"bob"}).catch(console.dir);
    let expected = database.find("mygame","account",{username,password});
    if(expected.username==data.username&&expected.password==data.password){
        return true
    }
    else{
        return false
    }
}

export let isUsernameTaken = function(data,cb){
    let username = data.username;
    //database.find("mygame","progress",{username:"bob"}).catch(console.dir);
    let expected = database.find("mygame","account",{username,password});
    if(expected.username==data.username){
        return true
    }
    else{
        return false
    }
}
export let addUser = function(data){
    let username = data.username;
    let password = data.password;
    database.account.insert("mygame","account",{username,password});
}

export default {addUser,isUsernameTaken,isValidPassword}