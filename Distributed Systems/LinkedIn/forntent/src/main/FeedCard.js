import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FeedCard(props) {
  const [imgsrc, setImgSrc] = useState("");

  useEffect(() => {
     const fetchImage = async () => {
      setImgSrc(props.picture);
      console.log(imgsrc)
     };

    fetchImage();
  }, []);

  return (
    <>
      <div className='shade2 p-2 m-2 display-block'>
        <div className="row">
          {/* <div className="display-6">{props.name}</div> */}
          <div><small>{props.time}</small></div> <hr />
          <div>{props.story}</div> <hr />
          {imgsrc && <img src={props.picture} alt="Photo" />} {/* Display the image */}
          <hr />
        </div>
      </div>
      <br />
    </>
  );
}