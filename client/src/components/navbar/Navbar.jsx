import { useContext } from "react"
import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
const Navbar = () => {

  const { user } = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Agoda</span>
        </Link>

        {/* check user */}
        {user ?
          (<>
            <h1>{user.username}</h1>

          </>)
          :
          (
            <div className="navItems">
              <button className="navButton">Register</button>
              <button className="navButton">Login</button>
            </div>
          )



        }
      </div>
    </div>
  )
}

export default Navbar