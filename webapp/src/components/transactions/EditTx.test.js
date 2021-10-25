import React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import EditTx from './TxTable'

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
                "id": "617330311ef2f2ffd35abb58",
                "firstName": "Mike",
                "lastName": "Conley",
                "dob": "10/11/1987",
                "employeeNumber": "employee10",
                "tenure": "14",
                "budget": "5000",
                "transactions": []
            }
          ]
        }
      }

  it('should show user "employee23" with amount "300.57"', () => {
    const component = render(
      <MockedProvider>
        <EditTx data={userData} editForm={txData} />
      </MockedProvider>
    )

    const elem = component.getByTestId('transaction-617330271ef2f2ffd35abb3f')
    expect(elem.innerHTML).toContain('employee23')
    expect(elem.innerHTML).toContain('300.57')
  })
})