import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


export const handleSubmit = async (input) => {
    console.log("In the function call", input);
    
    try {
        const response = await fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(input)
        });
  
        const data = await response.json();
        console.log(data.message); // Display the response message in the console
        return data;
      } catch (error) {
        console.error(error);
      }
  };
