import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar, Card, Typography } from "@mui/material";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import Dialog from "@mui/material/Dialog";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import DisplayComments from "./DisplayComments";
function Post({postData , userData}) {
  const[like,setLike] = useState(false);
  const[open,setOpen] = useState(false);
  
  console.log("post12",postData);
  useEffect(() => {
        if(postData.likes.includes(userData.uid)){
               setLike(true);
        }else{
               setLike(false);
        }
  },[postData])
  const handleLike = async() =>{
          if(like){
            await updateDoc(doc(db, "posts", postData.postId), {
                 likes:arrayRemove(userData.uid)
            });
          }else{
            await updateDoc(doc(db, "posts", postData.postId), {
                  likes:arrayUnion(userData.uid)
            });
          }
  }

  const handleClickOpen = () =>{
           setOpen(true);
  }
  const handleClose = () =>{
          setOpen(false);
  }
  return (
    <div className="post-container">
      <video src={postData.postURL} preload="none" />
      <div className="videos-info">
        <div className="avatar-container">
                  <Avatar alt="Remy Sharp" src={postData.profilePhotoURL} />
                  <p style={{color:"white"}}>{ postData.profileName}</p>
        </div>
        <div className="post-like" style={like ? {color:"red"}:{color:"white"}}>
          <FavoriteIcon onClick ={handleLike}/>
                  <p style={{color:"white"}}>{postData.likes.length}</p>

                  <MapsUgcOutlinedIcon
            sx={{
              fontSize: "30px",
              color: "white",
              marginTop: "7px",
              "&:hover": { color: "#BDBDBD" },
            }}
            onClick={handleClickOpen}
            //Open Dialog When Clicked on Comment Icon
          />
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="md"
          >
            <div className="modal-container">
              <div className="video-modal">
                <video src={postData.postURL} controls />
              </div>
              <div className="comments-modal">
                <Card sx={{ height: "100%" }}>
                  <div className="card-1">
                    <DisplayComments postData={postData} />
                  </div>
                  <div
                    className="card-2"
                    style={{
                      borderTop: " 1px solid #EFEFEF",
                      padding: "10px",
                    }}
                  >
                    {like == false ? (
                      <FavoriteBorderOutlinedIcon
                        color="disabled"
                        sx={{
                          fontSize: "30px",
                          color: "#222",
                          "&:hover": { color: "#BDBDBD" },
                        }}
                        onClick={handleLike}
                      />
                    ) : (
                      <FavoriteIcon
                        sx={{
                          fontSize: "30px",
                          color: "red",
                        }}
                        onClick={handleLike}
                      />
                    )}
                    <MapsUgcOutlinedIcon
                      sx={{
                        fontSize: "30px",
                        marginLeft: "5px",
                        "&:hover": { color: "#BDBDBD" },
                      }}
                    />
                    <Typography sx={{ marginBottom: "5px", fontSize: "14px" }}>
                      {postData.likes.length === 0
                        ? "Be The First One to Like This Post"
                        : `Liked By ${postData.likes.length} Users`}
                    </Typography>
                    <Comment userData={userData} postData={postData} />
                  </div>
                </Card>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
 
export default Post;