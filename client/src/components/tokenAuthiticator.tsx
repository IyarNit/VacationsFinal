
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom"
import axios from "axios"


export const withAuth = (WrappedComponent: any) => {
    return function (props: any) {
        const [status, setStatus] = useState("loading");

        useEffect(() => {
            const token: string | null = localStorage.getItem("token")
            const verify = async () => {
                const result = await axios.get("http://localhost:4000/auth2/tokenVerify", { headers: { "Content-Type": "application/json", "authorization": token } })
                const { status } = result.data;
                setStatus(status)
            }
            verify();
        }, [])
        if (!status) {

            localStorage.removeItem("token")
            return <Redirect to="/Login" />
        }
        return <WrappedComponent {...props} />
    }
}