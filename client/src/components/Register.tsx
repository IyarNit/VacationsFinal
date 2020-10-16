import React, { useRef, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Modal from "./modal2"
const Register = (props: any) => {
    // console.log("props Register", props)

    const [show, setShow] = useState<any>({})

    const [shower, setShower] = useState(false)

    const hideModal = () => {
        setShower(false)
    }

    const firstNameInput = useRef<HTMLInputElement>(null)
    const lastNameInput = useRef<HTMLInputElement>(null)
    const emailInput = useRef<HTMLInputElement>(null)
    const userNameInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    const onClickEvent = async () => {
        if (!firstNameInput.current?.value || !lastNameInput.current?.value || !emailInput.current?.value || !userNameInput.current?.value || !passwordInput.current?.value) {
            alert("You have not filled all neccesery fields")
            return
        }
        try {
            const url = `http://localhost:4000/auth/register`
            const result: { data: { message: string } } = await axios.post(url, { firstName: firstNameInput.current.value, lastName: lastNameInput.current.value, email: emailInput.current.value, userName: userNameInput.current.value, password: passwordInput.current.value }, { headers: { "Content-Type": "application/json" } })
            if (result.data.message === "register Success") {
                setShower(true)
            }
            else {
                alert(result.data.message)
            }
        }
        catch (error) {
            console.log("Register Catch error", error)
        }
    }

    const valid = (e: any) => {
        setShow({ [e.target.id]: true })
    }

    const toLogin = () => {
        props.history.push("/Login")
    }

    return (
        <div className="jumbotron" style={{ marginTop: "30px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-8" style={{ margin: "auto" }}>
                        <h1>Register</h1>
                        <form>
                            <div className="form-group">
                                <input ref={firstNameInput} type="text" className="form-control" id="firstNameInput" placeholder="Enter First Name" onFocus={valid} />
                                {show.firstNameInput && <small id="first" className="form-text text-muted">Minimum 3 letters maximum 20. no numbers</small>}
                            </div>
                            <div className="form-group">
                                <input ref={lastNameInput} type="text" className="form-control" id="lastNameInput" placeholder="Enter Last Name" onFocus={valid} />
                                {show.lastNameInput && <small id="emaillastHelp" className="form-text text-muted">Minimum 3 letters maximum 20. no numbers</small>}
                            </div>
                            <div className="form-group">
                                <input ref={emailInput} type="email" className="form-control" id="emailInput" placeholder="Enter email" onFocus={valid} />
                                {show.emailInput && <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>}
                            </div>
                            <div className="form-group">
                                <input ref={userNameInput} type="text" className="form-control" id="UserNameInput" placeholder="UserName" onFocus={valid} />
                                {show.UserNameInput && <small id="user" className="form-text text-muted">Minimum 3 letters max 20. May Contain letters and numbers only</small>}
                            </div>
                            <div className="form-group">
                                <input ref={passwordInput} type="password" className="form-control" id="passwordInput" placeholder="Password" onFocus={valid} />
                                {show.passwordInput && <small id="pass" className="form-text text-muted">Minimum 3 letters max 20. May Contain letters and numbers only</small>}
                            </div>
                            <div className="form-group form-check">
                                <p> <Link to="/Login">Already have a user? Click to login</Link></p>
                            </div>
                            <button type="button" className="btn btn-dark" onClick={onClickEvent} >Register</button>
                        </form>
                        <Modal show={shower} hide={hideModal} btn={""} display={"none"}>
                            Register Successful, you are being redirected to the login page
                        <br />
                            <button type="button" className="btn btn-dark" style={{ marginTop: "15px", marginBottom: "15px" }} onClick={toLogin}>Ok</button>
                        </Modal >
                    </div>
                </div>
            </div>
        </div>
    )
}





export default Register