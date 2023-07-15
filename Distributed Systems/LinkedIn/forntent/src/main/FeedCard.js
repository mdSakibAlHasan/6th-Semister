import { React, useEffect} from "react";
import { useState } from "react";


export default function FeedCard(props) {
  const [imgsrc, setImgSrc] = useState("");

  useEffect(() => {
    const handleImage = async () => {
      try {
        const imagePath = `./media/sakib/IIT/6th Semister/6th-Semister/Distributed Systems/LinkedIn/backend/src/uploads/${props.picture}`;
        const image = await import(imagePath);
        const imageSource = image.default;
        setImgSrc(imageSource);
      } catch (error) {
        console.error("Error occurred while importing image:", error);
      }
    };
  
    handleImage();
  }, [props.picture]);
  

    return (
        <>
        <div className='shade2 p-2 m-2 display-block'>
            <div className="row">
                <div className="display-6">{props.name}</div>
                <div ><strong>{props.time}</strong></div> <hr/>
                <div >{props.story}</div> <hr/>
                <div ><img src = {imgsrc}  alt="image not found"/> </div> <hr/>
            </div>    
        </div>
        <br/>
        </>
      )
}