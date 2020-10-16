import React, { useRef, useState } from 'react';
import axios from "axios"
import { connect } from "react-redux"
import { newVacation } from "../../store/actions/actionsConfig"
import { Link } from "react-router-dom"
import { withAuth } from "../tokenAuthiticator"
import Modal from "../modal2"


const VacationInputs = (props: any) => {

    const [shower, setShower] = useState(false)

    const showModal = () => {
        setShower(true)
    }

    const hideModal = () => {
        setShower(false)

    }

    const description = useRef<HTMLInputElement>(null)
    const destination = useRef<HTMLInputElement>(null)
    const imgString = useRef<HTMLInputElement>(null)
    const from = useRef<HTMLInputElement>(null)
    const to = useRef<HTMLInputElement>(null)
    const departureFlight = useRef<HTMLInputElement>(null)
    const arrivalFlight = useRef<HTMLInputElement>(null)
    const price = useRef<HTMLInputElement>(null)
    let currentSign: string = "$"
    const symbols: Array<object> = [{ symbol: "$" }, { symbol: "€" }, { symbol: "₪" }]


    const onClickEvent = async () => {
        if (!description.current?.value || !destination.current?.value || !imgString.current?.value || !from.current?.value || !to.current?.value || !departureFlight.current?.value || !arrivalFlight.current?.value || !price.current?.value) {
            alert("You have not filled all neccesery fields")
            return
        }
        try {
            const token: string | null = localStorage.getItem("token")
            const url: string = `http://localhost:4000/vacations`
            const result: any = await axios.post(url, { description: description.current.value, destination: destination.current.value, img: imgString.current.value, from: from.current.value, to: to.current.value, departureFlight: departureFlight.current.value, arrivalFlight: arrivalFlight.current.value, price: price.current.value + currentSign }, { headers: { "Content-Type": "application/json", "authorization": token } })
            if (result.data.message === "vacation added!") {
                props.dispatch(newVacation({
                    description: description.current.value,
                    destination: destination.current.value,
                    imgString: imgString.current.value,
                    from: from.current.value,
                    to: to.current.value,
                    price: price.current.value + currentSign
                }))
                setShower(true)
            }
        }
        catch (error) {
            console.log("error", error)
        }
    }

    const selectValue = (e: any) => {
       
        return currentSign
    }

    const toHome = () => {
        props.history.push("/")
    }

    return (
        <div className="jumbotron" style={{ marginTop: "30px" }}>
            <div className="container">
                <div className="col-8" style={{ margin: "auto" }}>
                    <h3 className="vacationsHeader">Enter New Vacation</h3>
                    <Link style={{ color: "white" }} to="/"> <button className="btn btn-dark backBtn" > Back</button></Link>
                    <form>
                        <div className="form-group">
                            <input ref={description} type="text" className="form-control" placeholder="Enter Vacation Description" />
                        </div>
                        <div className="form-group">
                            <input ref={destination} type="text" className="form-control" placeholder="Enter Vacation Destination" />
                        </div>
                        <div className="form-group">
                            <input ref={imgString} type="text" className="form-control" placeholder="Enter Image URL" />
                        </div>
                        <div className="form-group">
                            <input ref={from} type="text" className="form-control" placeholder="From" />
                        </div>
                        <div className="form-group">
                            <input ref={to} type="text" className="form-control" placeholder="To" />
                        </div>
                        <div className="form-group">
                            <label>Choose departure date:</label>
                            <input ref={departureFlight} type="date" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Choose return flight date:</label>
                            <input ref={arrivalFlight} type="date" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input ref={price} type="number" className="form-control" placeholder="Price" />
                        </div>
                        <div className="form-group" onChange={selectValue} >
                            <select className="form-control" >
                                {symbols.map((x: any) => { return <option>{x.symbol}</option> })}
                            </select>
                        </div>
                        <button type="button" className="btn btn-dark" onClick={onClickEvent}>Enter new Vacation</button>
                    </form>
                    <Modal show={shower} hide={hideModal} btn={""} display={"none"}>
                        Vacation added
                        <br />
                        <button type="button" className="btn btn-dark" style={{ marginTop: "15px", marginBottom: "15px" }} onClick={toHome}>Ok</button>
                    </Modal >
                </div>
            </div>
        </div>


    )

}



const mapStateToProps = (state: any) => {
    return {
        currentUser: state.currentUser,
        adminStatus: state.isAdmin,
        vacations: state.vacations
    }
}

export default withAuth(connect(mapStateToProps)(VacationInputs))