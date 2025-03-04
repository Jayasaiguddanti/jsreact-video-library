
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/home';
import { Adminlogin } from './components/admin-login';
import { Userlogin } from './components/user-login';
import { Admindashboard } from './components/admin-dashboard';
import { Addvideo } from './components/add-video';
import { UserRegister } from './components/user-reg';
import { UserDashBoard } from './components/user-dashboard';
import { Deletevideo } from './components/admin-delete';
import { Editvideo } from './components/admin-edit';

function App() {
  return (
    <div className='body-background'>
      <div className='shade'>
        <h1 className='text-center fst-italic pt-4 color-red'>Sai's Video Library</h1>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home /> } />
            <Route path='admin-login' element={<Adminlogin />} />
            <Route path='user-login' element={<Userlogin />} />
            <Route path='admin-dash' element={<Admindashboard />} />
            <Route path='add-video' element={<Addvideo />} />
            <Route path='user-register' element={<UserRegister />} />
            <Route path='user-dash' element={<UserDashBoard />} />
            <Route path='delete-video/:id' element={<Deletevideo />} />
            <Route path='edit-video/:id' element={<Editvideo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
