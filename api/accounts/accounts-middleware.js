const Accounts = require('../accounts/accounts-model')
const db = require('../../data/db-config')

// middleware that validates both name and budget on post and put request
exports.checkAccountPayload =  (req, res, next) => {
  const errorStatus = {status: 400}
  const { name, budget } = req.body

  if (!name || !budget) {
    errorStatus.message =  'name and budget are required'
  } else if (typeof name !== 'string') {
    errorStatus.message =  'name of account must be a string'
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    errorStatus.message =  'name of account must be between 3 and 100'
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    errorStatus.message =  'budget of account must be a number'
  } else if (budget < 0 || budget > 1000000) {
    errorStatus.message =  'budget of account is too large or too small'
  } 

  if (errorStatus.message) {
    next(errorStatus)
  } else {
    next()
  }
}

exports.checkAccountNameUnique =  async (req, res, next) => {
  // building out db validation here for simplicity
  try {
    const name = await db('accounts').where('name', req.body.name.trim()).first()
    if (name) {
      next({status: 400, message: 'that name is taken'})
    } else {
      next()
    }
  } catch (err){
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const { id } = req.params
    const uniqueAccount = await Accounts.getById(id)

    if (!uniqueAccount) {
      res.status(404).json({
        message: 'account not found'
      })
    } else {
      req.account = uniqueAccount
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}
