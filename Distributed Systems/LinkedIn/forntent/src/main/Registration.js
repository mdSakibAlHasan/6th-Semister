import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/app/register", input);

      if (response.data.message === "User registered successfully.") {
        navigate("/newsFeed");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Email already exists");
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
            <button onClick={handleSubmit}>Register</button>
          </center>
        </div>
      </div>
  );
}
