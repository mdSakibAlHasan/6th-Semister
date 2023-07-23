import { React, useEffect, useState} from "react";
import FeedCard from "./FeedCard";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "./Navbar.js";

export default function Feed() {
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
          <div className="shade2 p-5 rounded">
        <h3><Link to="/post">Post</Link></h3>
        <div className='shade1 p-3 full_page_height' style={{ display: "inline-block" }}>
            {postInfo.map((feed)=><FeedCard name={feed.Name} time={feed.PostTime} story={feed.Text} picture={feed.Image}/>)}
      </div>
      </div>
      </div>
    </div>
  )
};