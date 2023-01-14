import { v4 as uuidv4 } from "uuid";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function Comment({userData, postData}) {
        console.log(userData, postData);
        const[comment, setComment] = useState("");
        const handleComment = async() =>{
               let uid = uuidv4();
               const obj = {
                     text:comment,
                     userDP:userData.profilePhoto,
                     userName:userData.fullName,
                     commentId:uid,
                     postId:postData.postId,
               };
               await setDoc(doc(db, "comments", uid), obj);
               //as this uid is in same scope so it will not create random values for both uid at this line and commentId -> instead both values will be same

               await updateDoc(doc(db, "posts", postData.postId),{
                       comments:arrayUnion(uid)
               });

               setComment("");
        }

  return (
    <>
      <TextField
        placeholder="Add a comment..."
        id="outlined-size-small"
        size="small"
        sx={{ width: "73%" }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        variant="outlined"
        size="medium"
        sx={{ width: "25%", height: "40px", marginLeft: "2px" }}
        onClick={handleComment}
      >
        Post
      </Button>
    </>
  );
}
