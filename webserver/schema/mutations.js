/* eslint-disable */
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User')
const TransactionType = require('./transaction-type')
const UserType = require('./user-type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount })).save()
      }
    },
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        dob: { type: GraphQLString },
        employeeNumber: { type: GraphQLString },
        tenure: { type: GraphQLString },
        budget: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { firstName, lastName, dob, employeeNumber, tenure, budget }) {
        return (new UserModel({ firstName, lastName, dob, employeeNumber, tenure, budget })).save()
      }
    },
    removeTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, { id }) {
        return TransactionModel.findByIdAndDelete(id)
      }
    },
    removeUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, { id }) {
        return UserModel.findByIdAndDelete(id)
      }
    },
    editTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      resolve (parentValue, { id, user_id, description, merchant_id, debit, credit, amount }) {
        return TransactionModel.findByIdAndUpdate(id, { user_id, description, merchant_id, debit, credit, amount })
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        dob: { type: GraphQLString },
        employeeNumber: { type: GraphQLString },
        tenure: { type: GraphQLString },
        budget: { type: GraphQLString }
      },
      resolve (parentValue, { id, firstName, lastName, dob, employeeNumber, tenure, budget }) {
        return UserModel.findByIdAndUpdate(id, { firstName, lastName, dob, employeeNumber, tenure, budget })
      }
    }
  })
})

module.exports = mutation
