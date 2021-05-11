const Accounts = require('../accounts/accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload =  (req, res, next) => {
  const { name, budget } = req.body
  if (!name || !budget) {
    res.status(400).json({
      message: 'name and budget are required'
    })
  } else if (typeof name !== 'string') {
    res.status(400).json({
      message: 'name of account must be a string'
    })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({
      message: 'name of account must be between 3 and 100'
    })
  } else if (typeof budget !== 'number') {
    res.status(400).json({
      message: 'budget of account must be a number'
    })
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({
      message: 'budget of account is too large'
    })
  } else {
    next()
  }

}

exports.checkAccountNameUnique = (req, res, next) => {
  // building out db validation here for simplicity
  const existingName = db('accounts')
    .where('name', req.params.name.trim())
    .first()

  if (existingName) {
    res.status(400).json({
      message: "that name is taken"
    })
  } else {
    next()
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
