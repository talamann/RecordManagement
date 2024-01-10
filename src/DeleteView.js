import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';


const DeleteView = () => {
  //this view takes a parameter to send request to api
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      // put your own endpoint here, i use the local endpoint my api runs on
      fetch(`http://localhost:8060/users/${id}`)
        .then(response => response.json())
        .then((data) => setUser(data))
        .catch(error => console.error("Error fetching data from api:", error));
        console.log(user);
    }
    , []);
    
    const handleDelete = async (userId) => {
        try {
      
          // put your own endpoint here, i use the local endpoint my api runs on
          const response = await fetch(`http://localhost:8060/users/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if needed
            },
            // You may include a request body if required by your API
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          // Handle success, such as updating the UI or fetching the updated data
          console.log(`User with ID ${userId} deleted successfully.`);
        } catch (error) {
          console.error('Error making DELETE request:', error);
        }
       
        goToMain();
      };
     function goToMain(){
        navigate("/");
       }
      
  // display data on form with a Delete and Back button to respectively handle the deletion and the navigation to main page
    return (
      <div>
        <p>Are you sure you want to delete this user?</p>
      <table>
        
             <thead>
              <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Department</th>
              </tr>
             </thead>
             <tbody>
            <tr key = {user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.department}</td>
              <button onClick ={() => goToMain()} >Back</button>
            <button onClick={()=>handleDelete(id)}>Delete</button>
            
            
            </tr>
      
             </tbody>
            </table>
           
      </div>
    );
  };
  export default DeleteView;