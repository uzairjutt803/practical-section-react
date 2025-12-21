import { Space } from "antd";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/Auth";

const Navbar = () => {
  const { handleLogout, isAuth } = useAuthContext();

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Navbar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="d-flex">
                {isAuth ? (
                  <Space>
                    <Link to="/dashboard/add" className="btn btn-info">
                      Dashboard
                    </Link>
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </Space>
                ) : (
                  <Space>
                    <Link to="/auth/register" className="btn btn-info">
                      Register
                    </Link>
                    <Link to="/auth/login" className="btn btn-success">Login</Link>
                  </Space>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
