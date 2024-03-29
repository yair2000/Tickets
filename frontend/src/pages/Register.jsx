import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register(){
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });
  const {name, email, password, confirmpassword} = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

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

    if(password !== confirmpassword){
      toast.error("Passwords Don't Match");
    }
    else{
      const userData = { name, email, password }
      dispatch(register(userData));
    }
  }

  if(isLoading){
    return <Spinner/>
  }

  return(
    <>
      <section className="heading">
        <h1><FaUser/>Register</h1>
        <p>Please Create An Account</p>
      </section>
      
      <section className="form">
        <form onSubmit={submitForm}>
          <div className="form-group">
            <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleForm}
            placeholder="Name"/>
          </div>

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
            <input
            type="password"
            className="form-control"
            id="confirmpassword"
            name="confirmpassword"
            value={confirmpassword}
            onChange={handleForm}
            placeholder="Confirm Password"/>
          </div>

          <div className="form-group">
            <button
            className="btn btn-block"
            type="submit"
            disabled={!name || !email || !password || !confirmpassword ? true : false}>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register;