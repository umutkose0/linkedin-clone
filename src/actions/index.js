import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {auth,provider,storage} from "../firebase"
import db from "../firebase"
import {SET_USER} from "./actionType"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";
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
export function postArticleAPI(payload){
    return (dispatch)=>{
        //var storage=getStorage();
        if(payload.image!="")
        {
            const imageRef=ref(storage,`images/${payload.image.name}`);
            const uploadTask=uploadBytesResumable(imageRef,payload.image);
        
            uploadTask.on('state_changed',(snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            },e=>console.log(e.message),async ()=>{
                console.log("The file is uploaded!");
                const downloadURL=await getDownloadURL(uploadTask.snapshot.ref);
                
                  //upload doc
                  var data={
                    actor:
                    {
                        description:payload.user.email,
                        title:payload.user.displayName,
                        date:payload.timestamp,
                        image:payload.user.photoURL
                    },
                    video:payload.video,
                    shareImg:downloadURL,
                    comments:0,
                    description:payload.description,
                }
                  const articleRef = doc(collection(db, "articles"));
                  await setDoc(articleRef, data);
            });
        }
        else if(payload.video!="")
        {
            var data={
                actor:
                {
                    description:payload.user.email,
                    title:payload.user.displayName,
                    date:payload.timestamp,
                    image:payload.user.photoURL
                },
                video:payload.video,
                shareImg:"",
                comments:0,
                description:payload.description,
            }
              const articleRef = doc(collection(db, "articles"));
              setDoc(articleRef, data);
        }
        else{
            var data={
                actor:
                {
                    description:payload.user.email,
                    title:payload.user.displayName,
                    date:payload.timestamp,
                    image:payload.user.photoURL
                },
                video:"",
                shareImg:"",
                comments:0,
                description:payload.description,
            }
              const articleRef = doc(collection(db, "articles"));
              setDoc(articleRef, data);
        }
        
    }

}