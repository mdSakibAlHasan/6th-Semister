import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Post() {
  const [postText, setPostText] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setPhoto(imageFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("text", postText|| "");
    formData.append("file", photo);
    console.log(formData,photo,postText);

    try {
      const response = await axios.post("http://localhost:3001/app/post2", formData, {
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
