import { css } from '@emotion/core'

// Colors
const white = '#fff'
const lightGrey = '#e7f5ff'
const blue = `#2374AB`
const red = '#A31300'
const green = '#20c997'
const lightBlue = '#a5d8ff'

// Base.js styles

export const baseContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 70vh;
  margin: auto;
`

// routes.js styles
export const sidebarStyle = css`
display: flex;
flex-direction: column;
justify-content: center;
background-color: ${lightGrey};
height: 100vh;
width: 15%;
`
export const contentStyle = css`
  height: 100vh;
  width: 75%;
  margin: auto;
  display: flex;
  align-items: center;
`
export const containerStyle = css`
  display: flex;
  background-color: #f8f9fa;
`

export const uploadStyle = css`
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
export const headerStyle = css`
  display: flex;
  justify-content: space-evenly;
`
export const txUlstyle = css`
  display: flex;
  flex-direction: column;
  width: 75%;
`
export const txLiStyle = css`
  display: flex;
  justify-content: space-between;
`
export const inputStyle = css`
  width: 50% !important;
`

export const buttonContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const buttonStyle = css`
  color: #333;
  display: flex;
  text-decoration: none;
  margin-bottom: 20px;
  padding: 10px;
`
export const iconStyle = css`
  margin-right: 5px;
`

// TxTable.js styles
export const fragmentStyle = css`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  width: 80%;
`

export const checkboxStyle = css`
  text-align: right;
`

export const styles = css`
  font-family: "Times New Roman", Times, serif;
  max-height: 70vh;
  display: block;
  overflow-y: scroll;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  & > thead > tr > th {
    background: ${blue};
    position: sticky;
    top: 0;
  }

  & > thead > tr {
    background-color: ${blue};
    color: ${white};
    text-align: left;
  }

  & > th, td {
    padding: 12px 15px;
  }

  & > tbody > tr {
    border-bottom: 1px solid #dddddd;
    cursor: pointer;
  }

  & > tbody > tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  & > tbody > tr:last-of-type {
    border-bottom: 2px solid ${blue};
  }

  & > tbody > tr > td > button {
    color: ${blue};
  }
`

export const tableContainerStyle = css`
  font-family: "Times New Roman", Times, serif;
  display: flex;
  justify-content: center;
`

export const tableButtonStyle = css`
  border-radius: 8px;
  border: none;
  color: white;
  padding: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 4px;
  margin: 4px 2px;
`

export const enableTableButtonStyle = css`
  background-color: ${blue};
`

export const disableTableButtonStyle = css`
  background-color: #e9ecef;
`

export const tableIconStyle = css`
 cursor: pointer;
 color: ${blue};
 & > a {
   text-decoration: none;
 }
`

export const tableHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
`

export const creditStyle = css`
  color: ${red};
`

export const debitStyle = css`
 color: ${green};
`
export const alert = css`
  margin-top: 10px;
  padding: 10px; 
  color: white;
  margin-bottom: 15px;
`
export const alertSuccess = css`
  background-color: ${green};
`
export const alertFailure = css`
  background-color: ${red};
`

export const closeBtn = css`
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
`

export const warningStyle = css`
 text-align: center;
 color: ${red};
`

// Charts.js style

export const chartsContainerStyle = css`
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: center;
  height: 90vh;
`

export const chartsHeaderStyle = css`
  margin-bottom: 0;
`

// EditTx.js & NewTx.js styles

export const formStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  left: 0; right: 0;
  position: absolute;
  background: ${white};
  margin: auto;
  margin-top: 50px;
  width: 500px;
  padding: 1em;
  border: 1px solid ${blue};
  border-radius: 1em;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  & > ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & > ul > li + li {
    margin-top: 1em;
  }

  & > ul > li > label {
    display: inline-block;
    width: 90px;
    text-align: right;
  }

  & > ul > li > input { 
    font: 1em sans-serif;
    width: 300px;
    box-sizing: border-box;
    border: 1px solid #999;
  }

  & > input:focus {
    border-color: #000;
  }

  & > ul > li > button {
    margin-left: 6.7em;
  }
`

export const editHeaderStyle = css`
  text-align: center;
`

export const debitCreditStyle = css`
  display: flex;
  justify-content: flex-start;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: 2em;

  & > li > label {
    margin-left: 1em;
  }
`

// Upload.js styles
export const uploadRadioStyle = css`
  display: flex;
  margin-bottom: 10px;
  width: 70%;
  justify-content: space-evenly;
`

export const uploadFormStyle = css`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`
export const uploadButton = css`
  border-radius: 8px;
  background-color: ${blue};
  border: none;
  color: white;
  padding: 6px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
  width: 30%;
`
export const uploadBrowse = css`
  background-color: ${white};
  border-radius: 8px;
  border-width: thin;
  border-style: solid;
  border-color: ${blue};
  line-height: 2.5;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-left: 13px;
  padding-top: 3px;
  width: 250px;
`
export const uploadContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  left: 0; right: 0;
  position: absolute;
  background: ${white};
  margin: auto;
  margin-top: 250px;
  width: 500px;
  border: 1px solid ${blue};
  border-radius: 1em;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`
export const uploadHeaderStyle = css`
  display: flex;
  justify-content: flex-start;
  margin: 5px;
`
export const uploadCloseStyle = css`
    margin-left: auto;
    margin-right: 10px;
    margin-top: 5px;
`

// Filter.js styles

export const filterStyle = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  & > label {
    margin-right: 5px;
  }
`

// Employees.js style

export const employeesContainer = css`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`

// EmployeeCard.js style

export const employeeCard = css`
  display: flex;
  flex-direction: column;
  max-height: 95vh;
  width: 40%;
  overflow: hidden;
`

export const employee = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  height: 80%;
  background-color: #f1f3f5;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  margin-left: 20px;
`
export const profilePic = css`
  border-radius: 50%;
  height: 120px;
  width: 120px;
  text-align: center;
  line-height: 120px;
  background: ${lightGrey};
  border: 3px solid ${lightBlue};
  letter-spacing: 2px;
  font-weight: 100;
  font-size: 40px;
`
