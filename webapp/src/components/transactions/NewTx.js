import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'
import { css } from '@emotion/core'
import { Redirect } from 'react-router-dom'
import GetTransactions from '../../gql/transactions.gql'
import { debitCreditStyle, formStyle } from '../../styles'

const AddTransaction = gql`
    mutation AddTransaction($user_id: String, $description: String, $merchant_id: String, $debit: Boolean, $credit: Boolean, $amount: Float) {
      addTransaction(user_id: $user_id, description: $description, merchant_id: $merchant_id, debit: $debit, credit: $credit, amount: $amount) {
        id
      }
    }
  `

const headerStyle = css`
  text-align: center;
`

const NewTx = (props) => {
  const { setAddModal } = props
  const [redirect, setRedirect] = useState(false)
  const [formValues, setFormValues] = useState({
    userId: '',
    description: '',
    merchantId: '',
    txType: 'debit',
    amount: 0
  })
  const [addTransaction] = useMutation(AddTransaction)

  const onSubmit = (event) => {
    event.preventDefault()

    setAddModal(false)
    addTransaction({ variables: { 'user_id': formValues.userId, 'description': formValues.description, 'merchant_id': formValues.merchantId, 'debit': (formValues.txType === 'debit'), 'credit': (formValues.txType === 'credit'), 'amount': formValues.amount }, refetchQueries: [{ query: GetTransactions }] }).then(() => setRedirect(true))
  }

  if (redirect) {
    return <Redirect to='/transactions/standard' />
  }

  return (
    <div>
      <form css={formStyle} onSubmit={onSubmit}>
        <h3 css={headerStyle}>Add Transaction</h3>
        <ul>
          <li>
            <label htmlFor='userId'>User ID:</label>
            <input name='userId' onChange={event => setFormValues({ ...formValues, userId: event.target.value })} value={formValues.userId} />
          </li>
          <li>
            <label htmlFor='description'>Description:</label>
            <input name='description' onChange={event => setFormValues({ ...formValues, description: event.target.value })} value={formValues.description} />
          </li>
          <li>
            <label htmlFor='merchant_id'>Merchant:</label>
            <input name='merchantId' onChange={event => setFormValues({ ...formValues, merchantId: event.target.value })} value={formValues.merchantId} />
          </li>
          <div css={debitCreditStyle}>
            <li>
              <label htmlFor='debit'>Debit:</label>
              <input id='debit' name='type' onChange={event => setFormValues({ ...formValues, txType: event.target.value })} type='radio' value='debit' />
            </li>
            <li>
              <label htmlFor='credit'>Credit:</label>
              <input id='credit' name='type' onChange={event => setFormValues({ ...formValues, txType: event.target.value })} type='radio' value='credit' />
            </li>
          </div>
          <li>
            <label htmlFor='amount'>Amount:</label>
            <input name='amount' onChange={event => setFormValues({ ...formValues, amount: Number(event.target.value) })} type='number' value={formValues.amount} />
          </li>
          <li>
            <button type='submit'>Submit</button>
            <button onClick={() => setAddModal(false)}>Cancel</button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default NewTx

NewTx.propTypes = {
  setAddModal: PropTypes.func.isRequired
}
