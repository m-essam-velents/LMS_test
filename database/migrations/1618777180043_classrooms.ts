import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Classrooms extends BaseSchema {
  protected tableName = 'classrooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('price').notNullable()
      table.enum('status', ['active', 'temporary_closed', 'closed', 'archived']).defaultTo('active')
      table.enum('type', ['onGround', 'online']).notNullable()
      table.string('description').nullable()
      table.integer('admitted_users_count').defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
