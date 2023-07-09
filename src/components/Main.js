import React from 'react'
import { styled } from 'styled-components';
import PostModal from "./PostModal"
import {useState} from "react"
function Main() {
  const [showModal,setShowModal]=useState(false);
  const handleModal=()=>{
    setShowModal(!showModal);
  }
  return (
    <Container>
        <ShareBox>
        <div>
          <img src="/images/user.svg"/>
          <button onClick={()=>setShowModal(true)}>Start a post</button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.svg" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.svg" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/event-icon.svg" />
            <span>Event</span>
          </button>
          <button>
            <img src="/images/article-icon.svg" />
            <span>Write article</span>
          </button>
        </div>
        </ShareBox>
        <div>
          <Article>
            <SharedActor>
              <a>
                <img src="/images/user.svg"/>
                <div>
                  <span>Title</span>
                  <span>Info</span>
                  <span>Date</span>
                </div>
              </a>
              <button>
                <img src="/images/ellipsis.svg"/>
              </button>
            </SharedActor>
            <Description>
              desc
            </Description>
            <SharedImg>
              <a>
                <img src="https://picsum.photos/900/600" />
              </a>
            </SharedImg>	
            <SocialCounts>
              <li>
                <button>
                  <div>
                    <img src="https://static.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" />
                    <img src="https://static.licdn.com/sc/h/b1dl5jk88euc7e9ri50xy5qo8" />
                  </div>
                  <span>30</span>
                </button>
              </li>
              <li>
                <a>2 comments</a>
              </li>
            </SocialCounts>
            <SocialActions>
            <button>
              <img src="/images/like-icon.svg"/>
              <span>Like</span>
            </button>
            <button>
              <img src="/images/comments-icon.svg"/>
              <span>Comment</span>
            </button>
            <button>
              <img src="/images/share-icon.svg"/>
              <span>Share</span>
            </button>
            <button>
              <img src="/images/send-icon.svg"/>
              <span>Send</span>
            </button>
            </SocialActions>
          </Article>
        </div>
        {showModal?<PostModal handleModal={handleModal} />:""}
        
    </Container>
  )
}
const Container=styled.div`
    grid-area:main;
`;
const CommonCard=styled.div`

  text-align:center;
  overflow:hidden;
  margin-bottom:8px;
  background-color:#fff;
  border-radius:5px;
  position:relative;
  border:none;
  box-shadow:0 0 0 1px rgb(0 0 0 /15%),0 0 0 rgb(0 0 0 /20%)

`;
const ShareBox=styled(CommonCard)`
    display:flex;
    flex-direction:column;
    color:#958b7b;
    margin:0 0 8px;
    background:white;
    div{
      button{
        outline:none;
        color:rgba(0,0,0,0.6);
        font-size:14px;
        line-height:1.5;
        min-height:48px;
        background:transparent;
        border:none;
        display:flex;
        align-items:center;
        font-weight:600;
      }
      &:first-child{
        display:flex;
        align-items:center;
        padding:8px 16px 0px 16px;
        img{
          width:48px;
          border-radius:50%;
          margin-right:8px;
        }
        button{
          margin: 4px 0;
          flex-grow:1;
          border-radius:36px;
          padding-left:16px;
          border:1px solid rgba(0,0,0,0.15);
          background:white;
          text-align:left;
          transition:background 167ms cubic-bezier(.4,0,.2,1);
          &:hover{
          background:rgba(0,0,0,0.15);
          }
        }
        
      }
      &:nth-child(2){
        display:flex;
        flex-wrap:wrap;
        justify-content:space-around;
        padding-bottom:4px;
        transition:background 167ms cubic-bezier(.4,0,.2,1);
        button{
          border-radius:4px;
          padding:0 12px;
          img{
            margin:0 4px 0 -2px;
          }
          span{
            color:rgba(0,0,0,0.4);
          }
          &:hover{
            background-color:rgba(0,0,0,0.15);
            span{
            color:rgba(0,0,0,0.6);
              
            }
          }
        }
      }
    }
`;
const Article=styled(CommonCard)`
    padding:0;
    margin:0 0 8px;
    overflow:visible;
`;
const SharedActor=styled.div`
    padding-right:40px;
    flex-wrap:nowrap;
    padding:12px 16px 0;
    margin-bottom:8px;
    align-items:center;
    display:flex;
    a{
      margin-right:12px;
      flex-grow:1;
      overflow:hidden;
      display:flex;
      text-decoration:none;
      img{
        width:48px;
        height:48px;
      }
      &>div{
        display:flex;
        flex-direction:column;
        flex-grow:1;
        flex-basis:0;
        margin-left:8px;
        overflow:hidden;
        span{
          text-align:left;
          &:first-child{
            font-size:14px;
            font-weight:700;
            color:rgba(0,0,0,1);
          }
          &:nth-child(n + 1){
            font-size:12px;
            color:rgba(0,0,0,0.6);
          }
        }
      }
    }
    button{
      position:absolute;
      right:12px;
      top:0;
      background:transparent;
      border:none;
      outline:none;
    }
`;
const Description=styled.div`
    padding:0 6px;
    overflow:hidden;
    color:rgba(0,0,0,0.9);
    font-size:14px;
    text-align:left;
`;
const SharedImg=styled.div`
    margin-top:8px;
    width:100%;
    display:block;
    position:relative;
    background-color:#f9fafb;
    img{
      object-fit:contain;
      width:100%;
      height:100%;
    }
`;
const SocialCounts=styled.ul`
  line-height:1.3;
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  overflow:auto;
  margin:0 16px;
  padding:8px 0;
  border-bottom:1px solid #e9e5df;
  list-style:none;
  li{
    margin-right:5px;
    font-size:12px;
    button{
      display:flex;
      background:transparent;
      border:none;
      outline:none;
      img{
        margin:0 0 0 -8px;
      }
    }
    span,a{
      color:rgba(0,0,0,0.6);
      margin-left:2px;
    }
  }
`;
const SocialActions=styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin:0;
  min-height:40px;
  padding:4px 8px;
  button{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    width:100%;
    border:0;
    outline:none;
    background:transparent;
    border-radius:4px;
    padding:8px;
    color:rgba(0,0,0,0.6);

    &:hover{
    background:rgba(0,0,0,0.08);

    }

    @media(min-width:768px){
      span{
        margin-left:8px;
      }
    }
  }

`;
export default Main