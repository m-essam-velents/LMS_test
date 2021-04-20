import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserLessons extends BaseSchema {
  protected tableName = 'user_lessons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned()
      table.integer('lesson_id').unsigned()
      table.enum('completion_status', ['notStarted', 'pending', 'finished']).defaultTo('notStarted')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
