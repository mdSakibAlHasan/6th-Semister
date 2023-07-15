import { React } from "react";

useEffect(() => {
    const handlImage = async () => {
      import(`./photo/${photo}`)
        .then((image) => setImageSrc(image.default))
        .catch((error) => console.error(error, "occur here"));
    };
    handlImage();
  }, [ID]);

export default function FeedCard(props) {
    return (
        <>
        <div className='shade2 p-2 m-2 display-block'>
            <div className="row">
                <div className="display-6">{props.name}</div>
                <div ><strong>{props.time}</strong></div> <hr/>
                <div >{props.story}</div> <hr/>
                <div ><img src='media/sakib/IIT/6th Semister/6th-Semister/Distributed Systems/LinkedIn/forntent/src/picture/b.png'  alt="post not found"/> </div> <hr/>
            </div>    
        </div>
        <br/>
        </>
      )
}