import React, { useState, useEffect } from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import GetTransactions from '../../gql/transactions.gql'
import { css } from '@emotion/core'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import { gql, useMutation } from '@apollo/client'
import NewTx from './NewTx'
import EditTx from './EditTx'
import { Filter, RomanConversion } from '../../utils'

export const RemoveTransaction = gql`
    mutation RemoveTransaction($id: String) {
      removeTransaction(id: $id) {
        id
      }
    }
  `

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

const TxTable = (props) => {
  const { data } = props
  console.log('data', data)
  const [displayData, setDisplayData] = useState(data)
  const [editForm, setEditForm] = useState({})
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [showDeleted, setShowDeleted] = useState(false)
  const [removeTransaction] = useMutation(RemoveTransaction)
  const [currencyType, setCurrencyType] = useState(true)

  const onChange = () => {
    setCurrencyType(!currencyType)
  }

  const showAddModal = () => {
    setAddModal(true)
  }
  const showEditModal = (id, userId, description, merchantId, debit, credit, amount) => {
    setEditForm({
      id: id,
      userId: userId,
      description: description,
      merchantId: merchantId,
      debit: debit,
      credit: credit,
      amount: amount
    })
    setEditModal(true)
  }
  const onTxDelete = (id) => {
    removeTransaction({ variables: { id }, refetchQueries: [{ query: GetTransactions }] })
    setShowDeleted(true)
  }

  useEffect(() => {
    setDisplayData(data)
  }, [data])

  return (
    <div css={fragmentStyle} data-testid={'tx-table'}>
      <h1 css={headerStyle}>
        Company Expenses
        <button css={buttonStyle} onClick={showAddModal}><AddIcon /></button>
      </h1>
      <Filter data={data} setDisplayData={setDisplayData} />
      {(data.length === 0) &&
        (
          <div>
            <h2 css={warningStyle}>No Transactions Found</h2>
          </div>
        )
      }
      {showDeleted &&
        (
          <div css={alert}>
            <span css={closeBtn} onClick={() => setShowDeleted(false)} onKeyDown={() => setShowDeleted(false)} role='button' tabIndex={0}>&times;</span>
            Sucessfully Deleted
          </div>
        )
      }
      {addModal && <NewTx setAddModal={setAddModal} />}
      {editModal && <EditTx editForm={editForm} setEditModal={setEditModal} />}
      {(data.length > 0) &&
        (
          <div css={containerStyle}>
            <table css={styles}>
              <thead>
                <tr >
                  <th >ID</th>
                  <th >User ID</th>
                  <th >Description</th>
                  <th >Merchant ID</th>
                  <th >Debit</th>
                  <th >Credit</th>
                  <th >Amount</th>
                  <th >Edit</th>
                  <th >Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  displayData.map(tx => {
                    const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
                    return (
                      <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                        <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                        <td data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
                        <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
                        <td data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
                        <td css={debitStyle} data-testid={makeDataTestId(id, 'debit')}>{(debit && <CheckIcon />)}</td>
                        <td css={creditStyle} data-testid={makeDataTestId(id, 'credit')}>{(credit && <CheckIcon />)}</td>
                        <td css={(debit) ? debitStyle : creditStyle} data-testid={makeDataTestId(id, 'amount')}>{(!currencyType) ? RomanConversion(Math.round(amount)) : amount}</td>
                        <td>
                          <button onClick={() => showEditModal(id, userId, description, merchantId, debit, credit, amount)}>
                            <EditIcon />
                          </button>
                        </td>
                        <td><button css={iconStyle} data-testid={`delete-${id}`} onClick={() => onTxDelete(id)}><DeleteForeverIcon /></button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        )}
      <div css={checkboxStyle} onChange={onChange}>
        <input
          name='currency'
          type='checkbox'
          value='roman'
        />
          View as Roman Numerals
      </div>
    </div>
  )
}

export default TxTable

TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }))
}

const fragmentStyle = css`
  display: flex;
  flex-direction: column;
  position: relative;
`

const checkboxStyle = css`
  text-align: right;
`

const styles = css`
  font-family: "Times New Roman", Times, serif;
  max-height: 70vh;
  display: block;
  overflow-y: scroll;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  & > thead > tr > th {
    background: #2374AB;
    position: sticky;
    top: 0;
  }

  & > thead > tr {
    background-color: #2374AB;
    color: #ffffff;
    text-align: left;
  }

  & > th, td {
    padding: 12px 15px;
  }

  & > tbody > tr {
    border-bottom: 1px solid #dddddd;
  }

  & > tbody > tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  & > tbody > tr:last-of-type {
    border-bottom: 2px solid #2374AB;
  }

  & > tbody > tr > td > button {
    color: #2374AB;
  }
`

const containerStyle = css`
  font-family: "Times New Roman", Times, serif;
  display: flex;
  justify-content: center;
`

const buttonStyle = css`
  border-radius: 8px;
  background-color: #2374AB;
  border: none;
  color: white;
  padding: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 4px;
  margin: 4px 2px;
`

const iconStyle = css`
 cursor: pointer;
 color: #2374AB;
 & > a {
   text-decoration: none;
 }
`

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
`

const creditStyle = css`
  color: #A31300;
`

const debitStyle = css`
 color: #7FA267;
`
const alert = css`
  margin: auto;
  padding: 20px;
  background-color: #7FA267; 
  color: white;
  margin-bottom: 15px;
`
const closeBtn = css`
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
`
const warningStyle = css`
 text-align: center;
 color: #A31300;
`
