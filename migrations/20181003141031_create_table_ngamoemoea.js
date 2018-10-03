exports.up = function(knex, Promise) {
  return knex.schema.createTable('ngamoemoea', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ngamoemoea')
};
