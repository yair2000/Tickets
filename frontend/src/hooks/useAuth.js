import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuth = () =>{
  const [loggedIn, setLoggedIn] = useState(false);
  const [status, setsStatus] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() =>{
    if(user){
      setLoggedIn(true);
    }
    else{
      setLoggedIn(false);
    }
    setsStatus(false);
  }, [user]);
   
  return { loggedIn, status }
}