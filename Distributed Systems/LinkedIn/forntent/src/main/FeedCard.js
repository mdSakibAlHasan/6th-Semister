import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FeedCard(props) {
  const [imgsrc, setImgSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:3001/app/photo', {
          params: {
            image: props.picture,   
          },
          responseType: 'blob', // Set the responseType to 'blob' to get the image as a Blob object
        });

        const reader = new FileReader();
        reader.onloadend = () => {
        setImgSrc(reader.result);
        };
        reader.readAsDataURL(response.data); // Convert the Blob to base64 using FileReader
      } catch (error) {
        console.error(error);
      }
    };

    fetchImage();
  }, []);

  return (
    <>
      <div className='shade2 p-2 m-2 display-block'>
        <div className="row">
          <div className="display-6">{props.name}</div>
          <div><small>{props.time}</small></div> <hr />
          <div>{props.story}</div> <hr />
          {imgsrc && <img src={imgsrc} alt="Photo" />} {/* Display the image */}
          <hr />
        </div>
      </div>
      <br />
    </>
  );
}