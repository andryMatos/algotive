import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import jwtDecode from "jwt-decode";
import Home from './pages/home';
import Admin from './pages/admin';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from "./pages/dashboard";
import authService from "./services/auth-services";
import NotFound from "./pages/404";

let authenticate = false;
let roles = [];

if(localStorage.getItem('user')){

    const user = JSON.parse(localStorage.getItem('user'));

    const token = user.accessToken;

    const decoded = jwtDecode(token);

    const currenTime = Date.now() / 1000;

    if(decoded.exp < currenTime){
      authService.logout();
      window.location.href = '/login';
    }

    roles = user.roles;
    authenticate = true;

}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Algotive</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {
                authenticate && roles.includes("ROLE_ADMIN")
                ?
                <li className="nav-item">
                  <Link to={'/admin'} className="nav-link active" aria-current="page">Admin</Link>
                </li>
              : ""
              }

              {
                authenticate && roles.includes("ROLE_ADMIN")
                ?
                <li className="nav-item">
                  <Link to={'/user'} className="nav-link active" aria-current="page">Users</Link>
                </li>
              : ""
              }

              {
                authenticate ?
                <li className="nav-item">
                  <Link to={'/logout'} className="nav-link"  tabIndex="-1" onClick={()=>authService.logout()}>Logout</Link>
                </li>
              : <li className="nav-item">
                  <Link to={'/login'} className="nav-link"  tabIndex="-1">Login</Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={
          <ProtectedRoutes
            isAllowed={authenticate && roles.includes("ROLE_ADMIN")}
            redirectPath={'/dashboard'}>
              <Admin/>
          </ProtectedRoutes>
          }/>
        <Route path='/dashboard' element={
          <ProtectedRoutes
            isAllowed={authenticate}
            redirectPath={'/login'}>
              <Dashboard/>
          </ProtectedRoutes>
          }/>
          <Route path='/register' element={
          <ProtectedRoutes
            isAllowed={authenticate && roles.includes("ROLE_ADMIN")}
            redirectPath={'/dashboard'}>
              <Register/>
          </ProtectedRoutes>
          }/>
          <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
