import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth';
import Navbar from './Navbar'
import Upload from './Upload'
import { db } from '../firebase'
import Post from './Post' ;

export default function Feed() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setUserData(doc.data());
    });

    return () => unsub(); //works like component will unmount -> So When u r unmounting then Unsubscribe to the api calls
  }, [user]);
  // console.log(user)
  //get posts from db -> works as CDM
  useEffect(() => {
    const getData = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (doc) => {
        let tempArray = [];
        doc.docs.map((userData) => tempArray.push(userData.data()));
        setPosts([...tempArray]);
      }
    );

    return () => getData();
  }, []);

  //video Intersection Observer
  const callback = (entries) => {
    entries.forEach((entry) => {
      let ele = entry.target.childNodes[0];

      //play the video by default
      ele.play().then(() => {
        if (!ele.paused && !entry.isIntersecting) {
          //if ele -> (video) is not paused and if and if it is not intersecting -> then pause it
          ele.pause();
        }
      });
    });
  };

  const options = {
    threshold: 0.6,
  };

  let observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    const elements = document.querySelectorAll(".videos-container");
    let postContainer = elements[0].childNodes;
    postContainer.forEach((videoEle) => {
      observer.observe(videoEle);
    });

    return () => {
      observer.disconnect();
    };
  }, [posts]);

  return (
    <div className="feed-container">
      <Navbar userData={userData} />
      <Upload userData={userData} />
      <div className="videos-container">
        {posts.map((post, idx) => (
           
          <Post postData={post} userData={userData} key={idx} />
        ))}
      </div>
    </div>
  );
}