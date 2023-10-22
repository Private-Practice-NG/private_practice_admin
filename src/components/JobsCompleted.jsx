import React from 'react'
import './styles/jobscompleted.css'
import "./styles/personaldetails.css"
import JobCompletedCard from './JobCompletedCard'
const JobsCompleted = () => {
  return (
    <div className='personal-details'>
        <div className="job-completed-cards">
            <JobCompletedCard />
            <JobCompletedCard />
            <JobCompletedCard />
            <JobCompletedCard />
        </div>
    </div>
  )
}

export default JobsCompleted