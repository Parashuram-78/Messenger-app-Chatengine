import React, { useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const AuthContext = React.createContext();
 export const useAuth = () => useContext(AuthContext);

 export const AuthProvider = ({children})=> {
     const [loading, setloading]=useState(true);
     const [user, setuser] = useState({});
     const history = useHistory();

     useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setuser(user);
            setloading(false);
           if(user) history.push('/chats');
        }) 
       
     }, [user, history]);
     const value = { user };
     return (
         <AuthContext.Provider value={value}>
             {!loading && children}
         </AuthContext.Provider>
     );
 }