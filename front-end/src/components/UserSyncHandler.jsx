import { useAuth, useUser } from '@clerk/clerk-react'
import  { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserSyncHandler = () => {
    const {isLoaded,isSignedIn,getToken}=useAuth();
    const {user}=useUser();
    const [sync,setSync]=useState(false);
    const {backendUrl}=useContext(AppContext);
    useEffect(()=>{
        const saveUser=async ()=>{
            if(!isLoaded||!isSignedIn || !sync){
                return;
            }
            try{
                const token=await getToken();
                const userData={
                    clerkId:user.id,
                    email:user.primaryEmailAddress.emailAddress,
                    firstName:user.firstName,
                    lastName:user.lastName, 
                };
                const response=await axios.post(backendUrl+"/users",userData,{headers:{"Authorization":`Bearer ${token}`}}())
                if(response.data.success===true){
                   toast.success("User successfully created!")
                }else{
                    toast.error("User sync failed. Please try again.");
                }
                setSync(true);
            }catch(error){
                console.log("Uses sync failed",error);
                toast.error("Unable to create account. Please try again.");
            }
        }
        saveUser();
    },[isLoaded,isSignedIn,getToken,user,sync])
    return null;
}

export default UserSyncHandler;
