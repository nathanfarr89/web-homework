import React, { Fragment, useState } from 'react'
import { CSVReader } from 'react-papaparse'
import { gql, useMutation } from '@apollo/client'
import { css } from '@emotion/core'
import GetTransactions from '../../gql/transactions.gql'

const buttonRef = React.createRef()

const AddTransaction = gql`
    mutation AddTransaction($user_id: String, $description: String, $merchant_id: String, $debit: Boolean, $credit: Boolean, $amount: Float) {
      addTransaction(user_id: $user_id, description: $description, merchant_id: $merchant_id, debit: $debit, credit: $credit, amount: $amount) {
        id
      }
    }
  `
const style = css`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`
const button = css`
  border-radius: 8px;
  background-color: #2374AB;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
`
const browse = css`
  background-color: #fff;
  border-radius: 8px;
  border-width: thin;
  border-style: solid;
  border-color: #2374AB;
  line-height: 2.5;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-left: 13px;
  padding-top: 3px;
  width: 40%;
`
const containerStyle = css`
  display: flex;
  flex-direction: column;
`
const headerStyle = css`
  display: flex;
  justify-content: flex-start;
`

export function Upload () {
  const [addTransaction] = useMutation(AddTransaction)
  const [error, setError] = useState(false)

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const handleOnFileLoad = (data) => {
    data.map(d => {
      addTransaction({ variables: { 'user_id': d.data[0], 'description': d.data[1], 'merchant_id': d.data[2], 'debit': (d.data[3] === 'TRUE'), 'credit': (d.data[4] === 'TRUE'), 'amount': Number(d.data[5]) }, refetchQueries: [{ query: GetTransactions }] })
    })
  }

  const handleOnError = (err) => {
    if (err) {
      setError(true)
    }
  }

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <div css={containerStyle}>
      <h3 css={headerStyle}>Upload CSV</h3>
      <CSVReader
        noClick
        noDrag
        onError={handleOnError}
        onFileLoad={handleOnFileLoad}
        ref={buttonRef}
      >
        {({ file }) => (
          <div
            css={style}
          >
            <button
              css={button}
              onClick={handleOpenDialog}
              type='button'
            >
              Browse File
            </button>
            <div
              css={browse}
            >
              {file && file.name}
            </div>
          </div>
        )}
      </CSVReader>
    </div>
  )
}
