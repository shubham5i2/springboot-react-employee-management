import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployeeService from "../services/EmployeeService"

const AddEmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')
    const navigate = useNavigate();
    const { id } = useParams();

    //save or update employee into database
    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = { firstName, lastName, emailId }

        if (id) {
            EmployeeService.updateEmployee(id, employee).then((response) => {
                navigate('/')
            }).catch(error => {
                console.log(error)
            })
        }
        else {
            EmployeeService.createEmployee(employee).then((response) => {
                navigate('/')
            }).catch(error => {
                console.log(error)
            })
        }
    }

    //get existing employee from database
    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((response) => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmailId(response.data.emailId)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    //set form title based add or update operation
    const title = () => {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        }
        else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {title()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label"> First Name :</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label"> Last Name :</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label"> Email Id :</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="Enter email Id"
                                        name="emailId"
                                        className="form-control"
                                        value={emailId}
                                        onChange={(e) => setEmailId(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="d-flex justify-content-md-between">
                                    <button className="btn btn-success" onClick={(e) => saveOrUpdateEmployee(e)} >Submit </button>
                                    <Link to="/" className="btn btn-danger"> Cancel </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployeeComponent