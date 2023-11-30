import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "react-modal";

import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, createNote } from "../features/notes/noteSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

const customStyles ={
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
}
Modal.setAppElement("#root");

function Ticket(){
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const { ticket, isLoading, isError, message } = useSelector((state) =>state.tickets);
  const { notes, isLoading: notesLoading } = useSelector((state) =>state.note);

  useEffect(() =>{
    if(isError){
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isError, message, ticketId]);

  const ticketCloser = (e) =>{
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Was Successfully Closed");
    navigate("/tickets");
  }

  if(isLoading || notesLoading){
    return <Spinner/>
  }
  if(isError){
    return <h3>Something Went Wrong</h3>
  }

  const noteHandler = (e) =>{
    e.preventDefault();
    dispatch(createNote({noteText, ticketId}));
    closeModal();
  }

  const openModal = () =>setModalIsOpen(true);
  const closeModal = () =>setModalIsOpen(false);

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
          <h2>Notes:</h2>
      </header>
      {ticket.status !== "Closed" && (
        <button onClick={openModal} className="btn"><FaPlus/>Add Note</button>
      )}

      <Modal isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Note">
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>X</button>
        <form onSubmit={noteHandler}>
          <div className="form-group">
            <textarea
            name="noteText"
            id="noteText"
            className="form-control"
            placeholder="Write your note"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}>
            </textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">Submit</button>
          </div>
        </form>
      </Modal>

      {notes.map((note) =>(
        <NoteItem key={note._id} note={note}/>
      ))}

      {ticket.status !== "Closed" && (
        <button className="btn btn-block btn-danger" onClick={ticketCloser}>Close Ticket</button>
      )}
    </div>
  )
}
export default Ticket;