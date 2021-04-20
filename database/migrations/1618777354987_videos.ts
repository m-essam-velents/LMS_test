import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Videos extends BaseSchema {
  protected tableName = 'videos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('source').notNullable()
      table.string('custom_thumbnail').nullable()
      table.string('description').nullable()
      table.integer('lesson_id').unsigned()

      table
        .foreign('lesson_id')
        .references('id')
        .inTable('lessons')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
