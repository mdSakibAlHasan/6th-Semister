import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Controler from "./Controler.js";
import { handleSubmit } from "./Controler.js";

export default function Registration() {
  const [input, setInput] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [err, setError] = useState();
  
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();
  const handleRegistration = async () => {
    console.log(input, "is here");
    try {
      const result = await handleSubmit(input);
      if(result.message==='User registered successfully.'){
        navigate("/home");
      }
      else{
        console.log(result,"------");
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred while registering.");
    }
  };

  return (
      <div className="full_page_normal p-5 shade1">
        <div className="shade2 p-5 rounded">
          <center>
            <h4>
              <strong>Create Account</strong>
            </h4>
          </center>{" "}
          <hr /> <br />
          <div className="mb-3 mt-3">
            <label for="NameInput" className="form-label">
              Name:{" "}
            </label>
            <br />
            <input
              type="text"
              id="NameInput"
              placeholder="Input Your Name Here"
              name="name"
              onChange={handleChange}
            />
          </div>
          <hr />
          <div className="mb-3 mt-3">
            <label for="EmailInput" className="form-label">
              Email:{" "}
            </label>
            <br />
            <input
              type="email"
              id="EmailInput"
              placeholder="Input Your Email Here"
              name="email"
              onChange={handleChange}
            />
          </div>
          <hr />
          <div className="mb-3 mt-3">
            <label for="PasswordInput" className="form-label">
              Passsword:
            </label>
            <br />
            <input
              type="password"
              id="PasswordInput"
              placeholder="Your Password Here"
              name="password"
              onChange={handleChange}
            />
          </div>
          <hr />
          <br />
          <center>
            {err && <div style={{ color: 'red' }}>{err}</div>}
            <button onClick={handleRegistration}>Register</button>
          </center>
        </div>
      </div>
  );
}
