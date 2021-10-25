import React, { useState, useEffect } from 'react'
import { arrayOf, string, bool, number, shape, PropTypes } from 'prop-types'
import GetTransactions from '../../gql/transactions.gql'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import { gql, useMutation } from '@apollo/client'
import NewTx from './NewTx'
import EditTx from './EditTx'
import { Filter, convertToRomanNumerals } from '../../utils'
import { alert, alertSuccess, alertFailure, closeBtn, checkboxStyle, creditStyle, debitStyle, disableTableButtonStyle, enableTableButtonStyle, fragmentStyle, styles, tableButtonStyle, tableContainerStyle, tableHeaderStyle, tableIconStyle, warningStyle } from '../../styles'

export const RemoveTransaction = gql`
    mutation RemoveTransaction($id: String) {
      removeTransaction(id: $id) {
        id
      }
    }
  `

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

const TxTable = (props) => {
  const { data, userData } = props
  const [displayData, setDisplayData] = useState(data)
  const [editForm, setEditForm] = useState({})
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [showDeleted, setShowDeleted] = useState(false)
  const [filterValue, setFilterValue] = useState('')
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
    if (data.length === 0) {
      setShowDeleted(false)
    }
  }, [])

  if (!userData.data || data.length === 0) {
    return (
      <div>
        <h2 css={warningStyle}>No Transactions Found. Please seed the database with upload function and the transactionSeed.csv file</h2>
      </div>
    )
  }

  return (
    <div css={fragmentStyle} data-testid={'tx-table'}>
      <h1 css={tableHeaderStyle}>
        Company Expenses
        <button css={[tableButtonStyle, (userData.data.users.length > 0) ? enableTableButtonStyle : disableTableButtonStyle]} onClick={showAddModal}><AddIcon /></button>
      </h1>
      <Filter data={data} filterValue={filterValue} setDisplayData={setDisplayData} setFilterValue={setFilterValue} />
      {showDeleted &&
        (
          <div css={[alert, alertSuccess]}>
            <span css={closeBtn} onClick={() => setShowDeleted(false)} onKeyDown={() => setShowDeleted(false)} role='button' tabIndex={0}>&times;</span>
            Sucessfully Deleted
          </div>
        )
      }
      {displayData.length === 0 &&
        (
          <div css={[alert, alertFailure]}>
            No Matches Found
          </div>
        )
      }
      {userData.data.users.length === 0 &&
        (
          <div css={[alert, alertFailure]}>
            Please upload employeeSeed.csv to add and edit transactions
          </div>
        )
      }
      {(addModal && userData.data.users.length > 0) && <NewTx data={userData.data} setAddModal={setAddModal} setFilterValue={setFilterValue} />}
      {(editModal && userData.data.users.length > 0) && <EditTx data={userData.data} editForm={editForm} setEditModal={setEditModal} setFilterValue={setFilterValue} />}
      {(displayData.length > 0) &&
        (
          <div>
            <div css={tableContainerStyle}>
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
                          <td css={(debit) ? debitStyle : creditStyle} data-testid={makeDataTestId(id, 'amount')}>{(!currencyType) ? convertToRomanNumerals(Math.round(amount)) : amount}</td>
                          <td>
                            <button onClick={() => showEditModal(id, userId, description, merchantId, debit, credit, amount)}>
                              {(userData.data.users.length > 0) ? <EditIcon /> : <span>N/A</span>}
                            </button>
                          </td>
                          <td><button css={tableIconStyle} data-testid={`delete-${id}`} onClick={() => onTxDelete(id)}><DeleteForeverIcon /></button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            <div css={checkboxStyle} onChange={onChange}>
              <input
                name='currency'
                type='checkbox'
                value='roman'
              />
                View as Roman Numerals
            </div>
          </div>
        )}
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
  })),
  userData: PropTypes.instanceOf(Object)
}
