import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import axios from "axios"
import UserVacCardContent from "./UserVacCardContent"
import { showVacatios } from "../../store/actions/actionsConfig"
import { updateFollowedVacations } from "../../store/actions/actionsConfig"
import { withAuth } from "../tokenAuthiticator"
import { withRouter } from "react-router-dom"


const ViewVacations = (props: any) => {
    // console.log("UserViewVacations", props)



    useEffect(() => {
        const onInit = async () => {
            try {
                const token: string | null = localStorage.getItem("token")
                const url: string = "http://localhost:4000/getVacations"
                const result: any = await axios.get(url, { headers: { "Content-Type": "application/json", "authorization": token } })
                const url2: string = `http://localhost:4000/likeVacations?userId=${props.currentUser.idusers}`
                const result2: any = await axios.get(url2, { headers: { "Content-Type": "application/json", "authorization": token } })
                const userLikedVacations: Array<object> = result2.data.message
                props.dispatch(updateFollowedVacations(
                    userLikedVacations
                ))
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

    const [search, setSearch] = useState("")

    const searcher = (e: any) => {
        setSearch(e.target.value)
    }

    const byDest = (vacation: any) => {
        return vacation.destination.toLowerCase().includes(search.toLowerCase())
    }

    const likeSorter = (a: any, b: any) => {
        let lv: any = props.likedVacations.find((c: any) => { return c.idvacations === a.idvacations })
        let v: any = props.likedVacations.find((d: any) => { return d.idvacations === b.idvacations })
        v = v ? 1 : 0;
        lv = lv ? 1 : 0;
        return v - lv
    }

    const cardContents: any = props.vacations.sort(likeSorter).filter(byDest).map((card: any) => { return <UserVacCardContent vac={card} /> })

    return (
        <div className="container" style={{ marginTop: "50px" }}>
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
    )
}

const mapStateToProps = (state: any) => {
    return {
        currentUser: state.currentUser,
        vacations: state.vacations,
        adminStatus: state.isAdmin,
        likedVacations: state.likedVacations
    }
}

export default withAuth(withRouter(connect(mapStateToProps)(ViewVacations)))






