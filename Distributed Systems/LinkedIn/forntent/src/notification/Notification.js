import { React, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

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
              "http://localhost:3001/app/news",
              {
                withCredentials: true
              }
            );
            setPostInfo(result.data);
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
    <div className="full_page_normal p-5 shade1">
        <div className="shade2 p-5 rounded style={{ width: '80%' }}">
    <h3><Link to="/post">Post</Link></h3>
    <div className='shade1 p-3 full_page_height' style={{ display: "inline-block" }}>
        {postInfo.map((feed)=><NotificationCard name={feed.Name} time={feed.PostTime}/>)}
    </div>
    </div>
    </div>
  )
};

function NotificationCard(props){
    return (
        <>
        <div>
      <button style={{ width: '80%' }}>
        <div className="display-6 p-2">{props.name}</div>
      </button>
      <hr />
    </div>
        </>
      )
}