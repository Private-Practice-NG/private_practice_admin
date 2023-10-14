import React from 'react'
import './styles/home.css'
import HomeUsers from '../components/HomeUsers'
import HomeAdmins from '../components/HomeAdmins'

const Home = () => {
  return (
    <div className="home">
        <div className="home-metrics">
            <div className="metric full-metric">
                <h3>Total job Posted</h3>
                <h1>1,126</h1>
            </div>
            <div className="metric full-metric metric-hospital">
                <h3>Hospital</h3>
                <h1>302</h1>
            </div>
            <div className="metric half-metric">
                <div className="half-metric-first">
                    <h4>Pending Jobs</h4>
                    <h2>110</h2>
                </div>
                <div className="metric half-metric-sec">
                    <h4>Completed Jobs</h4>
                    <h2>928</h2>
                </div>
            </div>
            <div className="metric full-metric metric-specialist">
                <h3>Hospital</h3>
                <h1>996</h1>
            </div>
            
        </div>
        <HomeUsers />
        <HomeAdmins  home={true} />
    </div>
  )
}

export default Home