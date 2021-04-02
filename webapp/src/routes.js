import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Base, Home } from './home'
import NewTx from './components/transactions/NewTx'
import EditTx from './components/transactions/EditTx'
import { Charts } from './components/transactions/Charts'
import { Upload } from './components/transactions/Upload'
import HomeIcon from '@material-ui/icons/Home'
import ReceiptIcon from '@material-ui/icons/Receipt'
import PieChartIcon from '@material-ui/icons/PieChart'
import PublishIcon from '@material-ui/icons/Publish'
import TransformIcon from '@material-ui/icons/Transform'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul >
            <li>
              <Link to='/'>
                <HomeIcon fontSize='large' />
              </Link>
            </li>
            <li>
              <Link to='/transactions/standard'>
                <ReceiptIcon fontSize='large' />
              </Link>
            </li>
            <li>
              <Link to='/transactions/roman'>
                <TransformIcon fontSize='large' />
              </Link>
            </li>
            <li>
              <Link to='/charts'>
                <PieChartIcon fontSize='large' />
              </Link>
            </li>
            <li>
              <Link to='/upload'>
                <PublishIcon fontSize='large' />
              </Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Charts} exact path='/charts' />
          <Route component={Upload} exact path='/upload' />
          <Route component={NewTx} exact path='/transaction/new' />
          <Route component={EditTx} exact path='/transaction/edit/:id/:userId/:description/:merchantId/:debit/:credit/:amount' />
          <Route component={Home} exact path='/transactions/:version' />
          <Route component={Base} exact path='/' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    height: 100vh;
    background: linear-gradient(to bottom right, rgba(73,132,180,0.25), rgba(161,210,219,1));
    display: grid;
    grid-row-gap: 24px;
    padding: 8px;
    text-decoration: none;
`

const navStyle = css`
  grid-row: 1;
  
  & > ul > li > a {
    color: #2374AB;
  }

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
  
  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
`
