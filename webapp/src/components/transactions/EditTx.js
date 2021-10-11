/* eslint-disable */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gql, useMutation, useQuery } from '@apollo/client'
import GetTransactions from '../../gql/transactions.gql'
import GetUsers from '../../gql/users.gql'
import { Redirect } from 'react-router-dom'
import { formStyle, editHeaderStyle, inputStyle, txLiStyle, txUlstyle } from '../../styles'

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
  const { data = {} } = useQuery(GetUsers)
  const [options, setOptions] = useState([])
  const [formValues, setFormValues] = useState({
    id: '',
    userId: '',
    description: '',
    merchantId: '',
    txType: 'debit',
    amount: 0
  })
  console.log('formVals', formValues)
  const [redirect, setRedirect] = useState(false)
  const [editTransaction] = useMutation(EditTransaction)

  const onSubmit = (event) => {
    event.preventDefault()
    setEditModal(false)
    editTransaction({ variables: { 'id': formValues.id, 'user_id': formValues.userId, 'description': formValues.description, 'merchant_id': formValues.merchantId, 'debit': (formValues.txType === 'debit'), 'credit': (formValues.txType === 'credit'), 'amount': formValues.amount }, refetchQueries: [{ query: GetTransactions }] }).then(() => setRedirect(true))
  }

  useEffect(() => {
    if (data.users) {
      setFormValues({ ...formValues, userId: data.users[0].employeeNumber })
      setOptions(data.users.map(user => user.employeeNumber))
    }
  }, [data])

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
        <ul css={txUlstyle}>
          <li css={txLiStyle}>
            <label htmlFor='userId'>User ID:</label>
            <select name='userId' onChange={event => setFormValues({ ...formValues, userId: event.target.value })}>
              {options.map(option => {
                return <option selected={(formValues.userId === option)} key={option}>{option}</option>
              })}
            </select>
          </li>
          <li css={txLiStyle}>
            <label htmlFor='description'>Description:</label>
            <input css={inputStyle} name='description' onChange={event => setFormValues({ ...formValues, description: event.target.value })} value={formValues.description} />
          </li>
          <li css={txLiStyle}>
            <label htmlFor='merchant_id'>Merchant:</label>
            <input css={inputStyle} name='merchantId' onChange={event => setFormValues({ ...formValues, merchantId: event.target.value })} value={formValues.merchantId} />
          </li>
          <li css={txLiStyle}>
            <label htmlFor='Transaction Type'>Transaction:</label>
            <select name='Transaction Type' onChange={event => setFormValues({ ...formValues, txType: event.target.value })}>
              <option selected={(formValues.txType === 'debit')} value='debit' >Debit</option>
              <option selected={(formValues.txType === 'credit')} value='credit' >Credit</option>
            </select>
          </li>
          <li css={txLiStyle}>
            <label htmlFor='amount'>Amount:</label>
            <input css={inputStyle} name='amount' onChange={event => setFormValues({ ...formValues, amount: Number(event.target.value) })} type='number' value={formValues.amount} />
          </li>
          <li css={txLiStyle}>
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
