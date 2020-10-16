import React, { useState } from "react"
import { connect } from "react-redux"
import AdminVacCardContent from "./AdminVacCardContent"
import { Link } from "react-router-dom"
import { withAuth } from "../tokenAuthiticator"


const ViewVacations = (props: any) => {
    // console.log("adminViewVacations", props)

    const [search, setSearch] = useState("")

    const searcher = (e: any) => {
        setSearch(e.target.value)
    }

    const byDest = (vacation: any) => {
        return vacation.destination.toLowerCase().includes(search.toLowerCase())
    }

    const cardContents: any = props.vacations.filter(byDest).map((card: any) => { return <AdminVacCardContent vac={card} /> })
 
    return (
        <div className="jumbotron" style={{ marginTop: "30px" }}>
            <div className="container">
                <h1 className="vacationsHeader">Admin Vacations</h1>
                <Link style={{ color: "white" }} to="/"><button className="btn btn-dark backBtn"> Back</button></Link>
                <div className="row">
                    <div style={{ margin: "auto", marginBottom: "30px" }}>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control" type="search" placeholder="Search by destination" onChange={searcher} />
                        </form>
                    </div>
                    <div className="col-16" style={{ width: "1000px", position: "relative", flexDirection: "row", marginLeft: "auto" }}>
                        <div className="container row">
                            {cardContents}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state: any) => {
    return {
        currentUser: state.currentUser,
        vacations: state.vacations,
        adminStatus: state.isAdmin,
    }
}

export default withAuth(connect(mapStateToProps)(ViewVacations))






