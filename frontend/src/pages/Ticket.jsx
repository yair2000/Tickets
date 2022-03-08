import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import { getTicket, reset } from "../features/tickets/ticketSlice";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

function Ticket(){
  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) =>state.tickets)
  const dispatch = useDispatch();
  const params = useParams();
  const { ticketId } = useParams();

  useEffect(() =>{
    if(isError){
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isError, message, ticketId])

  return(
    <div>Ticket</div>
  )
}
export default Ticket;