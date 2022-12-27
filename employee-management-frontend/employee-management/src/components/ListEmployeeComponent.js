import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'
import EmployeeNotFound from '../components/EmployeeNotFound'

const ListEmployeeComponent = () => {

    const [employees, setemployees] = useState([])

    useEffect(() => {
        getAllEmployees()
    }, [])

    const deleteEmployee = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId).then((response) => {
            getAllEmployees()
        }).catch(error => {
            console.log(error)
        })
    }

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees()
            .then((response) => {
                setemployees(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div className='container'>
            <br /><br />
            <h2 className='text-center'>List of Employees</h2>
            <Link to='/add-employee' className='btn btn-primary mb-2'>Add Employee</Link><br />
            {employees.length > 0 ?
                <div>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <th>Employee Id</th>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email Id</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {
                                employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.emailId}</td>
                                            <td>
                                                <Link className='btn btn-warning' to={`/edit-employee/${employee.id}`}>Update</Link>
                                                <button className='btn btn-danger mx-4' onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                : <EmployeeNotFound />}
        </div>
    )
}

export default ListEmployeeComponent