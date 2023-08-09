import { React, useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const people = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/events');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data.message);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);
  

  return (
    <div>
      <div>Hellow world</div>
      <p>Total subscriber: {message}</p>
    </div>
  )
     
}
