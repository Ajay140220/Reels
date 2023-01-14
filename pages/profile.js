import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Profile from '../components/Profile';
import { AuthContext } from '../context/auth';

function profile() {
  const{user} = useContext(AuthContext);
  const Redirect = () =>{
      const router = useRouter();
      router.push('/login');
  }
  return (
    <>
      {user?.uid ? <Profile/> : <Redirect/>}
    </>
  );
}
export default profile;