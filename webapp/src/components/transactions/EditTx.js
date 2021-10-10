import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'
import GetTransactions from '../../gql/transactions.gql'
import { Redirect } from 'react-router-dom'
import { debitCreditStyle, formStyle, editHeaderStyle } from '../../styles'

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
        <h3 css={editHeaderStyle}>Edit Transaction</h3>
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
