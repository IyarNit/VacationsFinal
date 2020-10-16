import React from "react"
import { Link } from "react-router-dom"


const AdminButtons = (props: any) => {

    // console.log("AdminButtons", props)

    return (
        <div className="card" style={{ width: "18rem", marginBottom: "20px", marginRight: "20px" }}>
            <Link to={props.btn.link}>
                <img src={props.btn.img} className="card-img-top myCard" alt="error loading img" />
                <div className="card-img-overlay">
                    <h5 className="card-title" style={{ color: props.btn.sty }}>{props.btn.title}</h5>
                </div>
            </Link>
        </div>
    )
}

export default AdminButtons