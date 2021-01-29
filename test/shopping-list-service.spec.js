const ShoppingListServices = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping list service object`, () => {
  let db;
  let sampleList = [
    {
      id:1,
      name: 'Steak',
      price: 32.00,
      date_added: new Date('2022-01-22T16:28:32.615Z'),
      checked: false,
      category: 'Dinner'
    },
    {
      id: 2,
      name: 'Salmon and Filet',
      price: 38.00,
      date_added: new Date('2022-02-22T16:28:32.615Z'),
      checked: false,
      category: 'Lunch'
    },
    {
      id: 3,
      name:'Lobster & Crab',
      price: 70.00,
      date_added: new Date('2022-03-22T16:28:32.615Z'),
      checked: false,
      category: 'Fine Dining Exp'
    }
  ]
  
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
  })
  
  before(() => db('shopping-list').truncate())
  
  after(() => db.destroy())
  
  afterEach(() => db('shopping-list').truncate())
  
  context(`Given 'shopping-list' has data`, () => {
    beforeEach(() => {
      return db
      .into('shopping-list')
      .insert(sampleList)
    })
    it('getAllItems() resolves all shopping list items from shopping-list-service table', () => {
      const idOfListToUpdate = 3;
      const newListData = {
        name: 'updated name',
        price: 0.00,
        date_added: new Date(),
        checked: false,
        category: grocery
      }
      it(`updateList() update the list from the 'shopping-list' table`, () => {
        return ShoppingListServices.updateList(db, idOfListToUpdate, newListData)
        .then(() => ShoppingListServices.getById(db, idOfListToUpdate))
        .then(list => {
          expect(list).to.eql({
            id: idOfListToUpdate,
            ...newListData
          })
        })
      })
      it(`deleteList() removes an articel by id from 'shopping-list' table`, () => {
        const listId = 3;
        return ShoppingListServices.deleteList(db, listId)
        .then(() => ShoppingListServices.getAllItems(db))
        .then(allListItems => {
          const expected = sampleList.filter(list => list.id !== listId)
          .map(list => ({
            ...list,
            checked: false
          }))
          expect(allListItems).to.eql(expected)
        })
      })
      it(`getById() resolves an article by id form 'shopping-list' table`, () => {
        const thirdId = 3;
        const thirdShoppingList = sampleList[thirdId -1]
        return ShoppingListServices.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            name: thirdShoppingList.name,
            price: thirdShoppingList.price,
            date_added: thirdShoppingList.date_added,
            checked: thirdShoppingList.checked,
            category: thirdShoppingList.category
          })
        })
      })
      context(`Given 'shopping-list' has no data`, () => {
        it(`getAllItems() resolves an empty array`, () => {
          return ShoppingListServices.getAllItems(db)
          .then(actual => {
            expect(actual).to.eql([])
          })
        })
      })
      it(`insertList() insert a new list and resolves the list with an 'id'`, () => {
        const newList = {
          name: 'Test new name',
          price: 0.00,
          date_added: new Date(),
          checked: false,
          category: grocery
        }
        return ShoppingListServices.insertList(db, newList)
        .then(actual => {
          expect(actual).to.eql({
            id: 1, 
            price: newList.price,
            date_added: new Date(newList.date_added),
            checked: newList.checked,
            category: newList.category
          })
        })
      })     
    })
  })
})