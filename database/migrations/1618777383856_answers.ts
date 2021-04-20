import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Answers extends BaseSchema {
  protected tableName = 'answers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('custom_ordering_index').unsigned().nullable()
      table.string('title').notNullable()
      table.boolean('is_correct').notNullable()
      table.integer('quiz_id').unsigned()
      table
        .foreign('quiz_id')
        .references('id')
        .inTable('quizzes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
