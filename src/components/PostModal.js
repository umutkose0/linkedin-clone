import React from 'react'
import { styled } from 'styled-components'
import {useState} from "react"
function PostModal({handleModal}) {
    const [editorText,setEditorText]=useState("");
    const inputHandle=(e)=>{
        setEditorText(e.currentTarget.value);
        console.log(editorText);
    }
  return (
    <Container>
        <Wrapper onClick={handleModal}/>
        <Content>
            <Header>
                <UserInfo>
                    <img src="/images/user.svg"/>
                    <span>Name</span>
                </UserInfo>
                <button onClick={handleModal}>
                    <img src="/images/close-icon.svg" alt=""/>
                </button>
            </Header>
            <SharedContent>
               <textarea value={editorText} onInput={inputHandle} placeholder="What do you want to talk about?">
               </textarea>
            </SharedContent>
            <ShareCreation>
                <AttachAssets>
                    <AssetButton>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="image-medium" data-supported-dps="24x24" fill="rgba(0,0,0,0.5)" width="24" height="24" focusable="false">
                    <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                    </svg>
                    </AssetButton>
                    <AssetButton>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="video-medium" data-supported-dps="24x24" fill="rgba(0,0,0,0.5)" width="24" height="24" focusable="false">
                    <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"></path>
                    </svg>
                    </AssetButton>
                </AttachAssets>
                </ShareCreation>
                <Footer>
                    <PostButton enabled={editorText ? true:false}>
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
    overflow-y:auto;
    vertical-align:baseline;
    background:transparent;
    padding:8px 0;
    height:60vh;
    overflow:hidden;
   textarea{
    padding:0px 10px;
    border:none;
    outline:none;
    resize:none;
    height:100%;
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
const AssetButton=styled.button`
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
    &:hover{
        box-shadow: 0px 2px 3px 1px rgba(0,0,0,0.3);
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
export default PostModal