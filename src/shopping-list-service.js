const ShoppingListService = {
  getAllItems(knex) {
    return knex.select('*').from('shopping-list')
  },
  insertList(knex, newList) {
    return knex
      .insert(newList)
      .into('shopping-list')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('shopping-list').select('*').where('id', id).first()
  },
  updateList(knex, id, newListFields) {
    return knex('shopping-list')
      .where({ id })
      .update(newListFields)
  },
  deleteList(knex, id) {
    return knex('shopping-list')
      .where({ id })
      .delete()
  }
}

module.exports = ShoppingListService;