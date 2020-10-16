import React from "react"
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import cssColorsArray from "../../cssColors.json"
import { withAuth } from "../tokenAuthiticator"

const graphs = (props: any) => {

    // console.log("graphs props", props)

    const vacations: Array<string> = props.vacations.map((x: any) => { return x.destination })
    const likeAmount: Array<string> = props.vacations.map((x: any) => { return x.followers })
    const random: number = Math.floor(Math.random() * 21)
    const legendPosition: string = 'right'
    const displayLegend: boolean = false;
    const displayTitle: boolean = true;


    const chartData: object = {
        labels: vacations,
        datasets: [
            {
                label: "Vacations",
                data: likeAmount,
                backgroundColor: vacations.map(v => {
                    const random: number = Math.floor(Math.random() * 21)
                    return cssColorsArray[random]
                }),
                hoverBackgroundColor: cssColorsArray[random - 5]
            }
        ]
    }

    return (
        <div className="jumbotron" style={{ marginTop: "30px" }}>
            <div className="container">
                <div className="col-12">
                    <div className="chart" style={{ height: "1000px" }}>
                        <Link style={{ color: "white" }} to="/">  <button className="btn btn-dark" style={{ marginBottom: "15px" }} > Back</button></Link>
                        <Bar
                            data={chartData}
                            options={{
                                title: {
                                    display: displayTitle,
                                    text: "Most Liked Vacations",
                                    fontSize: 25
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                        }
                                    }]
                                },
                                legend: {
                                    display: displayLegend,
                                    position: legendPosition
                                }
                            }}
                        />
                    </div >
                </div >
            </div >
        </div >
    )
}

const mapStateToProps = (state: any) => {
    return {
        vacations: state.vacations
    }
}

export default withAuth(connect(mapStateToProps)(graphs))
