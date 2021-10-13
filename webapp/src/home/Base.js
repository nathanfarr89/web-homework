import React from 'react'
import { Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { baseContainerStyle } from '../styles'

export function Base () {
  const { data = {} } = useQuery(GetTransactions)

  if (Object.keys(data).length === 0 || data.transactions.length === 0) {
    return (
      <div css={baseContainerStyle}>
        <h1>Company Expense Tracker</h1>
        <p>To begin, please use the Upload CSV function to upload the transactionSeed.csv and employeeSeed.csv files.</p>
      </div>
    )
  }

  if (data.transactions.length > 0) {
    return <Redirect to='/transactions/standard' />
  }
}
