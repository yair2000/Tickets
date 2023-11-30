import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login(){
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  useEffect(() =>{
    if(isError){
      toast.error(message);
    }
    if(isSuccess || user){
      navigate("/");
    }
    dispatch(reset());
  },[isError, isSuccess, user, message, navigate, dispatch]);

  const handleForm = (e) =>{
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const submitForm = (e) =>{
    e.preventDefault();

    const userData ={ email, password }
    dispatch(login(userData));

    if(isLoading){
      return <Spinner/>
    }
  }

  return(
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt/>Login
        </h1>
        <p>Login To Your Account</p>
      </section>
      
      <section className="form">
        <form onSubmit={submitForm}>

          <div className="form-group">
            <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleForm}
            placeholder="Email Address"/>
          </div>

          <div className="form-group">
            <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleForm}
            placeholder="Password"/>
          </div>

          <div className="form-group">
            <button
            className="btn btn-block"
            type="submit"
            disabled={!email || !password ? true : false}>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login;