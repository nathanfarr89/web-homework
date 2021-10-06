import React from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

const Filter = (props) => {
  const { data, setDisplayData } = props

  const filterByValue = (array, string) => {
    return array.filter(o =>
      Object.keys(o).some(k => o[k].toString().toLowerCase().includes(string.toLowerCase())))
  }

  const filter = (e) => {
    setDisplayData(filterByValue(data, e.target.value))
  }

  return (
    <div css={filterStyle}>
      <label htmlFor='header-search'>
        <span>Filter Transactions</span>
      </label>
      <input
        id='header-search'
        name='s'
        onChange={filter}
        placeholder='Filter...'
        type='text'
      />
    </div>
  )
}

export default Filter

Filter.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setDisplayData: PropTypes.func.isRequired
}

const filterStyle = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  & > label {
    margin-right: 5px;
  }
`
