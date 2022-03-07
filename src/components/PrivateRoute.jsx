import {Navigate, Outlet} from "react-router-dom"
import {useAuth} from "../hooks/useAuth"
import Spinner from '../components/Spinner'

const PrivateRoute = () =>{
   const {loggedIn, status} = useAuth();

   if(status){
     return <Spinner/>
   }
   return loggedIn ? <Outlet/> : <Navigate to="/login"/>
}
export default PrivateRoute