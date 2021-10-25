import React, { useState, useEffect, Fragment } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import GetUsers from '../../gql/users.gql'
import EmployeeCard from './employeeCard'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { alert, alertSuccess, closeBtn, employeesContainer, styles, tableContainerStyle, tableHeaderStyle, tableIconStyle, warningStyle } from '../../styles'

export const RemoveUser = gql`
    mutation RemoveUser($id: String) {
      removeUser(id: $id) {
        id
      }
    }
  `

const Employees = () => {
  const { loading, error, data = {} } = useQuery(GetUsers)
  const [displayEmployee, setDisplayEmployee] = useState(null)
  const [removeUser] = useMutation(RemoveUser)
  const [showDeleted, setShowDeleted] = useState(false)

  useEffect(() => {
    if (data.users) {
      setDisplayEmployee(data.users[0])
    }
    if (data.length === 0) {
      setShowDeleted(false)
    }
  }, [data])

  const onClick = (employee) => {
    setDisplayEmployee(employee)
  }

  const onEmployeeDelete = (id) => {
    removeUser({ variables: { id }, refetchQueries: [{ query: GetUsers }] })
    setShowDeleted(true)
  }

  if (loading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error) {
    return (
      <Fragment>
        Error loading employees. Please try again.
      </Fragment>
    )
  }

  if (data.users.length === 0) {
    return (
      <div>
        <h2 css={warningStyle}>No employees found. Please seed database using the upload function and the employeeSeed.csv file</h2>
      </div>
    )
  }

  return (
    <div css={employeesContainer}>
      <div>
        <h1 css={tableHeaderStyle}>
          Employee Directory
        </h1>
        {showDeleted &&
        (
          <div css={[alert, alertSuccess]}>
            <span css={closeBtn} onClick={() => setShowDeleted(false)} onKeyDown={() => setShowDeleted(false)} role='button' tabIndex={0}>&times;</span>
            Sucessfully Deleted
          </div>
        )
        }
        <div>
          {(data) &&
            (
              <div css={tableContainerStyle}>
                <table css={styles}>
                  <thead>
                    <tr >
                      <th >First Name</th>
                      <th >Last Name</th>
                      <th >Date of Birth</th>
                      <th >Employee #</th>
                      <th >Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.users.map(employee => {
                        const { id, firstName, lastName, dob, employeeNumber } = employee
                        return (
                          <tr key={employeeNumber} onClick={() => onClick(employee)}>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{dob}</td>
                            <td>{employeeNumber}</td>
                            <td><button css={tableIconStyle} onClick={() => onEmployeeDelete(id)}><DeleteForeverIcon /></button></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>
      <EmployeeCard employeeData={displayEmployee} />
    </div>
  )
}

export default Employees
