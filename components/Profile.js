import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import user from "../assets/avatar2.png";
import { AuthContext } from "../context/auth";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase";
import Post from "./post";
function Profile() {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [postIDs, setPostIDs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setUserData(doc.data());
      setPostIDs(doc.data().posts);
    });
    return () => unsub();
  }, [user]);

  console.log("profile", userData);
  console.log("post ids", postIDs);

  useEffect(() => {
    let tempArr = [];

    postIDs.map((postID) => {
      onSnapshot(doc(db, "posts", postID), (doc) => {
        tempArr.push(doc.data().postURL);
        setUserPosts([...tempArr]);
      });
    });
  }, [postIDs]);

  console.log("user posts", userPosts);
  return (
    <div>
      <Navbar userData={userData} />
      <div>
        <div className="profile-intro">
          <div
            className="img-wrapper"
            
          >
            <div className="main-img">
              <Image height={200} width={200} src={userData.profilePhoto}  style={{
              height: "8rem",
              width: "8rem",
              borderRadius: "50%",
              boxSizing: "content-box",
            }} />
            </div>
          </div>
          <div>
            <h1>{userData.fullName}</h1>
            <h1>Posts: {userData.posts?.length}</h1>
          </div>
        </div>
        <div className="profile-posts">
        
            
        
          { userPosts.map((post, idx) => (
           <video src={post} controls key={idx} />
          
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;