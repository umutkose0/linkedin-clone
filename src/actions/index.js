import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {auth,provider,storage} from "../firebase"
import db from "../firebase"
import {SET_USER,SET_LOADING_STATUS,GET_ARTICLES} from "./actionType"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";

export const setUser=(payload)=>({
    type:SET_USER,
    user:payload
})
export const setLoading=(status)=>({
    type:SET_LOADING_STATUS,
    status,
})
export const getArticles=(payload)=>({
    type:GET_ARTICLES,
    payload,
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
    return async (dispatch)=>{
        dispatch(setLoading(true))
        //var storage=getStorage();
        if(payload.image!="")
        {
            const downloadURL=await uploadTaskPromise(payload.image);
            var data={
                actor:
                {
                    description:payload.user.email,
                    title:payload.user.displayName,
                    date:payload.timestamp,
                    image:payload.user.photoURL
                },
                video:"",
                shareImg:downloadURL,
                comments:0,
                description:payload.description,
            }
            const articleRef = doc(collection(db, "articles"));
            await setDoc(articleRef, data);
            //console.log("created on firebase at ",Date(Date.now()))
             dispatch(setLoading(false))
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
                dispatch(setLoading(false))

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
              dispatch(setLoading(false))

        }
    }
}
async function uploadTaskPromise(image) {
    return new Promise(function(resolve, reject) {
      const imageRef=ref(storage,`images/${String(Math.random()*10)}-${image.name}`);
      const uploadTask=uploadBytesResumable(imageRef,image);
      uploadTask.on('state_changed',
      (snapshot)=>{
          //const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          
      },
      e=>{
        console.log(e.message)
        reject();
      },
      async ()=>{
          //console.log("The file is uploaded!");
          const downloadURL=await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL)
           

      });

    })
  }
export function getArticlesAPI(){
    return async (dispatch)=>{
        dispatch(setLoading(true))
        let payload=[];
        var docRef=collection(db,"articles");
        var q=query(docRef,orderBy("actor.date","desc"));
        const snapShot=await getDocs(q);
        snapShot.forEach(a=>payload.push(a.data()));
        dispatch(getArticles(payload));
        dispatch(setLoading(false))

    }
}