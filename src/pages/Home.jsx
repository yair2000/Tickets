import { Link } from "react-router-dom"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"

function Home(){
  return(
    <>
      <section className="heading">
        <h1>How can I help you?</h1>
        <p>Choose one of the options below</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle/>Create a new ticket
      </Link>

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt/>View my tickets
      </Link>
    </>
  )
}
export default Home;