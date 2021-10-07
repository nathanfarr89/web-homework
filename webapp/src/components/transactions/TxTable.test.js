import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { MockedProvider } from '@apollo/client/testing'
import TxTable, { RemoveTransaction } from './TxTable'

describe('Transactions Table', () => {
  const data = [{
    '__typename': 'Transaction',
    'id': '6064d9965880e86bc4300be3',
    'user_id': 'employee10',
    'description': 'Food',
    'merchant_id': 'McDonalds',
    'debit': false,
    'credit': true,
    'amount': 25.74
  }]
  it('should show user "employee10" with amount "25.74"', () => {
    const component = render(
      <MockedProvider>
        <TxTable data={data} version='standard' />
      </MockedProvider>
    )

    const elem = component.getByTestId('transaction-6064d9965880e86bc4300be3')
    expect(elem.innerHTML).toContain('employee10')
    expect(elem.innerHTML).toContain('25.74')
  })
  it('should remove expense on delete click', async () => {
    const dataToDelete = [
      {
        '__typename': 'Transaction',
        'id': '6064d9965880e86bc4300be3',
        'user_id': 'employee10',
        'description': 'Food',
        'merchant_id': 'McDonalds',
        'debit': false,
        'credit': true,
        'amount': 25.74
      }
    ]
    const mocks = [
      {
        request: {
          query: RemoveTransaction,
          variables: { id: dataToDelete[0].id }
        },
        result: { data: { dataToDelete } }
      }
    ]
    let component
    act(() => {
      component = render(
        <MockedProvider mocks={mocks}>
          <TxTable data={dataToDelete} version='standard' />
        </MockedProvider>
      )
    })
    const button = component.getByTestId('delete-6064d9965880e86bc4300be3')
    act(() => {
      fireEvent.click(button)
    })
    const elem = component.getByTestId('tx-table')
    expect(elem.innerHTML).toContain('Sucessfully Deleted')
  })
})
