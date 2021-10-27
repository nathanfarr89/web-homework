import React, { useState, useEffect, Fragment } from 'react'
import { gql, useQuery } from '@apollo/client'
import GetUsers from '../../gql/users.gql'
import GetTransactions from '../../gql/transactions.gql'
import EmployeeCard from './EmployeeCard'
import { employeesContainer, styles, tableContainerStyle, tableHeaderStyle, warningStyle } from '../../styles'

export const RemoveUser = gql`
    mutation RemoveUser($id: String) {
      removeUser(id: $id) {
        id
      }
    }
  `

const Employees = () => {
  const { loading, error, data = {} } = useQuery(GetUsers)
  const transactions = useQuery(GetTransactions)
  const [displayEmployee, setDisplayEmployee] = useState(null)

  useEffect(() => {
    if (data.users) {
      setDisplayEmployee(data.users[0])
    }
  }, [data])

  const onClick = (employee) => {
    setDisplayEmployee(employee)
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
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.users.map(employee => {
                        const { firstName, lastName, dob, employeeNumber } = employee
                        return (
                          <tr key={employeeNumber} onClick={() => onClick(employee)}>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{dob}</td>
                            <td>{employeeNumber}</td>
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
      <EmployeeCard employeeData={displayEmployee} transactions={transactions.data} />
    </div>
  )
}

export default Employees
