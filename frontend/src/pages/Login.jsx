import { useState } from "react";
import { toast } from "react-toastify"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { login } from "../features/auth/authSlice"

function Login(){
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const {email, password} = data

  const dispatch = useDispatch();
  const {user, isLoading, isSuccess, message} = useSelector(state => state.auth);

  const handleForm = (e) =>{
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const submitForm = (e) =>{
    e.preventDefault();

    const userData = {
      email,
      password
    }
    dispatch(login(userData));

    if(!email || !password){
      toast.error("Email Or Password Is Incorrect");
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