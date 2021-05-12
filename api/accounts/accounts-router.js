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
  (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
