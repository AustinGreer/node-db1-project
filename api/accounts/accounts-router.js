const router = require('express').Router()
const Accounts = require('./accounts-model')
const {checkAccountId, checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Accounts.getAll()
    res.json(accounts)
  } catch (err) {
    next({err})
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    res.json(req.account)
  } catch (err) {
    next({err})
  }
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: 'Something went totally wrong',
    error: err.message,
    stack: err.stack
  })
})

module.exports = router;
