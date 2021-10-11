import React from 'react'
import { baseContainerStyle } from '../styles'

export function Base () {
  return (
    <div css={baseContainerStyle}>
      <h1>Company Expense Tracker</h1>
      <p>To begin, please use the Upload CSV function to upload the transactionSeed.csv and employeeSeed.csv files.</p>
    </div>
  )
}
