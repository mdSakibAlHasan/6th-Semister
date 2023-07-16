import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Post() {
  const [postText, setPostText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [myCookie, setMyCookie] = useState("");
  const [postImag, setPostImage] = useState(null);
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
    //const imageFile = event.target.files[0];
    setPostImage(URL.createObjectURL(imageFile));
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
    <div className="full_page_normal p-5 shade1">
      <div className="shade2 p-5 rounded">
      <center>
        <h1>LinkedIn</h1>
        <br />
        <h3>
          <Link to="/newsFeed">Home</Link>
        </h3>
        <h2>Your timeline</h2>

        <div>
          <h4>Create a Post</h4>
          <textarea className="p-3"
            value={postText}
            onChange={handleTextChange}
            placeholder="Write your post..."
          />
          <br />
          <input type="file" onChange={handleImageChange} />
          <br />
          {postImag && <img src={postImag} alt="Image upload fail" height={400} width={400}/>}
          <br/>
          <input
              className="btn btn-outline-light"
              type="button"
              value="Post"
              onClick={handleSubmit}
            />
        </div>
        <hr />
      </center>
      </div>
    </div>
  );
}
