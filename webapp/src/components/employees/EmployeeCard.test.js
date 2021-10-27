import React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import EmployeeCard from './EmployeeCard'

describe('Employee Card', () => {
    const displayEmployee = {
        "__typename": "User",
        "id": "617330311ef2f2ffd35abb51",
        "firstName": "Jared",
        "lastName": "Butler",
        "dob": "8/25/2000",
        "employeeNumber": "employee13",
        "tenure": "1",
        "budget": "5000",
        "transactions": []
    }

    const transactions = {
      "transactions": [
          {
              "__typename": "Transaction",
              "id": "6175f5e27912660836277a81",
              "user_id": "employee13",
              "description": "Shoes",
              "merchant_id": "Adidas",
              "debit": true,
              "credit": false,
              "amount": 300.65
          }
      ]
  }

  it('should show user "employee13" with remaining budget "5300.65"', () => {
    const component = render(
      <MockedProvider>
        <EmployeeCard employeeData={displayEmployee} transactions={transactions} />
      </MockedProvider>
    )

    const elem = component.getByTestId('employee-617330311ef2f2ffd35abb51')
    expect(elem.innerHTML).toContain('employee13')
    expect(elem.innerHTML).toContain('5300.65')
  })
})