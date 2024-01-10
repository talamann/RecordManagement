import React, { useEffect, useState } from 'react';

import styles from './Project.modules.css';
import { assertInteger } from 'pdf-lib';
import { useNavigate } from 'react-router-dom';

const Post = ()=> {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        //id value initialized as 0
        id: 0,
        name: '',
        surname:'',
        department:''
      });
      const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      //Api requires an integer for the id so a seperate input handling function is written to handle INT ONLY
      //variables
      const handleInputChangeINT = (name,value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: isNaN(value) ? '' : value, // Update the state only if value is a valid integer
          }));
      };
    let CreateUser = async (event) => {
        event.preventDefault();
    
        try {
            console.log(JSON.stringify(formData))
          const response = await fetch('http://localhost:8060/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const responseData = await response.json();
          console.log('Response from server:', responseData);
    
          // Handle the response as needed
        } catch (error) {
          console.error('Error making POST request:', error);
        }
        navigate("/");
      };
     
 return <>
    <form className="submitform" onSubmit={CreateUser}>
        <label forname="id">ID:</label>
        <input type="text" id="id"
            name="id"
            value={formData.id}
            onChange={(e) => handleInputChangeINT('id', parseInt(e.target.value, 10))}/>
        <label forname="name">Name:</label>
        <input type="text" id="name" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}/>
        <label forname="surname">Surname:</label>
        <input type="text" id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}/>
        <label forname="department">Department:</label>
        <input type="text" id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}/>
        <button type="submit"id="createNew">Create</button>
    </form>
</>
}
export default Post