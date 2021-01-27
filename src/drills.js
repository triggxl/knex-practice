//connecting to knex database to perform functions
require('dotenv').config()
const knex = require('knex');

// creating instance to build queries/selecting driver to use
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

console.log('knex and driver installed correctly')

// 1. Get all items that contain text
function searchItemsThatContainText(searchTerm) {
  knexInstance
  .select('list_id', 'name', 'price', 'date_added', 'checked', 'category')
  .from('shopping-list')
  .where(name, 'ILIKE', `%${searchTerm}%`)
  .then(res => {
    console.log('Search Term', { searchTerm })
    console.log(res)
  })
}
searchItemsThatContainText('snack')

/*WRITE OUT REMAINING DRILLS AND THEN LOOK AT SOLUTION */
// 2. Get all items paginated
function paginateProducts(page) {
  const productsPerPage = 6;
  const offset = productsPerPage * (page -1)
  knexInstance
  .select('*')
  .from('shopping-list')
  .limit(productsPerPage)
  .offset(offset)
  .then(res => {
    console.log('Search Term', { page }, res)
  })
}
paginateProducts(5)

// 3. Get all items added after date
function itemsAfterSelectedDate(daysAgo) {
  knexInstance
  .select('list_id', 'name', 'price', 'date_added', 'checked', 'category')
  .count('date_added AS views')
  .from('shopping-list')
  .where('date_added'),
  '>',
  knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo
  )
  .groupBy('date_added')
  .orderBy([
    { column: 'date_added', order: 'DESC'}
  ])
  .then(res => console.log(res))
}

itemsAfterSelectedDate(30)

// 4. Get the total cost for each category
// select sum from groupBy then
function totalCostPerCat() {
  knexInstance
  .select('*')
  .sum('total')
  .from('shopping-list')
  .groupBy('category')
  .then(res => {
    console.log('Total Cost of Category', res)
  })
}

totalCostPerCat()