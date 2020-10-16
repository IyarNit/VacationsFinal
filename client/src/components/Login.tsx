import React, { useRef } from 'react';
import { connect } from "react-redux"
import axios from "axios"
import { Link } from "react-router-dom"
import { currentUser } from '../store/actions/actionsConfig';
import { isAdmin } from '../store/actions/actionsConfig';


const Login = (props: any) => {
    // console.log("props Login", props)

    const emailInput = useRef<HTMLInputElement>(null)
    const userNameInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    const onClickEvent = async () => {
        if (!emailInput.current?.value || !userNameInput.current?.value || !passwordInput.current?.value) {
            alert("You have not filled all neccesery fields")
            return
        }
        try {
            const url = `http://localhost:4000/auth2/userLogin?email`
            const result: any = await axios.post(url, { email: emailInput.current.value, userName: userNameInput.current.value, password: passwordInput.current.value }, { headers: { "Content-Type": "application/json" } })
            if (result.data.message === "Login succesful") {
                props.dispatch(currentUser(result.data.user))
                const { token } = result.data
                localStorage.setItem("token", token)
                if (result.data.adminStatus === "admin") {
                    props.dispatch(isAdmin({
                        isAdmin: true
                    }))
                    props.history.push("/")
                } else {
                    props.history.push("/")
                }
            }
            else {
                alert(result.data.message)
            }
        }
        catch (error) {
            console.error("catch", error);
        }
    }

    return (
        <div className="jumbotron" style={{ marginTop: "30px" }}>
            <div className="container">
                <div className="col-8" style={{ margin: "auto" }}>
                    <h1>Login</h1>
                    <form>
                        <div className="form-group">
                            <input type="email" className="form-control" id="emailInput" placeholder="email" ref={emailInput} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="userNameInput" placeholder="userName" ref={userNameInput} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="passwordIput" placeholder="Password" ref={passwordInput} />
                        </div>
                        <div className="form-group form-check">
                            <Link to="/Register">Don't have a user? Click here to register</Link>
                        </div>
                        <div className="form-group form-check">
                            <Link to="/changePassword">Change Password</Link>
                        </div>
                        <button type="button" className="btn btn-dark" onClick={onClickEvent}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        currentUser: state.currentUser,
        followedVacations: state.followedVacations
    }
}
export default connect(mapStateToProps)(Login)