import React from 'react'
import { styled } from 'styled-components'
import {useState} from "react"
import ReactPlayer from "react-player"
import {connect} from "react-redux"
import { postArticleAPI } from './../actions';
import { serverTimestamp } from 'firebase/firestore'

function PostModal(props) {
    const [editorText,setEditorText]=useState("");
    const [shareImage,setShareImage]=useState("");
    const [videoLink,setVideoLink]=useState("");
    const [assetArea,setAssetArea]=useState("");
    const handleChange=(e)=>{
        const image=e.target.files[0];
        //console.log(image);
        if(image==='' || image===undefined)
        {
            alert('Please select an image.');
            setShareImage("");
        }
        else
            setShareImage(image);
    }
    const inputHandle=(e)=>{
        setEditorText(e.currentTarget.value);
        //console.log(e.currentTarget);
    }
    const switchAssetArea=(area)=>{
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    }
    const reset=()=>{
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
    }
    const postArticle=(e)=>{
        e.preventDefault();
        if(e.target!==e.currentTarget){return;}
        const payload={
            image:shareImage,
            video:videoLink,
            user:props.user,
            description:editorText,
            timestamp:serverTimestamp(),
        }
        props.postArticle(payload);
        reset();
    }
  return (
    <Container>
        <Wrapper onClick={props.handleModal}/>
        <Content>
            <Header>
                <UserInfo>
                    {props.user.photoURL
                    ?<img src={props.user.photoURL}/>
                    :<img src="/images/user.svg"/>}
                    <span>{props.user.displayName?props.user.displayName:'Me'}</span>
                </UserInfo>
                <button onClick={props.handleModal}>
                    <img src="/images/close-icon.svg" alt=""/>
                </button>
            </Header>
            <SharedContent>
               <textarea value={editorText} onInput={inputHandle} placeholder="What do you want to talk about?"/>
               {assetArea=="image" &&
                    <UploadImage>
                        <input type="file" 
                        accept="image/gif, image/jpeg, image/png"
                        name="image"
                        id="file"
                        onInput={handleChange}
                        />
                    {shareImage && <img src={URL.createObjectURL(shareImage)} />}
                    </UploadImage>
                }
                {assetArea==="video" &&
                    <UploadVideo>
                        <input
                        type="text"
                        placeholder="Please type a video link"
                        value={videoLink}
                        id="video"
                        onInput={e=>setVideoLink(e.target.value)}
                        />
                        {
                            videoLink && <ReactPlayer width={"100%"} url={videoLink} />
                        }
                    </UploadVideo>
                }
            </SharedContent>
            <ShareCreation>
                <AttachAssets>
                    <AssetButton onClick={()=>switchAssetArea("image")} htmlFor="file" text="Add a photo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="image-medium" data-supported-dps="24x24" fill="rgba(0,0,0,0.5)" width="24" height="24" focusable="false">
                    <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                    </svg>
                    </AssetButton>
                    <AssetButton onClick={()=>{switchAssetArea("video")}} text="Add a video">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="video-medium" data-supported-dps="24x24" fill="rgba(0,0,0,0.5)" width="24" height="24" focusable="false">
                    <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"></path>
                    </svg>
                    </AssetButton>
                </AttachAssets>
                </ShareCreation>
                <Footer>
                    <PostButton onClick={e=>postArticle(e)} enabled={editorText ? true:false}>
                        Post
                    </PostButton>
                </Footer>
        </Content>
    </Container>
  )
}
const Container=styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:9999;
    color:black;
`;
const Wrapper=styled.div`
    position:fixed;
    height:100%;
    width:100%;
    background-color:rgba(0,0,0,0.8);

`;
const Content=styled.div`
    width:100%;
    max-width:552px;
    max-height:90%;
    background-color:white;
    overflow:initial;
    border-radius:5px;
    position:relative;
    display:flex;
    flex-direction:column;
    top:32px;
    margin:0 auto;

