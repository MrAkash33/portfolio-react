import React, { useContext, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
import "./Contact.css";
import { themeContext } from "../../Context";
import Validation from "../../validation";
import { ApiUrl } from "../../config/config";
const Contact = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const form = useRef();
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [dis, setDisable] = useState(false)


  const sendEmail = (e) => {
    e.preventDefault()
    const valid = Validation(user,email,message)
    if(valid){
        sendEmailApi()
    }
  };

  const sendEmailApi = ( async () =>{
    setDisable(true)
    const data = {
      "username":user,
      "email":email,
      "message":message
    }
    const response = await fetch(ApiUrl,{
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        html: `<p>Your information has been submitted </br>successfully.</p>`,
      })
      setTimeout(()=>{
        window.location.reload()
        setDisable(false)
      },1100)
    }
  })

  return (
    <div className="contact-form" id="contact">
      {/* left side copy and paste from work section */}
      <div className="w-left">
        <div className="awesome">
          {/* darkMode */}
          <span style={{color: darkMode?'white': ''}}>Get in Touch</span>
          <span>Contact me</span>
          <div
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}
          ></div>
        </div>
      </div>
      {/* right side form */}
      <div className="c-right">
        <form onSubmit={sendEmail} >
          <input type="text" name="user_name" className="user"  placeholder="Name" onChange={(e)=>{setUser(e.target.value)}}/>
          <input type="text" name="user_email" className="user" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
          <textarea name="message" className="user" placeholder="Message" onChange={(e)=>{setMessage(e.target.value)}}/>
          {
            dis ? <input type="submit" value="Send"  className="button2" /> : <input type="submit" value="Send"  className="button" />
          }
          <div
            className="blur c-blur1"
            style={{ background: "var(--purple)" }}
          ></div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
