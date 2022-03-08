import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import { getTicket, closeTicket, reset } from "../features/tickets/ticketSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

function Ticket(){
  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) =>state.tickets)
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() =>{
    if(isError){
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isError, message, ticketId]);

  const ticketCloser = (e) =>{
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Was Successfully Closed");
    navigate("/tickets");
  }

  if(isLoading){
    return <Spinner/>
  }
  if(isError){
    return <h3>Something Went Wrong</h3>
  }

  return(
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets"/>
          <h2>Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status?.toLowerCase()}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Submitted: {new Date(ticket.date).toLocaleString("he-IL")}
          </h3>
          <h3>
            Product: {ticket.product}
          </h3>
          <hr/>
          <div className="ticket-desc">
            <h3>Issue:</h3>
            <p>{ticket.description}</p>
          </div>
      </header>
      {ticket.status !== "Closed" && (
        <button onClick={ticketCloser} className="btn btn-block btn-danger">Close Ticket</button>
      )}
    </div>
  )
}
export default Ticket;