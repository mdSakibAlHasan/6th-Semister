import { React, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../main/Navbar.js";

export default function Notification() {
    const navigate = useNavigate();
    const [postInfo, setPostInfo] = useState([]);

    useEffect(() => {
      const handleInfo = async () =>  {
        const cookie = Cookies.get('my_cookies');
        // setMyCookie(cookie);
        if (cookie == null) {
          navigate("/login");
        } else {
          console.log(cookie);
          try {
            const result = await axios.get(
              "http://localhost:3001/app/notification",
              {
                withCredentials: true
              }
            );
            setPostInfo(result.data);
            console.log(result.data);
          } catch (error) {
            // Handle errors here
            console.error(error);
            navigate("/login");
          }
        }
      }
      handleInfo();
    }, []);
    

  return (
    <div>
      <Navbar />
      <div className="full_page_normal p-5 shade1">
      <center>
        <div className="shade2 p-5 rounded style={{ width: '80%' }}">   
        <h2>Notification</h2>
        <br/><hr/><br/>
        <div className='shade1 p-3 full_page_height' style={{ display: "inline-block" }}>
            {postInfo.map((feed)=><NotificationCard name={feed.Name} postID={feed.PostID} time={feed.PostTime}/>)}
        </div>
        </div>
        </center>
      </div>
    </div>
  )
};

function NotificationCard(props){
    return (
        <>
        <div style={{width: '100%'}}>
      <button style={{ width: '80%' }}>
        <b>{props.name} </b>
        posted a post on {props.time}
      </button>
      <hr />
    </div>
        </>
      )
}