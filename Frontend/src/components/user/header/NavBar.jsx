import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutDetails } from '../../../redux/userSlice';

function NavBar() {
  const { userName, id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogout = () => {
    dispatch(logoutDetails());
    navigate('/login');
  };
 

  return (
    <>
      <header className="font-monospace">
        <nav className="navbar bg-dark text-white py-4">
          <div className="container-fluid">
            <a onClick={()=>navigate('/')} className="navbar-brand px-5 text-white fs-4" style={{cursor:'pointer'}}>Server Management</a>

            {id ? (
              <div className="dropdown">
                <button className="btn btn-outline-light dropdown-toggle mx-5" data-bs-toggle="dropdown" aria-expanded="false">
                  {userName}
                </button>

                <ul className="dropdown-menu">
                  <li onClick={()=>navigate('/profile')} style={{ cursor: 'pointer' }}>
                    <a className="dropdown-item">My Profile</a>
                  </li>
                  <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <a className="dropdown-item">Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <button className="btn btn-outline-light mx-5" onClick={() => navigate('/login')}>
                Login
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
