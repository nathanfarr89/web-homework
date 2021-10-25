import React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import EditTx from './EditTx'

describe('Edit Tx Modal', () => {
  const txData = {
    "id": "617330271ef2f2ffd35abb3f",
    "userId": "employee23",
    "description": "Travel",
    "merchantId": "American",
    "txType": "debit",
    "amount": 300.57
    }

    const userData = {
        "data": {
          "users": [
            {
                "__typename": "User",
                "id": "617330311ef2f2ffd35abb54",
                "firstName": "Royce",
                "lastName": "O'Neale",
                "dob": "6/5/1993",
                "employeeNumber": "employee23",
                "tenure": "4",
                "budget": "5000",
                "transactions": []
            }
          ]
        }
      }

  it('should show description "Travel", merchant "American", type "debit", amount "300.57"', () => {
    const component = render(
      <MockedProvider>
        <EditTx data={userData} editForm={txData} />
      </MockedProvider>
    )

    const elem = component.getByTestId('transaction-617330271ef2f2ffd35abb3f')
    expect(elem.innerHTML).toContain('Travel')
    expect(elem.innerHTML).toContain('American')
    expect(elem.innerHTML).toContain('debit')
    expect(elem.innerHTML).toContain('300.57')
  })
})