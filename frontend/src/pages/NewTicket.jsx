import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createNewTicket, reset } from "../features/tickets/ticketSlice"
import Spinner from '../components/Spinner'

function NewTicket(){
  const {user} = useSelector((state) => state.auth);
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.ticket);

  const [newTicket, setNewTicket] = useState({
     name: user.name,
     email: user.email,
     product: "",
     description: ""

  });
  const {name, email, product, description} = newTicket;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() =>{
    if(isError){
      toast.error(message);
    }
    if(isSuccess){
      dispatch(reset);
      navigate("/tickets");
    }
    dispatch(reset())

  }, [dispatch, isError, isSuccess, navigate, message]);

  const ticketSubmit = (e) =>{
     e.preventDefault();

     dispatch(createNewTicket({product, description}));
  }

  if(isLoading){
    return <Spinner/>
  }

  return(
    <>
      <section className="heading">
        <h1>Create A New Ticket</h1>
        <p>Please Fill Out The Form Below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text"
          className="form-control"
          value={name}
          disabled/>

          <label htmlFor="email">Customer Email</label>
          <input type="email"
          className="form-control"
          value={email}
          disabled/>
        </div>

        <form onSubmit={ticketSubmit}>
          <div className="form-group">
          <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setNewTicket(e.target.value)}>
              <option value="phone">Phone</option>
              <option value="tablet">Tablet</option>
              <option value="laptop">Laptop</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
              <textarea type="text"
              name="description"
              className="form-control"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setNewTicket(e.target.value)}/>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit A New Ticket</button>
          </div>
        </form>
      </section>
    </>
  )
}
export default NewTicket;