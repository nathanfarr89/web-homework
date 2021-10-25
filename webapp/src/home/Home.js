import React, { Fragment } from 'react'
import { PropTypes } from 'prop-types'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import GetUsers from '../gql/users.gql'
import TxTable from '../components/transactions/TxTable'

export function Home (props) {
  const { match } = props
  const emptyParams = Object.keys(match.params).length === 0 && match.params.constructor === Object
  const version = (emptyParams || match.params.version === 'standard') ? 'standard' : 'roman'
  const { loading, error, data = {} } = useQuery(GetTransactions)
  const userData = useQuery(GetUsers)

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
        Error loading application. Please try again.
      </Fragment>
    )
  }

  return (
    <Fragment>
      <TxTable data={data.transactions} userData={userData} version={version} />
    </Fragment>
  )
}

Home.propTypes = {
  match: PropTypes.instanceOf(Object)
}
