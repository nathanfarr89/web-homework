import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'
import { css } from '@emotion/core'
import GetTransactions from '../../gql/transactions.gql'
import { Redirect } from 'react-router-dom'

const EditTransaction = gql`
    mutation EditTransaction($id: String, $user_id: String, $description: String, $merchant_id: String, $debit: Boolean, $credit: Boolean, $amount: Float) {
      editTransaction(id: $id, user_id: $user_id, description: $description, merchant_id: $merchant_id, debit: $debit, credit: $credit, amount: $amount) {
        id
        user_id
        description
        merchant_id
        debit
        credit
        amount
      }
    }
  `

const EditTx = (props) => {
  const { editForm, setEditModal } = props
  const [formValues, setFormValues] = useState({
    id: '',
    userId: '',
    description: '',
    merchantId: '',
    txType: 'debit',
    amount: 0
  })
  const [redirect, setRedirect] = useState(false)
  const [editTransaction] = useMutation(EditTransaction)

  const onSubmit = (event) => {
    event.preventDefault()
    setEditModal(false)
    editTransaction({ variables: { 'id': formValues.id, 'user_id': formValues.userId, 'description': formValues.description, 'merchant_id': formValues.merchantId, 'debit': (formValues.txType === 'debit'), 'credit': (formValues.txType === 'credit'), 'amount': formValues.amount }, refetchQueries: [{ query: GetTransactions }] }).then(() => setRedirect(true))
  }

  useEffect(() => {
    const { id, userId, description, merchantId, debit, amount } = editForm
    setFormValues({ ...formValues,
      id: id,
      userId: userId,
      description: description,
      merchantId: merchantId,
      txType: (debit === true ? 'debit' : 'credit'),
      amount: Number(amount)
    })
  }, [editForm])

  if (redirect) {
    return <Redirect to='/transactions/standard' />
  }

  return (
    <div>
      <form css={formStyle} onSubmit={onSubmit}>
        <h3 css={headerStyle}>Edit Transaction</h3>
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
              <input checked={(formValues.txType === 'debit')} id='debit' name='type' onChange={event => setFormValues({ ...formValues, txType: event.target.value })} type='radio' value='debit' />
            </li>
            <li>
              <label htmlFor='credit'>Credit:</label>
              <input checked={(formValues.txType === 'credit')} id='credit' name='type' onChange={event => setFormValues({ ...formValues, txType: event.target.value })} type='radio' value='credit' />
            </li>
          </div>
          <li>
            <label htmlFor='amount'>Amount:</label>
            <input name='amount' onChange={event => setFormValues({ ...formValues, amount: Number(event.target.value) })} type='number' value={formValues.amount} />
          </li>
          <li>
            <button type='submit'>Submit</button>
            <button onClick={() => setEditModal(false)}>Cancel</button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default EditTx

EditTx.propTypes = {
  editForm: PropTypes.instanceOf(Object),
  setEditModal: PropTypes.func.isRequired
}

const formStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  left: 0; right: 0;
  position: absolute;
  background: #fff;
  margin: auto;
  margin-top: 50px;
  width: 500px;
  padding: 1em;
  border: 1px solid #2374AB;
  border-radius: 1em;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  & > ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & > ul > li + li {
    margin-top: 1em;
  }

  & > ul > li > label {
    display: inline-block;
    width: 90px;
    text-align: right;
  }

  & > ul > li > input { 
    font: 1em sans-serif;
    width: 300px;
    box-sizing: border-box;
    border: 1px solid #999;
  }

  & > input:focus {
    border-color: #000;
  }

  & > ul > li > button {
    margin-left: 6.7em;
  }
`

const headerStyle = css`
  text-align: center;
`

const debitCreditStyle = css`
  display: flex;
  justify-content: flex-start;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: 2em;

  & > li > label {
    margin-left: 1em;
  }
`
