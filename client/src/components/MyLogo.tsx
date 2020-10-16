import React from "react"
import logo from "../img/logo_transparent.png"

const myLogo = (props: any) => {
    // console.log("myLogo", props)

    return (
        <div className="container">
            <div className="row">
                <div className="col-8" >
                    <img className="logo" src={logo} alt="error" />
                </div>
            </div>
        </div>

    )

}

export default myLogo