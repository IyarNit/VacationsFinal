import React from "react"
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { noLongerAdmin } from '../store/actions/actionsConfig';
import { currentUser } from '../store/actions/actionsConfig';


const Logout = (props: any) => {
    // console.log("logout props",props)

    const onClickEvent = () => {
        props.dispatch(noLongerAdmin({
            isAdmin: false
        }))
        props.dispatch(currentUser({}))
        localStorage.removeItem("token")
        props.history.push("/")
    }

    const token: string | null = localStorage.getItem("token")
    if (!token) {
        return null
    }
    else {
        return (
            <div className="nav-link" onClick={onClickEvent} style={{ cursor: "pointer" }}>
                Logout
</div >
        )
    }
}


//     return (
//         <div className="nav-link" onClick={onClickEvent} style={{ cursor: "pointer" }}>
//             Logout
// </div >

//     )
// }

const mapStateToProps = (state: any) => {
    return {
        currentUser: state.currentUser,
        adminStatus: state.isAdmin
    }
}


export default withRouter(connect(mapStateToProps)(Logout))