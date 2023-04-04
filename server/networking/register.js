import * as database from '../networking/database.js';

export let USERS = {
};

export async function isValidPassword(data){
    let username = data.username;//username: data.username
    let password = data.password;

    database.find("mygame","account",{username,password}).then((res)=>{
        console.log(res);
        let expected = res;
        if(expected){
            if(expected.username==data.username&&expected.password==data.password){
                console.log("returned true");
                return true;
            }
            else{
                console.log("returned false");
                return false;
            }
        }
        else{
            console.log("returned false");
            return false;
        }
    })
}

export let isUsernameTaken = function(data){
    let username = data.username;
    let expected = database.find("mygame","account",{username});
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
    database.insert("mygame","account",{username,password});
}

export default {addUser,isUsernameTaken,isValidPassword}