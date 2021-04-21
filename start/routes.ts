/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
/* Route.get('/', async () => {
  return { hello: 'world' }
})
 */
// db health check
Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

// auth
Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
  Route.post('logout', 'AuthController.logout')
}).prefix('auth')

// user
Route.group(() => {
  Route.put('edit', 'UsersController.edit')
})
  .prefix('user')
  .middleware(['auth'])

// course
Route.resource('course', 'CoursesController').apiOnly()
Route.group(() => {
  Route.post('enroll/:id', 'CoursesController.enrollToCourse').where('id', /\d/)
  Route.put('unEnroll/:id', 'CoursesController.unEnrollFromCourse').where('id', /\d/)
})
  .prefix('course')
  .middleware(['auth'])

// classroom
Route.resource('classroom', 'ClassroomsController').apiOnly()
Route.group(() => {
  Route.post('enroll/:id', 'ClassroomsController.enrollToClassroom').where('id', /\d/)
  Route.put('unEnroll/:id', 'ClassroomsController.unEnrollFromClassroom').where('id', /\d/)
  Route.post('admit/:id', 'ClassroomsController.admit').where('id', /\d/)
})
  .prefix('classroom')
  .middleware(['auth'])
