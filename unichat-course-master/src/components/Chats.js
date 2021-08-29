import React, {  useEffect, useState}from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from './firebase';
import { ChatEngine } from 'react-chat-engine';
import { useAuth } from './contexts/AuthContext';
import axios from 'axios';




const Chats=()=>{
    const history = useHistory();
    const{ user } = useAuth();
    const [ loading, setloading]=useState(true);
    const handleLogout = async()=> {
        await auth.signOut();
        history.push('/');
    }
    const getFile = async(url)=> {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }
    useEffect(()=>{
        if(!user){
            history.push('/');
            return;
        }
        axios.get('https://api.chatengine.io/users/me',{
            headers:{
                "Project-ID": "1e53d816-fa33-41cf-b965-45077baeb1e5",
                "User-Name": user.email,
                "User-Secret": user.uid,
            }
        })
        .then(()=> {
            setloading(false);
        })
        .catch(()=> {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);


            getFile(user.photoURL)
            .then((avatar)=>{
                formdata.append('avatar', avatar, avatar.name)

                axios.post('https://api.chatengine.io/users/',
                formdata,{
                    headers: {"private-key":"0a1ac5f3-e242-4a69-8fe5-5a8038fdaedd"}
                }
                )
                .then(()=>setloading(false))
                .catch((error)=>console.log(error))
            })
        })
    }, [user, history]);
    if(!user || loading) return 'LOADING...'
    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    SupriyaBook
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
            height="calc(100vh-66px)"
            projectID="
            1e53d816-fa33-41cf-b965-45077baeb1e5"
            userName={user.email}           
            usersecret={user.uid}
            />
        </div>
        
    );
}
export default Chats;