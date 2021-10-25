import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { filterStyle } from '../styles'

const Filter = (props) => {
  const { data, filterValue, setDisplayData, setFilterValue } = props

  const filterByValue = (array, string) => {
    return array.filter(o =>
      Object.keys(o).some(k => o[k].toString().toLowerCase().includes(string.toLowerCase())))
  }

  const filter = () => {
    const filterData = filterByValue(data, filterValue)
    setDisplayData(filterData)
  }

  useEffect(() => {
    filter()
  }, [filterValue, data])

  return (
    <div css={filterStyle}>
      <label htmlFor='header-search'>
        <span>Filter Transactions</span>
      </label>
      <input
        id='header-search'
        name='s'
        onChange={event => setFilterValue(event.target.value)}
        placeholder='Filter...'
        type='text'
        value={filterValue}
      />
    </div>
  )
}

export default Filter

Filter.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  filterValue: PropTypes.string,
  setDisplayData: PropTypes.func.isRequired,
  setFilterValue: PropTypes.func.isRequired
}
