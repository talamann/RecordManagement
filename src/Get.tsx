

import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
//interface for the datagrid, the file is in typescript because the data grid component deals with typed parameters for 
//the different rendering options
interface User {
  id: number;
  name: string;
  surname: string;
  department: string;
  editButton: React.JSX.Element;
  deleteButton: React.JSX.Element;
}

const Get: React.FC = () => {
  //to store api get response
  const [users, setUsers] = useState<User[]>([]);
  //to handle the checkbox operations, unfortunately out of the 5 methods tried none could handle it properly
  //the checkbox just renders the edit button which takes a parameter anyway
  const [rowSelected,setrowSelected] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number>();

  const handleCheckboxChange = (rowId:number) => {
    // Check if the rowId is selected 
    if (selectedRow === rowId) {
      setrowSelected(false);
      // If it is, remove it
      setSelectedRow(0);
    } else {
      // If it's not, add it
      setSelectedRow(rowId);
      setrowSelected(true);
    }
    const isSelected = rowId>0 ;
    //The followed code logic is true but I couldn't figure out how to pass
    return(
      <>
       {selectedRow === rowId && <button onClick={() => handleRedirectEdit(rowId)}>Edit</button>}
      </>
    )
  };
  const navigate = useNavigate();

  useEffect(() => {
    // put your own endpoint here, i use the local endpoint my api runs on
    fetch("http://localhost:8060/users")
      .then(response => response.json())
      .then((data: User[]) => setUsers(data))
      .catch(error => console.error("Error fetching data from api:", error));
      const buttonUsers = users.map(user => ({
        ...user,
      }))
      setUsers(buttonUsers);
  }
  , []);
  
//DataGrid columns structure
  const columns = [
    {key:'check', name:'',
    // render the checkbox
    renderCell({row} : {row:Row}){
      return(
        <>
        <input
                type="checkbox"
                onChange = {()=> handleCheckboxChange(row.id)}
              />
              {rowSelected && (
          <button onClick={() => handleRedirectEdit(row.id)}>Edit</button>
        )}
      </>
      )
    }
  
  },
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' },
    { key: 'surname', name: 'Surname' },
    { key: 'department', name: 'Department' },
    {
      key: 'edit',
      name: 'Edit',
      //render the edit button
      renderCell({row} : {row:Row}){
        return(
          <>
          <button onClick={() =>handleRedirectEdit(row.id)}>Edit</button>
        </>
        )
      }
      
    },
    {

      key: 'delete',
      name: 'Delete',
      //render the delete button
      renderCell({row} : {row:Row}){
        return(
          <>
          <button onClick={() =>handleRedirectDelete(row.id)}>Delete</button>
        </>
        )
      }
      
    },
    
    // Add more columns as needed
  ];
  function handleRedirectDelete(userId:number): void {
    // URL of the page you want to open in the pop-up
  
    // Use the navigate function to redirect to a new route with user data as a parameter
    navigate(`DeleteView/${userId}`);

  };
  function handleRedirectEdit(userId:number): void {
    // URL of the page you want to open in the pop-up
  
    // Use the navigate function to redirect to a new route with user data as a parameter
    navigate(`EditView/${userId}`);

  };
  
  //structure of the rows
  interface Row {
    id: number;
    name: string;
    surname : string;
    department: string;
    editButton: React.JSX.Element;
    deleteButton: React.JSX.Element;
  }
  

  

  return (
  //map the row id's as keys
    <>
      <div className='center'>
        <h2 >User Management</h2>
        <a href='/createNew'>NEW</a>
        <DataGrid columns={columns} rowKeyGetter={(row: Row) => row.id} rows={users} />
        
      </div>
    </>
  );
}

export default Get;



