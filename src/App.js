import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/home'
import AddPage from './pages/add'
import UpdatePage from './pages/update'
function App() {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className='nav-link' to="/"> Home </Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to="/add"> Add </Link>
            </li>
            {/* <li className="nav-item">
              <Link className='nav-link' to="/update"> Update </Link>
            </li> */}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>

    </>
  );
}

export default App;
