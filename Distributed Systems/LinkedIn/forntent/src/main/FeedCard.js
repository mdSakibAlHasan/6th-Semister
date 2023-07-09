import { React } from "react";

export default function FeedCard(props) {
    return (
        <>
        <div className='shade2 p-2 m-2 display-block'>
            <div className="row">
                <div className="display-6">{props.name}</div>
                <div ><strong>{props.time}</strong></div> <hr/>
                <div >{props.story}</div> <hr/>
                <div ><img src='/b.png'  alt="post not found"/> </div> <hr/>
            </div>    
        </div>
        <br/>
        </>
      )
}