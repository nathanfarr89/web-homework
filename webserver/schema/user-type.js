/* eslint-disable no-unused-vars */
const path = require('path')
const graphql = require('graphql')
const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = graphql

const UserSchema = require(path.join('..', 'data-models', 'User')) // eslint-disable-line no-unused-vars
const { TransactionModel: Transaction } = require(path.join('..', 'data-models', 'Transaction'))
const TransactionType = require('./transaction-type')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    dob: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    employeeNumber: { type: GraphQLString },
    tenure: { type: GraphQLString },
    budget: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve (parentValue, args) {
        return Transaction.find({ user_id: args.employeeNumber }).populate('transaction')
      }
    }
  })
})

module.exports = UserType