`;
const Header=styled.div`
    display:block;
    padding:16px 20px;
    font-size:16px;
    line-height:1.5;
    font-weight:400;
    display:flex;
    justify-content:space-between;
    align-items:center;
    button{
        height:40px;
        width:40px;
        min-width:auto;
        background-color:transparent;
        border:none;
        outline:none;
        border-radius:50%;
        &:hover{
            background-color:rgba(0,0,0,0.08);
        }
    }
`;
const SharedContent=styled.div`
    display:flex;
    flex-direction:column;
    flex-grow:1;
    vertical-align:baseline;
    background:transparent;
    padding:8px 0;
    height:60vh;
    overflow-y:scroll;
   textarea{
    padding:0px 10px;
    border:none;
    outline:none;
    height:80vh;
    min-height:300px;
    resize:none;
    overflow-y:scroll;
    font-size:20px;
    font-weight:400;
    color:rgba(0,0,0,0.8);
    &::placeholder{
    color:rgba(0,0,0,0.4);
    }
   }
`;
const UserInfo=styled.div`
    display:flex;
    align-items:center;
    padding:12px 24px;
    svg,img{
        width:48px;
        height:48px;
        background-clip:content-box;
        border:2px solid transparent;
        border-radius:50%;

    }
    span{
        font-weight:600;
        font-size:16px;
        line-height:1.5;
        margin-left:5px;
    }
`;
const ShareCreation=styled.div`
    display:flex;
    justify-content:space-between;
    padding:12px 24px 12px 16px;

`;
const AssetButton=styled.label`
    box-sizing:border-box;
    background:rgba(0,0,0,0.08);
    display:flex;
    align-items:center;
    justify-content:center;
    height:60px;
    width:60px;
    min-width:auto;
    color:rgba(0,0,0,0.5);
    border:none;
    padding:5px;
    border-radius:50%;
    margin-right:16px;
    position:relative;
    display:flex;
    &:after{
        position:absolute;
        top:-45px;
        display:flex;
        align-items:center;
        justify-content:center;
        content:${p =>"'"+p.text+"'"};
        max-width:calc(100vw - 40px);
        white-space: nowrap;
        padding:6px 12px;
        font-weight:400;
        font-size:12px;
        line-height:1.5;
        height:20px;
        color:rgba(0,0,0,0.9);
        border-radius:6px;
        border:none;
        background-color:white;
        transition: box-shadow 83ms;
        display:none;
        transition:box-shadow 83ms;
    }
    &:hover{
        box-shadow: 0px 2px 3px 1px rgba(0,0,0,0.3);
        &:after{
            display:flex;
            animation:0.2s fade-in;
            box-shadow: 0 2px 3px 1px rgba(0,0,0,0.15), 0 6px 9px rgba(0,0,0,0.3);
            @keyframes fade-in{
                from{
                    opacity:0.5;
                    top:-50px;
                }
                to{
                    opacity:1;
                    top:-45px;

                }
            }
        }
    }
`;
const AttachAssets=styled.div`
    display:flex;
    align-items:center;
    padding-right:8px;
  
`;
const Footer=styled.div`
    border-top:1px solid rgba(0,0,0,0.15);
    height:50px;
    display:flex;
    justify-content:end;
    padding-right:24px;
    
`;
const PostButton=styled.button`
    background-color:${p => p.enabled?'#0a66c2':'rgba(0,0,0,0.08)'};
    color:${p => p.enabled?'white':'rgba(0,0,0,0.3)'};
    border:none;
    outline:none;
    font-weight:600;
    font-size:15px;
    margin:8px 0;
    padding:0 24px;
    border-radius:40px;
    min-height:30px;
    &:hover{
    background-color:${p => p.enabled?'#004182':'rgba(0,0,0,0.08)'};
    }
`;
const UploadImage=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    input[type=file]{
        display:none;
    }
    img{
        max-width:75%;
        margin-top:10px;
    }
`;
const UploadVideo=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    input[type=text]{
        padding:7px 3px;
        width:80%;
    }
`;

const mapStateToProps = (state) => {
    return {
      user:state.userState.user,
    };
  };
const mapDispatchToProps = (dispatch) => ({
        postArticle:(payload)=>dispatch(postArticleAPI(payload)),
  });

export default connect(mapStateToProps,mapDispatchToProps)(PostModal)