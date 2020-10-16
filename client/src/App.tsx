import React, { useEffect, useState } from 'react';
import './App.css';
import "../src/myCss/loader.css"
import "../src/myCss/modal.css"
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import Login from "./components/Login"
import AdminVacationInputs from "./components/AdminComponents/AdminVacationInputs"
import AdminViewVacations from "./components/AdminComponents/AdminViewVacations"
import axios from "axios"
import { connect } from "react-redux"
import { currentUser, isAdmin, showVacatios } from "./store/actions/actionsConfig";
import ChangePassword from "./components/ChangePassword"
import Graphs from "./components/AdminComponents/Graphs"
import MyLogo from "./components/MyLogo"


const App = (props: any) => {
  // console.log("app props", props)

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onInit = async () => {
      const token: string | null = localStorage.getItem("token")
      if (!token) {
        console.log("unauthorized")
        setReady(true)
        props.history.push("/Login")
        return
      }
      try {

        const url: string = "http://localhost:4000/userIdentifier"
        const result: any = await axios.get(url, { headers: { "Content-Type": "application/json", "authorization": token } })
        if (result.data.message === "jwt expired") {
          console.log("exp")
          localStorage.removeItem("token")
          props.history.push("/")
          return setReady(true)
        }
        props.dispatch(currentUser(result.data.user))
        props.dispatch(showVacatios(
          result.data.vacationsArr
        ))
        if (result.data.user.role === "admin") {
          props.dispatch(isAdmin({
            isAdmin: true
          }))
        }
        setReady(true)
      }
      catch (error) {
        console.log("server error")
        if (error.message === "Network Error") {
          localStorage.removeItem("token")
          setReady(true)
        }
      }
    }

    onInit()
  }, [])

  if (!ready) return (
    <div className="App">
      <div className="loader">
      </div>
    </div>
  )

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <MyLogo />
        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/AdminVacationInputs" component={AdminVacationInputs} />
          <Route exact path="/AdminViewVacations" component={AdminViewVacations} />
          <Route exact path="/changePassword" component={ChangePassword} />
          <Route exact path="/graphs" component={Graphs} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}


const mapStateToProps = (state: any) => {
  return {
    currentUser: state.currentUser,
    vacations: state.vacations,
    adminStatus: state.isAdmin,
    likedVacations: state.likedVacations
  }
}

export default withRouter(connect(mapStateToProps)(App))

