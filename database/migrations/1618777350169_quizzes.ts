import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Quizzes extends BaseSchema {
  protected tableName = 'quizzes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('description').nullable()
      table.string('time_limit').nullable()
      //if total score is null then this quiz is not rated
      table.integer('total_score').nullable()
      // table.integer('per_question_score').nullable()

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
