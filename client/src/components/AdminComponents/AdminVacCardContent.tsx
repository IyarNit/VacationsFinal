import React, { useState, useRef } from "react"
import { connect } from "react-redux"
import axios from "axios"
import { updateVacationsArr } from "../../store/actions/actionsConfig"
import { deleteVacations } from "../../store/actions/actionsConfig"
import editPng from "../../img/edit.png"
import Modal from "../modal2"

const VacCardContent = (props: any) => {
//     console.log("AdminVacCardContent", props)
    const [shower, setShower] = useState(false)

    const showModal = () => {
        setShower(true)
    }

    const hideModal = () => {
        setShower(false)

    }


    const [editnow, setEditnow] = useState(false);

    const description = useRef<HTMLInputElement>(null)
    const destination = useRef<HTMLInputElement>(null)
    const imgString = useRef<HTMLInputElement>(null)
    const from = useRef<HTMLInputElement>(null)
    const to = useRef<HTMLInputElement>(null)
    const departureFlight = useRef<HTMLInputElement>(null)
    const arrivalFlight = useRef<HTMLInputElement>(null)
    const price = useRef<HTMLInputElement>(null)



    const onClickEditEvent = async () => {
        if (!description.current?.value || !destination.current?.value || !imgString.current?.value || !from.current?.value || !to.current?.value || !departureFlight.current?.value || !arrivalFlight.current?.value || !price.current?.value) {
            alert("You have not filled all neccesery fields")
            return
        }
        try {
            const token: string | null = localStorage.getItem("token")
            const url: string = `http://localhost:4000/editVacations`
            const result: any = await axios.put(url, { description: description.current.value, destination: destination.current.value, img: imgString.current.value, from: from.current.value, to: to.current.value, departure: departureFlight.current.value, arrival: arrivalFlight.current.value, price: price.current.value, id: props.vac.idvacations }, { headers: { "Content-Type": "application/json", "authorization": token } })

            if (result.data.message === "vacation changed") {

                props.vac.description = description.current.value
                props.vac.destination = destination.current.value
                props.vac.img = imgString.current.value
                props.vac.from = from.current.value
                props.vac.to = to.current.value
                props.vac.departure = departureFlight.current.value
                props.vac.arrival = arrivalFlight.current.value
                props.vac.price = price.current.value

                setEditnow(false)

            }
        }
        catch (error) {
            console.log("error", error.message)
        }

    }

    const onClickDeleteEvent = async () => {
        try {
            const token: string | null = localStorage.getItem("token")
            const url: string = `http://localhost:4000/deleteVacations`
            const result: any = await axios.post(url, { id: props.vac.idvacations }, { headers: { "Content-Type": "application/json", "authorization": token } })
            if (result.data.message === "vacation deleted") {
                props.dispatch(deleteVacations(
                    { id: props.vac.idvacations }
                ))
            }
        } catch (error) {
            console.log("error", error.message)
        }

    }


    if (editnow === false) {
        return (
            <div className="card" style={{ width: "18rem", marginBottom: "20px", marginRight: "20px" }}>
                <img src={props.vac.img} className="card-img-top" alt="error loading img" />
                <div className="card-body myCard" >
                    {/* <h5 className="card-title">{props.vac.idvacations}</h5> */}
                    <h5 className="card-title">{props.vac.description}</h5>
                    <p className="card-text">{props.vac.destination}</p>
                    <p className="card-text">{props.vac.from}</p>
                    <p className="card-text">{props.vac.to}</p>
                    <p className="card-text">{props.vac.departure}</p>
                    <p className="card-text">{props.vac.arrival}</p>
                    <p className="card-text"> {props.vac.price} </p>
                    <p className="card-text">{props.vac.followers} followers</p>
                    <button title="Edit" className="btn btn-outline-primary admnBtn" onClick={() => setEditnow(true)}><img className="admnEditImg" src={editPng} />
                    </button>
                    <br />
                    <button title="Delete" className="btn btn-outline-danger admnBtn admndelete" onClick={showModal}>&#128465; </button>
                    <Modal show={shower} hide={hideModal} btn={"Cancel"} display={"inline-block"}>
                        Are you sure you wish to delete this vacation?
                        <br/>
                        <button type="button" className="btn btn-dark" style={{marginTop:"15px"}} onClick={onClickDeleteEvent}>Delete</button>
                    </Modal >
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="card" style={{ width: "18rem", marginBottom: "20px", marginRight: "20px" }}>
                <form>
                    <div className="form-group">
                        <input ref={description} type="text" className="form-control" placeholder={props.vac.description} />
                    </div>
                    <div className="form-group">
                        <input ref={destination} type="text" className="form-control" placeholder={props.vac.destination} />
                    </div>
                    <div className="form-group">
                        <input ref={imgString} type="text" className="form-control" placeholder={props.vac.img} />
                    </div>
                    <div className="form-group">
                        <input ref={from} type="text" className="form-control" placeholder={props.vac.from} />
                    </div>
                    <div className="form-group">
                        <input ref={to} type="text" className="form-control" placeholder={props.vac.to} />
                    </div>
                    <div className="form-group">
                        <label>Choose departure date</label>
                        <input ref={departureFlight} type="date" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Choose return flight date</label>
                        <input ref={arrivalFlight} type="date" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input ref={price} type="text" className="form-control" placeholder={props.vac.price} />
                    </div>
                    <button type="button" className="btn btn-dark admnBtn" onClick={onClickEditEvent}>Enter new Vacation</button>
                    <br />
                    <button type="button" className="btn btn-dark" onClick={() => setEditnow(false)}>Cancel</button>
                </form>
            </div>
        )

    }

}


const mapStateToProps = (state: any) => {
    return {
        currentUser: state.currentUser,
        adminStatus: state.isAdmin,
        vacations: state.vacations,

    }
}

export default connect(mapStateToProps)(VacCardContent)