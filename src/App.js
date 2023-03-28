import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile/Profile';
import ProfileEdit from './pages/ProfileEdite/ProfileEdit';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" replace /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/search" element={ <Search /> } />
      <Route exact path="/album/:id" element={ <Album /> } />
      <Route exact path="/favorites" element={ <Favorites /> } />
      <Route exact path="/profile" element={ <Profile /> } />
      <Route exact path="/profile/edit" element={ <ProfileEdit /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
