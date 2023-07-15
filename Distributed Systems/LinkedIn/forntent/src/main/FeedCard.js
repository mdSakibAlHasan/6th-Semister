import { React, useEffect, useState } from "react";

const [imgsrc, setImagsrc] = useState("");

useEffect(() => {
    const handlImage = async () => {
      import(`./uploads/${props.picture}`)
        .then((image) => setImagsrc(image.default))
        .catch((error) => console.error(error, "occur here"));
    };
    handlImage();
  }, [props.picture]);

export default function FeedCard(props) {
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