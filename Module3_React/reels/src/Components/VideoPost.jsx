import React, { useEffect, useState } from "react";
import { firebaseDB } from "../config/firebase";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  makeStyles,
  Typography,
  TextField,
  Avatar,
  Container,
} from "@material-ui/core";

const VideoPost = (props) => {
  let [user, setUser] = useState(null);
  let [comment, setComment] = useState("");
  let [commentList, setCommentList] = useState([]);
  // { comment , profilePhotoUrl }

  const addCommentToCommentList = async (e)=>{
    let profilePic;
    // when commenting user and post author user is same
    if(currentUser.uid == user.userId){
      profilePic = user.profileImageUrl;
    }
    else{
      let doc = await firebaseDB.collection("users").doc(currentUser.uid).get();
      let user = doc.data();
      profilePic = user.profileImageUrl;
    }
    let newCommentList = [...commentList , {
      profilePic: profilePic,
      comment: comment,
    }]

    // add comments in firebase
    let postObject = props.postObj;
    postObject.comments.push({ uid:currentUser.uid , comment: comment });
    // it will set a new post object with updated comments in firebase DB
    await firebaseDB.collection("posts").doc(postObject.pid).set(postObject);
    setCommentList(newCommentList);
    setComment("");
  }


  useEffect(async () => {
    console.log(props);
    let uid = props.postObj.uid;
    let doc = await firebaseDB.collection("users").doc(uid).get();
    let user = doc.data();
    let commentList = props.postObj.comments;
    // {uid , comment} , {uid , comment} , {uid , comment};
    let updatedCommentList=[];
    
    for(let i=0 ; i<commentList.length ; i++){
      let commentObj = commentList[i];
      let doc = await firebaseDB.collection("users").doc(commentObj.uid).get();
      let commentUserPic = doc.data().profileImageUrl;
      updatedCommentList.push({ profilePic: commentUserPic, comment: commentObj.comment });
    }
    
    console.log(updatedCommentList);
    setUser(user);
    setCommentList(updatedCommentList);
  }, []); //comp did Mount

  return (
    <Container>
      <Card style={{ height: "600px", width: "300px" }}>
        <Avatar src={user ? user.profileImageUrl : ""}></Avatar>
        <Typography variant="span">{user ? user.username : ""}</Typography>
        <div className="video-container">
          <Video src={props.postObj.videoLink}></Video>
        </div>
        <Typography variant="p">Comments</Typography>

        <TextField
          variant="outlined"
          label="Add a comment"
          size="small"
        ></TextField>
        <Button variant="contained" color="secondary" onClick={addCommentToCommentList}>
          Post
        </Button>

        {commentList.map((commentObj) => {
          return (
            <>
              <Avatar src={commentObj.profilePic}></Avatar>
              <Typography variant="p">{commentObj.comment}</Typography>
            </>
          );
        })}
      </Card>
    </Container>
  );
};

function Video(props) {
  const handleAutoScroll = (e) => {
    console.log(e);
    let next = ReactDOM.findDOMNode(e.target).parentNode.parentNode.parentNode
      .nextSibling;
    console.log(next);
    if (next) {
      next.scrollIntoView({ behaviour: "smooth" });
      e.target.muted = "true";
    }
  };
  return (
    <video
      style={{
        height: " 100%",
        width: "100%",
      }}
      muted={true}
      onEnded={handleAutoScroll}
      onClick={(e) => {}}
    >
      <source src={props.src} type="video/mp4"></source>
    </video>
  );
}

export default VideoPost;