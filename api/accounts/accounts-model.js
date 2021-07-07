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
  const entry = await db('accounts').where('id', id).update(account) // eslint-disable-line
  const updatedAccount = await getById(id)
  return updatedAccount
}

const deleteById = async (id) => {
  // delete from accounts where 'id', id
  const postToDelete = await getById(id)
  const affectedEntry = await db('accounts').where('id', id).del() // eslint-disable-line
  return postToDelete
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
