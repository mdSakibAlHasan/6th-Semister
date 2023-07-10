import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Post() {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);

  const handleTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setPostImage(URL.createObjectURL(imageFile));
  };

  const handleSubmit = () => {
    // Handle post submission
    console.log("Post text:", postText);
    console.log("Post image:", postImage);
  };
    
  return (
    <div>
        <center>
        <h1 >LinkedIn</h1>
        <br/>
        <h3><Link to="/newsFeed">Home</Link></h3>
        <h2>Your timeline</h2>
        

        <div>
            <h4>Create a Post</h4>
            <textarea
                value={postText}
                onChange={handleTextChange}
                placeholder="Write your post..."
            />
            <br/>
            <input type="file" onChange={handleImageChange} />
            {postImage && <img src={postImage} alt="Post" height={200} width={200}/>}
            <br/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        <hr/>
        </center>
    </div>
   
  )
};