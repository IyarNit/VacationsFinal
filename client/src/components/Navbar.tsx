import React from "react"
import { Link, withRouter } from "react-router-dom"
import Logout from "./Logout"
import { connect } from "react-redux"

const Navbar = (props: any) => {
    // console.log("Navbar",props)
    
    const token: string | null = localStorage.getItem("token")

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                {token && <a className="navbar-brand">Hello {props.currentUser.userName}</a>}
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item active">
                        {!token && <Link className="nav-link" to="/Register">Register</Link>}
                    </li>
                    <li className="nav-item active">
                        {!token && <Link className="nav-link" to="/Login">Login</Link>}
                    </li>
                    <li className="nav-item active">
                        <Logout />
                    </li>
                </ul>
            </nav>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        currentUser: state.currentUser,
    }
}

export default withRouter(connect(mapStateToProps)(Navbar))