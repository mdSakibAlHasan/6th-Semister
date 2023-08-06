import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../main/Navbar.js";


export default function Notification() {
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState([]);
  const [postDetails, setPostDetails] = useState();
  const [expandedNotification, setExpandedNotification] = useState(null);

  useEffect(() => {
    const handleInfo = async () => {
      const cookie = Cookies.get("my_cookies");
      // setMyCookie(cookie);
      if (cookie == null) {
        navigate("/login");
      } else {
        console.log(cookie);
        try {
          const result = await axios.get("http://localhost:3001/app/notification", {
            withCredentials: true,
          });
          setPostInfo(result.data);
        } catch (error) {
          // Handle errors here
          console.error(error);
          navigate("/login");
        }
      }
    };
    handleInfo();
  }, []);

  const handleNotificationClick = async (postID, UserID) => {
    const result = await axios.post("http://localhost:3001/app/getPostDetails", {
            PostID: postID,
            UserID: UserID,
    });
    setPostDetails(result.data);
    setExpandedNotification((prevState) => (prevState === postID ? null : postID));

  };

  return (
    <div>
      <Navbar />
      <div className="full_page_normal p-5 shade1">
        <center>
          <div className="shade2 p-5 rounded" style={{ width: "80%" }}>
            <h2>Notification</h2>
            <br />
            <hr />
            <br />
            <div className="shade1 p-3 full_page_height" style={{ display: "inline-block" }}>
              {postInfo.map((feed) => (
                <NotificationCard
                  key={feed.PostID}
                  name={feed.Name}
                  postID={feed.PostID}
                  time={feed.PostTime}
                  text={feed.Text}
                  image={feed.Image}
                  userID={feed.UserID}
                  isExpanded={expandedNotification === feed.PostID}
                  onClick={() => handleNotificationClick(feed.PostID, feed.UserID)}
                />
              ))}
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}

function NotificationCard(props) {
  const imageStyle = {
    width: '200px', // Set the desired width here
    height: '150px', // Set the desired height here
    // Add any other styling properties you need
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <button onClick={props.onClick} style={{ width: '80%' }}>
          <b>{props.name} </b>
          posted a post on {props.time}
        </button>
        {props.isExpanded && (
          <>
            <div style={{ padding: '10px', background: '#f0f0f0', marginTop: '10px' }}>
              {/* Render the expanded details here */}
              <p>Details of post: {props.text} </p>
              <img src={props.image} style={imageStyle}/>
            </div>
          </>
        )}
      </div>
    </>
  );
}
