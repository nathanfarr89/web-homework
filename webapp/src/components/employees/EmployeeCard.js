import React from 'react'
import PropTypes from 'prop-types'
import { employee, employeeCard, profilePic } from '../../styles'

const EmployeeCard = (props) => {
  const { employeeData, transactions } = props

  const getRemainingBudget = (budget) => {
    let total = 0
    transactions.transactions.map(transaction => {
      if (transaction.user_id === employeeData.employeeNumber) {
        transaction.debit ? total += transaction.amount : total -= transaction.amount
      }
    })

    return parseInt(budget) + total
  }

  if (!employeeData) return null

  return (
    <div css={employeeCard} data-testid={`employee-${employeeData.id}`}>
      <h1>Employee Details</h1>
      <div css={employee}>
        <h2 css={profilePic}>{employeeData.firstName[0]}{employeeData.lastName[0]}</h2>
        <p>{employeeData.firstName} {employeeData.lastName}</p>
        <p>ID: {employeeData.employeeNumber}</p>
        <p>Years of Service: {employeeData.tenure}</p>
        <p>Remaining Budget: ${getRemainingBudget(employeeData.budget)}</p>
      </div>
    </div>
  )
}

export default EmployeeCard

EmployeeCard.propTypes = {
  employeeData: PropTypes.instanceOf(Object),
  transactions: PropTypes.instanceOf(Object)
}
