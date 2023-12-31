import './App.scss';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { checkIfUserIsAuthenticatedFromLocalStorage } from './utils/AuthUtils';
import Layout from './components/Layout';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import LogIn from './pages/Login';
import UserProfile from './pages/UserProfile';

function App() {
  const initialAuthState = checkIfUserIsAuthenticatedFromLocalStorage();
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);

  useEffect(() => {
    // Check if the user is authenticated from local storage
    const storedAuthState = checkIfUserIsAuthenticatedFromLocalStorage();
    if (storedAuthState !== isAuthenticated) {
      setIsAuthenticated(storedAuthState);
    }
  }, [isAuthenticated]);

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/signup' element={<SignUp />} />
              <Route 
                path='/login' 
                element={<LogIn onLogin={() => setIsAuthenticated(true)} />} 
              />
              {/* <Route path='/user-profile/:pk' element={<UserProfile />} /> */}
              <Route path='/user-profile' element={<PrivateRoute isAuthenticated={isAuthenticated}><UserProfile /></PrivateRoute>} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
