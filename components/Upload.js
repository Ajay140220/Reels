import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import LinearProgress from "@mui/material/LinearProgress";
import { v4 as uuidv4} from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {storage , db} from '../Firebase';
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
export default function Upload({ userData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const fileLimit = 50;
  // console.log("doc", userData);
  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file == null) {
      setError("File Not Selected");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (file.size / (1024 * 1024) > fileLimit) {
      setError(
        `File too large, Please try uploading a file less than ${fileLimit} MB`
      );
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    let uid = uuidv4();
    setLoading(true);

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "video/mp4",
    };

    // Upload file and metadata to the object 'uid/post'
    console.log(uid);
    const storageRef = ref(storage, `${userData.uid}/post/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + prog + "% done");
        setProgress(prog);
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        setError(error.code);
        setTimeout(() => {
          setError("");
        }, 2000);
        return;
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          console.log("doc", userData);
          let postData = {
            likes: [],
            postId: uid,
            postURL: downloadURL,
            profileName: userData.fullName,
            profilePhotoURL: userData.profilePhoto,
            userID: userData.uid,
            comments:[],
            timestamp: serverTimestamp(),
          };

          await setDoc(doc(db, "posts", uid), postData);

          await updateDoc(doc(db, "users", userData.uid), {
            posts: arrayUnion(uid),
          });
        });
      }
    );
  };

  return (
    <div style={{ marginTop: ".5rem" }}>
      <Button
        variant="outlined"
        component="label"
        size="large"
        sx={{ mt: ".5rem", mb: ".5rem" }}
        color="secondary"
      >
        <MovieIcon /> Upload Media
        <input
          hidden
          accept="video/*"
          multiple
          type="file"
          onChange={handleUpload}
        />
      </Button>
      {loading && (
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={progress}
          sx={{ mt: "0.5rem", mb: "0.5rem" }}
        />
      )}
    </div>
  );
}