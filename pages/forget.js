import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/Instagram.jpeg";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
 
import { Carousel } from "react-responsive-carousel";
import bg1 from "../assets/bg1.jpeg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import bg4 from "../assets/bg4.jpg";
import bg5 from "../assets/bg5.jpg";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";
import Link from "next/link";
 
function index() {
   const[email,Setemail] = useState("");
   
   const[error,Seterror]  = useState("");
   const[loading,Setloading] = useState(false);
   
   const { forgetPassword, user } = useContext(AuthContext);

   const router = useRouter();
   useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
   
   let Handleclick = async()=>{
        try{ 
             console.log(email);
             Setloading(true);
             Seterror('');
             await forgetPassword(email);
             console.log("email sent");
             router.push('/login')
        }
        catch(err){
          console.log("err", JSON.stringify(err));
          Seterror(err.code);
          setTimeout(() => {
            Seterror("");
          }, 2000);
        }
        Setloading(false);
   }
    return (
      <div className="login-container">
      <div className="insta-mob-bg">
        <div className="carousel">
          <Carousel
            autoPlay={true}
            interval={2000}
            infiniteLoop
            showArrows={false}
            showThumbs={false}
            showIndicators={false}
            stopOnHover
            showStatus={false}
             
          >   
             <Image src={bg1} style={{ width: "55%"}} />
             <Image src={bg2} style={{ width: "55%"}} />
             <Image src={bg3} style={{ width: "55%"}} />
            <Image src={bg4} style={{ width: "55%"}} />
            <Image src={bg5} style={{ width: "55%"}} />
          </Carousel>
        </div>
      </div>
      <div>
            <div className= "forget-card">
              <Image src={logo}/>
              <TextField
               id = "outlined-basic"
               fullWidth
               type = "text"
               label = "Email"
               variant = "outlined"
               margin = "dense"
               value = {email}
               onChange = {(e)=>Setemail(e.target.value)}
              />
              
              {
                 error!=""  && <div>{error}</div>
              }
             
             
             <Button style={{marginTop: "1rem"}}fullWidth variant="contained" onClick={Handleclick}>Send Mail</Button>
    
            </div>
              </div>
        </div>
      );
}

export default index;