
import './App.css';

import { Route,Routes } from 'react-router-dom';
import Get from './Get.tsx';
import Post from './Post.js'
import DeleteView from './DeleteView.js'
import Edit from './Edit.js'
function App() {

  //set the routes with the datagrid as the default route
  return (
    <Routes>
      <Route path='/' element = {<Get/>}/>
      <Route path='/createNew' element ={<Post/>}/>
      <Route path='/DeleteView/:id'element ={<DeleteView/>}/>
      <Route path='/EditView/:id'element ={<Edit/>}/>
    </Routes>
  );
}

export default App;
