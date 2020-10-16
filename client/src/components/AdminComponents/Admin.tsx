import React, { useEffect } from "react"
import { connect } from "react-redux"
import { showVacatios } from "../../store/actions/actionsConfig"
import axios from "axios"
import AdminButtons from "./AdminButtons"
import apples from "../../img/apples.jpg"
import hands from "../../img/hands.jpg"
import graph from "../../img/graph.png"
import { withAuth } from "../tokenAuthiticator"
import { withRouter } from "react-router-dom"



const Admin = (props: any) => {
    // console.log("adminControl", props)

    useEffect(() => {
        const onInit = async () => {
            try {
                const token: string | null = localStorage.getItem("token")
                const url: string = "http://localhost:4000/getVacations"
                const result: any = await axios.get(url, { headers: { "Content-Type": "application/json", "authorization": token } })
                if (result.data.message = "Vacations Exists") {
                    props.dispatch(showVacatios(
                        result.data.vacationsArr
                    ))
                    return
                }
            }
            catch (error) {
                if (error.message === "Network Error") {
                    localStorage.removeItem("token")
                    props.history.push("/Login")
                }
            }
        }
        onInit()
    }, [])


    const myButtons: Array<any> = [{ title: "View Vacations", img: apples, link: "/AdminViewVacations", sty: "white" }, { title: "Enter New Vacations", img: hands, link: "/AdminVacationInputs", sty: "black" }, { title: "View Graphs", img: graph, link: "/graphs", sty: "black" }]

    const myButtonsMapper = myButtons.map((card: any) => { return <AdminButtons btn={card} /> })

    return (
        <div className="jumbotron" style={{ marginTop: "30px" }}>
            <div className="container">
                <h1 style={{ marginBottom: "20px" }}>Welcome, Admin</h1>
                <div className="col-12" style={{ width: "1000px", position: "relative", flexDirection: "row", margin: "auto" }}>
                    <div className="container row">
                        {myButtonsMapper}
                    </div>
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

export default withAuth(withRouter(connect(mapStateToProps)(Admin)))
