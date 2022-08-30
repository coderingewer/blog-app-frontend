import './App.css';
import { Routes, Route, useParams } from "react-router-dom";

import Home from './layouts/Home';
import ButtomNav from './bars/ButtomNav';
import { BrowserRouter as Router } from "react-router-dom";
import Navi from './bars/Navi';
import Signup from './User/Register';
import Login from './User/Login';
import AdminPanel from './admin/AdminPanel';
import EditUser from "./User/EditUser"
import UploadImage from './image/UploadImage';
import UpdatePost from './posts/UpdatePost';
import DeletePost from './posts/DeletePost';
import UserPosts from "./posts/UserPosts"
import Post from './posts/Post';
import AddPost from './posts/AddPost';
import User from './User/User';
import UploadPostImg from './posts/UploadPostImg';
import Users from './admin/Users';
import UpdateUserByAdmin from './admin/UpdateUserByAdmin';
import UpdatePassword from './User/UpdatePassword';

function App() {
  return (
    < div className='App' >
      <Router>
        <Navi />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/editor' element={<AddPost />} />
          <Route path='/adminpanel' element={<AdminPanel />} />
          <Route path='/profile/:userId' element={<User />} />
          <Route path='/editUser' element={<EditUser />} />
          <Route path='/upload' element={<UploadImage />} />
          <Route path='/userPosts/:userId' element={<UserPosts />} />
          <Route path='/updatePost/:postId' element={<UpdatePost />} />
          <Route path='/deletepost/:postId' element={<DeletePost />} />
          <Route path='/post/:postId' element={<Post />} />
          <Route path='/postimg/:postId' element={<UploadPostImg />} />
          <Route path='/users' element={<Users/>}/>
          <Route path='/editUserByAdmin/:userId' element={<UpdateUserByAdmin/>}/>
          <Route path='/updatepassword/:userId' element={<UpdatePassword/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
