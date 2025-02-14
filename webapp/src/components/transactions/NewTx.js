/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'
import { css } from '@emotion/core'
import { Redirect } from 'react-router-dom'
import GetTransactions from '../../gql/transactions.gql'
import { formStyle, inputStyle, txUlstyle, txLiStyle } from '../../styles'

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
  const { data, setAddModal, setFilterValue } = props
  const [options, setOptions] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [formValues, setFormValues] = useState({
    userId: '',
    description: '',
    merchantId: '',
    txType: 'debit',
    amount: 0
  })
  const [addTransaction] = useMutation(AddTransaction)
  const ref = useRef()

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (close && ref.current && !ref.current.contains(e.target)) {
        setAddModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [])

  useEffect(() => {
    if (data.users) {
      setOptions(data.users.map(user => user.employeeNumber))
    }
  }, [data])

  const onSubmit = (event) => {
    event.preventDefault()
    if (formValues.userId === '') {
      return alert('Please select an employee')
    }
    setAddModal(false)
    setFilterValue(formValues.userId)
    addTransaction({ variables: { 'user_id': formValues.userId, 'description': formValues.description, 'merchant_id': formValues.merchantId, 'debit': (formValues.txType === 'debit'), 'credit': (formValues.txType === 'credit'), 'amount': formValues.amount }, refetchQueries: [{ query: GetTransactions }] }).then(() => setRedirect(true))
  }

  if (redirect) {
    return <Redirect to='/transactions/standard' />
  }

  return (
    <div ref={ref}>
      <form css={formStyle} onSubmit={onSubmit}>
        <h3 css={headerStyle}>Add Transaction</h3>
        <ul css={txUlstyle}>
          <li css={txLiStyle}>
            <label htmlFor='userId'>User ID:</label>
            <select name='userId' onChange={event => setFormValues({ ...formValues, userId: event.target.value })} value="DEFAULT">
              <option value="DEFAULT" disabled>Select an employee...</option>
              {options.map(option => {
                return <option key={option} label={option} value={option} />
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
                <option value='debit' >Debit</option>
                <option value='credit' >Credit</option>
            </select>
          </li>
          <li css={txLiStyle}>
            <label htmlFor='amount'>Amount:</label>
            <input css={inputStyle} name='amount' onChange={event => setFormValues({ ...formValues, amount: Math.round(Number(event.target.value) * 100) / 100 })} step='0.01' type='number' value={Math.round(formValues.amount * 100) / 100} />
          </li>
          <li css={txLiStyle}>
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
  data: PropTypes.instanceOf(Object),
  setAddModal: PropTypes.func.isRequired,
  setFilterValue: PropTypes.func.isRequired
}
