import React, { Fragment } from 'react'
import Chart from 'react-google-charts'
import { useQuery } from '@apollo/client'
import GetTransactions from '../../gql/transactions.gql'
import { chartsContainerStyle, chartsHeaderStyle, warningStyle } from '../../styles'

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
        There was an error fetching the data
      </Fragment>
    )
  }

  if (data.transactions.length === 0) {
    return (
      <div>
        <h2 css={warningStyle}>No Transactions Found. Please seed the database with upload function and the databaseSeed.csv file</h2>
      </div>
    )
  }

  // return object in format needed for chart
  const buildChartData = (holder) => {
    let chartData = [['Description', 'Amount']]
    for (var prop in holder) {
      chartData.push([prop, holder[prop]])
    }
    return chartData
  }

  // sums up amounts of unique categories
  const buildHolder = (categories) => {
    let holder = {}
    categories.forEach(function (d) {
      if (holder.hasOwnProperty(d.description)) {
        holder[d.description] = holder[d.description] + d.amount
      } else {
        holder[d.description] = d.amount
      }
    })
    return buildChartData(holder)
  }

  // creates array of only necessary data required for chart
  const buildCategories = (data, category) => {
    let arr = []
    data.transactions.map(tx => {
      arr.push({ description: tx[`${category}`], amount: tx.amount })
    })
    return buildHolder(arr)
  }

  const descriptionChartData = [buildCategories(data, 'description'), 'Description']
  const employeeChartData = [buildCategories(data, 'user_id'), 'Employee']
  const merchantChartData = [buildCategories(data, 'merchant_id'), 'Merchant']

  const charts = [descriptionChartData, employeeChartData, merchantChartData]

  return (
    <div>
      <h1 css={chartsHeaderStyle}>Expense Breakdown</h1>
      <div css={chartsContainerStyle}>
        {charts.map(chart => {
          return (
            <Chart
              chartType='PieChart'
              data={chart[0]}
              height={'300px'}
              key={chart[1]}
              loader={<div>Loading Chart</div>}
              options={{
                title: `Expenses Per ${chart[1]} `,
                backgroundColor: 'none'
              }}
              rootProps={{ 'data-testid': '1' }}
              width={'500px'}
            />
          )
        })}
      </div>
    </div>
  )
}
