import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { CSVReader } from 'react-papaparse'
import { gql, useMutation } from '@apollo/client'
import GetTransactions from '../../gql/transactions.gql'
import GetUsers from '../../gql/users.gql'
import { uploadBrowse, uploadButton, uploadCloseStyle, uploadContainerStyle, uploadHeaderStyle, uploadRadioStyle, uploadFormStyle } from '../../styles'

const buttonRef = React.createRef()

const AddTransaction = gql`
    mutation AddTransaction($user_id: String, $description: String, $merchant_id: String, $debit: Boolean, $credit: Boolean, $amount: Float) {
      addTransaction(user_id: $user_id, description: $description, merchant_id: $merchant_id, debit: $debit, credit: $credit, amount: $amount) {
        id
      }
    }
  `

const AddUser = gql`
  mutation AddUser($firstName: String, $lastName: String, $dob: String, $employeeNumber: String, $tenure: String, $budget: String) {
    addUser(firstName: $firstName, lastName: $lastName, dob: $dob, employeeNumber: $employeeNumber, tenure: $tenure, budget: $budget) {
      id
    }
  }
`

const Upload = (props) => {
  const { close } = props
  const [addTransaction] = useMutation(AddTransaction)
  const [addUser] = useMutation(AddUser)
  const [error, setError] = useState(false)
  const [submitType, setSubmitType] = useState('transactions')

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const handleOnFileLoad = (data) => {
    if (submitType === 'transactions' && data[0].data[0] === 'transactions') {
      data.shift()
      data.map(d => {
        addTransaction({ variables: { 'user_id': d.data[0], 'description': d.data[1], 'merchant_id': d.data[2], 'debit': (d.data[3] === 'TRUE'), 'credit': (d.data[4] === 'TRUE'), 'amount': Number(d.data[5]) }, refetchQueries: [{ query: GetTransactions }] })
      })
        .then(close(false))
    }

    if (submitType === 'employees' && data[0].data[0] === 'employees') {
      data.shift()
      data.map(d => {
        addUser({ variables: { 'firstName': d.data[0], 'lastName': d.data[1], 'dob': d.data[2], 'employeeNumber': d.data[3], 'tenure': d.data[4], 'budget': d.data[5] }, refetchQueries: [{ query: GetUsers }] })
      })
        .then(close(false))
    }

    close(false)
  }

  const handleOnError = (err) => {
    if (err) {
      setError(true)
    }
  }

  if (error) {
    return (
      <Fragment>
        There was an error loading data. Please make sure you have selected the correct data type
      </Fragment>
    )
  }

  return (
    <div css={uploadContainerStyle}>
      <button css={uploadCloseStyle} onClick={() => close(false)}>x</button>
      <h3 css={uploadHeaderStyle}>Upload CSV</h3>
      <CSVReader
        noClick
        noDrag
        onError={handleOnError}
        onFileLoad={handleOnFileLoad}
        ref={buttonRef}
      >
        {({ file }) => (
          <div
            css={uploadFormStyle}
          >
            <button
              css={uploadButton}
              onClick={handleOpenDialog}
              type='button'
            >
              Browse File
            </button>
            <div
              css={uploadBrowse}
            >
              {file && file.name}
            </div>
          </div>
        )}
      </CSVReader>
      <div css={uploadRadioStyle} onChange={(e) => setSubmitType(e.target.value)}>
        <div>
          <input defaultChecked id='transactions' name='submitType' type='radio' value='transactions' />
          <label htmlFor='html'>Transactions</label><br />
        </div>
        <div>
          <input id='employees' name='submitType' type='radio' value='employees' />
          <label htmlFor='css'>Employees</label><br />
        </div>
      </div>
    </div>
  )
}

export default Upload

Upload.propTypes = {
  close: PropTypes.func.isRequired
}
