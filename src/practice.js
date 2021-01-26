require('dotenv').config()
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

//Build a query that allows customers to see the most popular videos by view at Whopipe by region for the last 30 days
/*
Here's how the SQL will look:
SELECT video_name, region, count(date_viewed) AS views
FROM whopipe_video_views
  WHERE date_viewed > (now() - '30 days'::INTERVAL)
GROUP BY video_name, region
ORDER BY region ASC, views DESC;
*/
// function mostPopularVidsin30(days) {
//   knexInstance
//   .select('video_name', 'region')
//   .count('date_viewed AS views')
//   .from('whopipe_video_views')
//   .where('date_viewed',
//   '>', 
//   knexInstance.raw(`now() - '?? days'::INTERVAL`, days) //raw --> pass raw SQL as a string
//   )
//   .groupBy('video_name', 'region')
//   .orderBy([
//     { column: 'region', order: 'ASC'},
//     { column: 'views', order: 'DESC'}
//   ])
//   .then(res => {
//     console.log(res)
//   })
// }
// mostPopularVidsin30(30)

//Filter Amazong products that have images
// function paginateProductsWithImages() {
//   knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .whereNotNull('image')
//     .then(res => {
//       console.log(res)
//     })
// }

// paginateProductsWithImages()

// We can add our paginateProducts function to the practice.js like so:
// function paginateProducts(page) {
//   const productsPerPage = 10
//   const offet = productsPerPage * (page - 1)
//   knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .limit(productsPerPage)
//     .offset(offet)
//     .then(res => {
//       console.log(res)
//     })
// }

// paginateProducts(2) //product_id 11-20

// function searchByProduceName(searchTerm) {
//   knexInstance
//   .select('product_id', 'name', 'price', 'category')
//   .from('amazong_products')
//   .where('name', 'ILIKE', `%${searchTerm}%`)
//   .then(res => {
//     console.log(res)
//   })
// }
// searchByProduceName('holo')
// const qry = knexInstance.from('amazong_products').select('*')
//   .select('product_id', 'name', 'price', 'category')
//   .from('amazong_products')
//   .where({name: 'Point of view gun'})
//   .first()
//   .toQuery()

//   console.log(qry) //(4 results)

// const q1 = knexInstance('amazong_products').select('*').toQuery()
// const q2 = knexInstance.from('amazong_products').select('*').toQuery()

// console.log('q1:', q1)
// console.log('q2:', q2)
// console.log('knex and driver installed correctly')