import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Post() {
  const [postText, setPostText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [myCookie, setMyCookie] = useState("");
  const navigate  = useNavigate();

  useEffect(() => {
    function handleCookie() {
      const cookie = Cookies.get('my_cookies');
      setMyCookie(cookie);
      if (cookie == null) {
        navigate("/login");
      }
    }
    handleCookie();
  }, [navigate]);

  const handleTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setPhoto(imageFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(myCookie);
    const formData = new FormData();
    formData.append("text", postText|| "");
    formData.append("file", photo);
    formData.append("cookie",myCookie);
    console.log(formData,photo,postText);

    try {
      const response = await axios.post("http://localhost:3001/app/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <center>
        <h1>LinkedIn</h1>
        <br />
        <h3>
          <Link to="/newsFeed">Home</Link>
        </h3>
        <h2>Your timeline</h2>

        <div>
          <h4>Create a Post</h4>
          <textarea
            value={postText}
            onChange={handleTextChange}
            placeholder="Write your post..."
          />
          <br />
          <input type="file" onChange={handleImageChange} />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <hr />
      </center>
    </div>
  );
}
