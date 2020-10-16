import React from 'react';
import { connect } from "react-redux"
import Admin from "./AdminComponents/Admin"
import UserViewVacations from "./UserComponents/UserViewVacations"


const Home = (props: any) => {
    // console.log("props Home", props)

    const token: string | null = localStorage.getItem("token")

    if (!token) {
        return (
            <div className="jumbotron" style={{ marginTop: "30px" }}>
                <div className="container">
                    <div className="col-8" style={{margin: "auto" }}>
                        <h1>Welcome to ReactionTours™!</h1>
                        <h3>Please login or register view our offerings!</h3>
                    </div>
                </div>
            </div>
        )
    }
    if (props.adminStatus === true) {
        return (
            <div>
                <Admin />
            </div>
        )
    }
    else {
        return (
            <div className="jumbotron" style={{ marginTop: "30px" }}>
                <div className="container">
                    <div className="col-16">
                        <h1>Choose Your Vacation!</h1>
                        <UserViewVacations />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        currentUser: state.currentUser,
        adminStatus: state.isAdmin
    }
}


export default connect(mapStateToProps)(Home)