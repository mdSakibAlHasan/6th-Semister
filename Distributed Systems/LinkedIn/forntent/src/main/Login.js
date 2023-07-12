import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { AuthContext } from "../compute/authContex";
// import Navbar from "../Components/Navbar.js";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState();
  const navigate  = useNavigate();
  //const [err, setError] = useState(null);

//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    console.log(input," are here ");
    try{
      await axios.post("http://localhost:3001/app/login", input);
      navigate("/newsFeed");
    }catch(err){
      setErr(err)
    }
    navigate('/newsFeed');
  };

  return (
    // <form action="">
      <div className="full_page_normal p-5 shade1">
        <div className="shade2 p-5 rounded">
          <center>
            <h4>
              <strong>Log In</strong>
            </h4>
          </center>{" "}
          <hr /> <br />
          <div className="mb-3 mt-3">
            <label for="EmailInput" className="form-label">
              Email:{" "}
            </label>
            <br />
            <input
              type="email"
              id="EmailInput"
              placeholder="Your Email Here"
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
            {/* {err && <p>{err}</p>} */}
            <p>Don't have account <Link to="/registration">Register</Link> </p>
            <button onClick={handleSubmit}>Enter</button>
          </center>
        </div>
      </div>
  );
}
