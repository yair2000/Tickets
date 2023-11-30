import { Link } from "react-router-dom";

function TicketItem({ ticket }){
  return(
    <div className="ticket">
      <div>{new Date(ticket.date).toLocaleString("he-IL")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status?.toLowerCase()}`}>
        {ticket.status}
      </div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  )
}

export default TicketItem;