import './App.scss';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { checkIfUserIsAuthenticatedFromLocalStorage } from './utils/AuthUtils';
import Layout from './components/Layout';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import LogIn from './pages/Login';
import UserProfile from './pages/UserProfile';

function App() {
  const initialAuthState = checkIfUserIsAuthenticatedFromLocalStorage();
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route 
            path='/login' 
            element={<LogIn onLogin={() => setIsAuthenticated(true)} />} 
          />
          <Route path='/user-profile/:pk' element={<PrivateRoute isAuthenticated={isAuthenticated}><UserProfile /></PrivateRoute>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
