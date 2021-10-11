import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Base, Home } from './home'
import NewTx from './components/transactions/NewTx'
import EditTx from './components/transactions/EditTx'
import { Charts } from './components/transactions/Charts'
import Upload from './components/transactions/Upload'
import Employees from './components/employees/Employees'
import ReceiptIcon from '@material-ui/icons/Receipt'
import PeopleIcon from '@material-ui/icons/People'
import PieChartIcon from '@material-ui/icons/PieChart'
import PublishIcon from '@material-ui/icons/Publish'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { buttonContainer, buttonStyle, containerStyle, contentStyle, headerStyle, iconStyle, sidebarStyle, uploadStyle } from './styles'

const AppRouter = () => {
  const [showUpload, setShowUpload] = useState(false)

  return (
    <Router>
      <div css={containerStyle}>
        <div css={sidebarStyle}>
          <h1 css={headerStyle}>
            <Link
              css={buttonStyle}
              to='/'
            >
              <MonetizationOnIcon fontSize='large' />
            </Link>
          </h1>
          <Link
            css={buttonStyle}
            to='/transactions/standard'
          >
            <div css={buttonContainer}>
              <ReceiptIcon css={iconStyle} fontSize='small' />
              Company Expenses
            </div>
          </Link>
          <Link
            css={buttonStyle}
            to='/charts'
          >
            <div css={buttonContainer}>
              <PieChartIcon css={iconStyle} fontSize='small' />
              Expense Breakdown
            </div>
          </Link>
          <Link
            css={buttonStyle}
            to='/employees'
          >
            <div css={buttonContainer}>
              <PeopleIcon css={iconStyle} fontSize='small' />
              Employee Directory
            </div>
          </Link>
          <button
            css={[buttonStyle, uploadStyle]}
            onClick={() => setShowUpload(!showUpload)}
          >
            <div css={buttonContainer}>
              <PublishIcon css={iconStyle} fontSize='small' />
              Upload CSV
            </div>
          </button>
        </div>
        <div css={contentStyle}>
          <Route component={Charts} exact path='/charts' />
          <Route component={Employees} exact path='/employees' />
          <Route component={Upload} exact path='/upload' />
          <Route component={NewTx} exact path='/transaction/new' />
          <Route component={EditTx} exact path='/transaction/edit/:id/:userId/:description/:merchantId/:debit/:credit/:amount' />
          <Route component={Home} exact path='/transactions/:version' />
          <Route component={Base} exact path='/' />
        </div>
        {showUpload && <Upload close={setShowUpload} />}
      </div>
    </Router>
  )
}

export default AppRouter
