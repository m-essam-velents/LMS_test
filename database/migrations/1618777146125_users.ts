import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('type').notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('ssn').notNullable()
      table.enum('gender', ['male', 'female']).notNullable()
      table.string('phone').nullable()
      table.string('avatar').nullable()
      table.string('default_payment_method').nullable()
      table.string('facebook').nullable()
      table.string('twitter').nullable()
      table.string('instagram').nullable()
      table.string('linkedin').nullable()
      table.string('extra_link').nullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
