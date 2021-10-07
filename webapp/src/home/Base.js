import React from 'react'
import { css } from '@emotion/core'

const containerStyle = css`
  display: flex;
`

export function Base () {
  return (
    <div css={containerStyle}>
      <h1>Company Expense Tracker</h1>
    </div>
  )
}
