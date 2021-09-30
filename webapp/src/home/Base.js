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

// const containerStyle = css`
//   display: flex;
//   justify-content: space-evenly;
// `

// const headerStyle = css`
//   display: flex;
//   justify-content: space-evenly;
// `

// const buttonStyle = css`
//   border-radius: 8px;
//   background-color: #2374AB;
//   border: none;
//   color: white;
//   padding: 15px;
//   text-align: center;
//   text-decoration: none;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 16px;
//   margin: 4px 2px;
// `

// export function Base () {
//   return (
//     <div>
//       <h1 css={headerStyle}>Expense Tracker</h1>
//       <div css={containerStyle}>
//         <Link
//           css={buttonStyle}
//           to='/transactions/standard'
//         >
//           Company Expenses
//           <ReceiptIcon fontSize='large' />
//         </Link>
//         <Link
//           css={buttonStyle}
//           to='/transactions/roman'
//         >
//           Company Expenses as Roman Numerals
//           <TransformIcon fontSize='large' />
//         </Link>
//         <Link
//           css={buttonStyle}
//           to='/charts'
//         >
//           Expense Breakdown
//           <PieChartIcon fontSize='large' />
//         </Link>
//         <Link
//           css={buttonStyle}
//           to='/upload'
//         >
//           Upload CSV
//           <PublishIcon fontSize='large' />
//         </Link>
//       </div>
//     </div>
//   )
// }
