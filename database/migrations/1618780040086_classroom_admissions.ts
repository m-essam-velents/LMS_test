import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassroomAdmissions extends BaseSchema {
  protected tableName = 'classroom_admissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('classroom_id').unsigned()
      table.integer('user_id').unsigned()
      table.primary(['classroom_id', 'user_id'])

      table.foreign('classroom_id').references('id').inTable('classrooms')
      table.foreign('user_id').references('id').inTable('users')

      table
        .enum('current_status', ['pending', 'accepted', 'rejected'])
        .defaultTo('pending')
        .nullable()
      table.enum('prev_status', ['pending', 'accepted', 'rejected']).nullable()
      table.string('rejection_reason').nullable()

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
