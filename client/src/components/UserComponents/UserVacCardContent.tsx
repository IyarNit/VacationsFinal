import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import axios from "axios"
import { showVacatios } from "../../store/actions/actionsConfig"
import { updateFollowedVacations } from "../../store/actions/actionsConfig"

const UserVacCardContent = (props: any) => {
    // console.log("UserVacCardContent", props)

    const [likeClick, setLikeClick] = useState(false);

    const finder: any = props.likedVacations.find((value: any) => { return value.idvacations === props.vac.idvacations })

    const onClickEvent = async () => {
        try {
            if (finder) setLikeClick(false)
            if (!finder) setLikeClick(true)
            const token: string | null = localStorage.getItem("token")
            const url: string = `http://localhost:4000/likeVacations`
            const result: any = await axios.post(url, { userId: props.currentUser.idusers, vacationId: props.vac.idvacations, add: !!finder }, { headers: { "Content-Type": "application/json", "authorization": token } })
            props.dispatch(updateFollowedVacations(
                result.data.items
            ))
            props.dispatch(showVacatios(
                result.data.vacations
            ))
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <div className="card" style={{ width: "18rem", marginBottom: "20px", marginRight: "20px" }}>
            <img src={props.vac.img} className="card-img-top" alt="error loading img" />
            <div className="card-body myCard">
                <h5 className="card-title">{props.vac.description}</h5>
                <p className="card-text">{props.vac.destination}</p>
                <p className="card-text">{props.vac.from}</p>
                <p className="card-text">{props.vac.to}</p>
                <p className="card-text">{props.vac.departure}</p>
                <p className="card-text">{props.vac.arrival}</p>
                <p className="card-text"> {props.vac.price} </p>
                <p className="card-text">{props.vac.followers} followers</p>
                <p className="card-text" onClick={onClickEvent}><i className={finder ? "fa fa-thumbs-up colorBlue" : "fa fa-thumbs-up"}></i></p>
            </div>
        </div >
    )
}

const mapStateToProps = (state: any) => {
    return {
        currentUser: state.currentUser,
        adminStatus: state.isAdmin,
        vacations: state.vacations,
        likedVacations: state.likedVacations
    }
}

export default connect(mapStateToProps)(UserVacCardContent)