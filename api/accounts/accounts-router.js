const router = require('express').Router()
const Accounts = require('./accounts-model')
const {
  checkAccountId, 
  checkAccountNameUnique, 
  checkAccountPayload
} = require('./accounts-middleware')

// get - returns an array of all accounts
router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.json(accounts)
  } catch (err) {
    next({err})
  }
})

// get - returns an account by id
router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    res.json(req.account)
  } catch (err) {
    next({err})
  }
})

router.post(
  '/',
  checkAccountPayload, 
  checkAccountNameUnique, 
  async (req, res, next) => {
    try {
      const newAccount = await Accounts.create(req.body)
      res.status(201).json(newAccount)
    } catch (err) {
      next({err})
    }
})

router.put(
  '/:id', 
  checkAccountPayload, 
  checkAccountNameUnique, 
  checkAccountId, 
  async (req, res, next) => {
    try {
      const update = await Accounts.updateById(req.params.id, req.body)
      res.json(update)
    } catch(err) {
      next(err)
    }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const accountRemoved = await Accounts.deleteById(req.params.id)
    res.json(accountRemoved)
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
