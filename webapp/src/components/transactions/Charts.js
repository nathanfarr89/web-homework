import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import Chart from 'react-google-charts'
import { useQuery } from '@apollo/client'
import GetTransactions from '../../gql/transactions.gql'

const containerStyle = css`
  display: flex;
  justify-content: space-around;
`

const headerStyle = css`
  text-align: center;
`

export function Charts () {
  const { loading, error, data = {} } = useQuery(GetTransactions)

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
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }
  const categories = []
  data.transactions.map(tx => {
    categories.push({ description: tx.description, amount: tx.amount })
  })
  let holder = {}
  categories.forEach(function (d) {
    if (holder.hasOwnProperty(d.description)) {
      holder[d.description] = holder[d.description] + d.amount
    } else {
      holder[d.description] = d.amount
    }
  })
  let chartData = [['Description', 'Amount']]
  for (var prop in holder) {
    chartData.push([prop, holder[prop]])
  }

  const categories2 = []
  data.transactions.map(tx => {
    categories2.push({ user_id: tx.user_id, amount: tx.amount })
  })
  let holder2 = {}
  categories2.forEach(function (d) {
    if (holder2.hasOwnProperty(d.user_id)) {
      holder2[d.user_id] = holder2[d.user_id] + d.amount
    } else {
      holder2[d.user_id] = d.amount
    }
  })
  let chartData2 = [['Employee', 'Amount']]
  for (var prop2 in holder2) {
    chartData2.push([prop2, holder2[prop2]])
  }

  const categories3 = []
  data.transactions.map(tx => {
    categories3.push({ merchant_id: tx.merchant_id, amount: tx.amount })
  })
  let holder3 = {}
  categories3.forEach(function (d) {
    if (holder3.hasOwnProperty(d.merchant_id)) {
      holder3[d.merchant_id] = holder3[d.merchant_id] + d.amount
    } else {
      holder3[d.merchant_id] = d.amount
    }
  })
  let chartData3 = [['Employee', 'Amount']]
  for (var prop3 in holder3) {
    chartData3.push([prop3, holder3[prop3]])
  }
  return (
    <Fragment>
      <h1 css={headerStyle}>Expense Breakdown</h1>
      <div css={containerStyle}>
        <Chart
          chartType='PieChart'
          data={chartData}
          height={'300px'}
          loader={<div>Loading Chart</div>}
          options={{
            title: 'Expenses Per Description',
            backgroundColor: 'none'
          }}
          rootProps={{ 'data-testid': '1' }}
          width={'500px'}
        />
        <Chart
          chartType='PieChart'
          data={chartData2}
          height={'300px'}
          loader={<div>Loading Chart</div>}
          options={{
            title: 'Expenses Per Employee',
            backgroundColor: 'none'
          }}
          rootProps={{ 'data-testid': '1' }}
          width={'500px'}
        />
        <Chart
          chartType='PieChart'
          data={chartData3}
          height={'300px'}
          loader={<div>Loading Chart</div>}
          options={{
            title: 'Expenses Per Merchant',
            backgroundColor: 'none'
          }}
          rootProps={{ 'data-testid': '1' }}
          width={'500px'}
        />
      </div>
    </Fragment>
  )
}
