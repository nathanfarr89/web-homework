import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import NewTx from './components/transactions/NewTx'
import EditTx from './components/transactions/EditTx'
import { Charts } from './components/transactions/Charts'
import Upload from './components/transactions/Upload'
import ReceiptIcon from '@material-ui/icons/Receipt'
import PieChartIcon from '@material-ui/icons/PieChart'
import PublishIcon from '@material-ui/icons/Publish'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

const AppRouter = () => {
  const [showUpload, setShowUpload] = useState(false)

  return (
    <Router>
      <div css={containerStyle}>
        <div css={sidebarStyle}>
          <h1 css={headerStyle}>
            <MonetizationOnIcon fontSize='large' />
          </h1>
          <Link
            css={buttonStyle}
            to='/transactions/standard'
          >
            <ReceiptIcon fontSize='small' />
            Company Expenses
          </Link>
          <Link
            css={buttonStyle}
            to='/charts'
          >
            <PieChartIcon fontSize='small' />
            Expense Breakdown
          </Link>
          <button
            css={[buttonStyle, uploadStyle]}
            onClick={() => setShowUpload(!showUpload)}
          >
            <PublishIcon fontSize='small' />
            Upload CSV
          </button>
        </div>
        <div css={contentStyle}>
          <Route component={Charts} exact path='/charts' />
          <Route component={Upload} exact path='/upload' />
          <Route component={NewTx} exact path='/transaction/new' />
          <Route component={EditTx} exact path='/transaction/edit/:id/:userId/:description/:merchantId/:debit/:credit/:amount' />
          <Route component={Home} exact path='/transactions/:version' />
          <Route component={Home} exact path='/' />
        </div>
        {showUpload && <Upload close={setShowUpload} />}
      </div>
    </Router>
  )
}

export default AppRouter

const contentStyle = css`
  height: 100vh;
  margin-left: 10%;
`
const containerStyle = css`
  display: flex;
  background-color: #f8f9fa;
`

const uploadStyle = css`
  all: unset;
  color: #333;
  display: flex;
  text-decoration: none;
  margin-bottom: 20px;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`

const sidebarStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e7f5ff;
  height: 100vh;
  width: 15%;
`
const headerStyle = css`
  display: flex;
  justify-content: space-evenly;
`
const buttonStyle = css`
  color: #333;
  display: flex;
  text-decoration: none;
  margin-bottom: 20px;
  padding: 10px;
`
