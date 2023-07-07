import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {auth,provider} from "../firebase"
import {SET_USER} from "./actionType"

export const setUser=(payload)=>({
    type:SET_USER,
    user:payload
})

export function signInAPI(){
    return (dispatch)=>{
        signInWithPopup(auth,provider)
        .then(p=>dispatch(setUser(p.user)))
        .catch(e=>alert(e.message));
    }
}
export function signOutAPI(){
    return (dispatch)=>{
        signOut(auth)
        .then(p=>dispatch(setUser(null)))
        .catch(e=>alert(e.message));
    }
}
export function getUserAuth(){
    return (dispatch)=>{
        onAuthStateChanged(auth,async(user)=>{
            if(user){
                dispatch(setUser(user));
            }
        })
    }
}