import swal from "sweetalert";
import {useState} from "react"
import { useNavigate } from "react-router-dom";

const ContactPage = ({navigate}) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [selectedOption, setSelectedOption] = useState("")
    const [message, setMessage] = useState("")

    const contactHandler = async (event) => {
        event.preventDefault();

        setFirstName("");
        setLastName("");
        setEmail("");
        setSelectedOption("");
        setMessage("");
        swal({
            text:"Thank you for contacting us!",
        });
        navigate("/products");
    }
    return (
        <div className="container">
        <div className=" text-center mt-5 ">
        <h1 className="contactTitle">Contact Us</h1>
        </div>
    <div className="row">
    <div className="col-lg-7 mx-auto">
        <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-light">
            <div className = "container">
            <form onSubmit={contactHandler} id="contact-form" role="form">
            <div className="controls">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_name">First name</label>
                            <input id="form_name" type="text" name="name" className="form-control" placeholder="Please enter your firstname *" required="required" data-error="Firstname is required."
                            onChange={(event) => setFirstName(event.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_lastname">Last name</label>
                            <input id="form_lastname" type="text" name="surname" className="form-control" placeholder="Please enter your lastname *" required="required" data-error="Lastname is required."
                            onChange={(event) => setLastName(event.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_email">Email</label>
                            <input id="form_email" type="email" name="email" className="form-control" placeholder="Please enter your email *" required="required" data-error="Valid email is required."
                            onChange={(event) => setEmail(event.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_need">Please specify your need </label>
                            <select id="form_need" name="need" className="form-control" required="required" data-error="Please specify your need."
                            onChange={(event) => setSelectedOption(event.target.value)}
                            >
                                <option value="" selected disabled>--Select Your Issue--</option>
                                <option >General Question</option>
                                <option >Request a Sticker</option>
                                <option >Request Order Status</option>
                                <option >Leave Feedback</option>
                                <option >Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label for="form_message">Message</label>
                            <textarea id="form_message" name="message" className="form-control" placeholder="Write your message here." rows="4" required="required" data-error="Please, leave us a message."
                            onChange={(event) => setMessage(event.target.value)}
                            ></textarea
                                >
                            </div>
                        </div>
                    <div className="col-md-12">
                <input type="submit" className="btn btn-primary btn-send  pt-2 btn-block" value="Send Message" ></input>
                </div>
                </div>
        </div>
        </form>
        </div>
            </div>
    </div>
    </div>
</div>
</div>
    );
};

export default ContactPage;
