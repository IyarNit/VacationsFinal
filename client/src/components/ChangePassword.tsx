import React, { useRef, useState } from 'react';
import { connect } from "react-redux"
import axios from 'axios';
import { Link } from "react-router-dom"
import Modal from "./modal2"


const Changer = (props: any) => {
    // console.log("props Login", props)

    const [show, setShow] = useState<any>({})

    const [shower, setShower] = useState(false)

    const hideModal = () => {
        setShower(false)
    }

    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    const onClickEvent = async () => {
        if (!emailInput.current?.value || !passwordInput.current?.value) {
            alert("You have not filled all neccesery fields")
            return
        }
        try {
            const url = `http://localhost:4000/changePass/changePassword?email`
            const result = await axios.post(url, { email: emailInput.current.value, password: passwordInput.current.value }, { headers: { "Content-Type": "application/json" } })
            if (result.data.message === "Change succesful") {
                setShower(true)
            }
            else {
                alert(result.data.message)
            }
        }
        catch (error) {
            console.error("catch", error);
        }
    }

    const toLogin = () => {
        props.history.push("/Login")
    }

    const valid = (e: any) => {
        setShow({ [e.target.id]: true })
    }

    return (
        <div className="jumbotron" style={{ marginTop: "30px" }}>
            <div className="container">
                <div className="col-8" style={{ margin: "auto" }}>
                    <h1>Change Password</h1>
                    <form>
                        <div className="form-group">
                            <input type="email" className="form-control" id="emailInput" placeholder="email" ref={emailInput} onFocus={valid} />
                            {show.emailInput && <small className="form-text text-muted">We'll never share your email with anyone else</small>}
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="passwordIput" placeholder="Password" ref={passwordInput} onFocus={valid} />
                            {show.passwordIput && <small className="form-text text-muted">Minimum 3 letters max 20. May Contain letters and numbers only</small>}
                        </div>
                        <button style={{ marginBottom: "25px" }} type="button" className="btn btn-dark" onClick={onClickEvent}>Update Password</button>
                        <br />
                        <Link style={{ color: "white" }} to="/Login"><button className="btn btn-dark backBtn" > Back</button></Link>
                    </form>
                    <Modal show={shower} hide={hideModal} btn={""} display={"none"}>
                        Change Successful, you are being redirected to the login page
                        <br />
                        <button type="button" className="btn btn-dark" style={{ marginTop: "15px", marginBottom: "15px" }} onClick={toLogin}>Ok</button>
                    </Modal >
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
export default connect(mapStateToProps)(Changer)