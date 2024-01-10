import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Edit = ()=> {
  //navigate to switch to other pages
  //id because this edit form takes an id parameter
    const { id } = useParams();
    //use state to put the edited data
    const [data,setData] = useState();
    const navigate = useNavigate();
    //to display the to be edited data in its original form
    const [formData, setFormData] = useState({
        //api takes int parameter for id
        id: parseInt(id, 10),
        name: '',
        surname:'',
        department:''
      });
    useEffect(() => {
      //fetch data to display 
      // put your own endpoint here, i use the local endpoint my api runs on
        fetch(`http://localhost:8060/users/${id}`)
          .then(response => response.json())
          .then(data => {
            setData(data);
            //set the form data
            setFormData(prevFormData => ({
              ...prevFormData,
              id: parseInt(id, 10),
              name: data.name,
              surname: data.surname,
              department: data.department
            }));
          })
          .catch(error => console.error("Error fetching data from api:", error));
          console.log(data);
      }
      , []);
    
     //display the changes on the form
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
      //take data from form and send a PATCH request to api
    let editUser = async (event) => {
        event.preventDefault();
    
        try {
            console.log(JSON.stringify(formData))
            // put your own endpoint here, i use the local endpoint my api runs on
          const response = await fetch(`http://localhost:8060/users/${id}`, {
            method: 'PATCH',
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
          console.error('Error making PATCH request:', error);
        }
        navigate("/");
      };
     const goToMain = ()=>{
      navigate("/")
     }
     //button handles the api request inside the onClick prop
 return <>
    <form className="submitform">
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
        <button onClick={editUser}type="submit"id="createNew">Save</button>
        <button onClick={goToMain}>Back</button>
    </form>
   
</>
}
export default Edit