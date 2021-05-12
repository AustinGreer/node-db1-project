const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = async (id) => {
  const uniqueId = await db('accounts')
    .where({id})
    .first()

  return uniqueId
}

const create =  async (account) => {
  // insert
  const [id] = await db('accounts').insert(account)

  return getById(id)
}

const updateById = async (id, account) => {
  // update Customers set account where id = id
  const entry = await db('accounts').where('id', id).update(account)
  const updatedAccount = await getById(id)
  return updatedAccount
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
