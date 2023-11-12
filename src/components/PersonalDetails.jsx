import React from 'react'
import "./styles/personaldetails.css"
const PersonalDetails = ({data}) => {
  return (
    <div className='personal-details'>
        <div className="person-details-info">
            <h3>Personal Information</h3>
            <div className="personal-details-info-fields">
                <div className="personal-details-info-field">
                    <h4>FULL NAME</h4>
                    <p>{data?.firstName} {data?.middleName} {data?.lastName}</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>PHONE NUMBER</h4>
                    <p>{data?.phoneNumber ? data?.phoneNumber : "None"}</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>EMAIL ADDRESS</h4>
                    <p>{data?.email}</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>Years In Practice</h4>
                    <p>{data?.yearsInPractice  ? data?.yearsInPractice : "None"}</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>GENDER</h4>
                    <p>{data?.sex ? data?.sex : "None"}</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>Specialisation</h4>
                    <p>{data?.specialisation ? data?.specialisation : "None"}</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>City</h4>
                    <p>{data?.locationData.city ? data?.locationData.city : "None"}</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>State</h4>
                    <p>{data?.locationData.state ? data?.locationData.state : "None"}</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>Address</h4>
                    <p>{data?.locationData.address ? data?.locationData.address : "None"}</p>
                </div>
            </div>
        </div>
        <div className="person-details-info">
            <h3>Verification</h3>
            <div className="personal-details-info-fields">
                <div className="personal-details-info-field">
                    <h4>Email</h4>
                    <p>{data?.verified.email ? "Verified" : "Not Verified"}</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>Phone</h4>
                    <p>{data?.verified.phone ? "Verified" : "Not Verified"}</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>Profile</h4>
                    <p>{data?.verified.profile ? "Verified" : "Not Verified"}</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>Certificate</h4>
                    <p>{data?.verified.certificate ? "Verified" : "Not Verified"}</p>
                </div>
            </div>
        </div>
        {/* <div className="person-details-info">
            <h3>Education and Certificates</h3>
            <div className="personal-details-info-fields">
                <div className="personal-details-info-field">
                    <h4>Secondary School Document</h4>
                    <p>Self Employed</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>Practicing License Document</h4>
                    <p>Medical</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>Nysc Document</h4>
                    <p>davidpaul@privatepractice.com</p>
                </div>
                <div className="personal-details-info-field">
                    <h4>Specialization Document</h4>
                    <p>₦200,000.00</p>
                </div>
            </div>
        </div> */}
    </div>
  )
}

export default PersonalDetails