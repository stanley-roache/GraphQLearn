
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_moemoea_relations', table => {
    table.increments('id').primary()
    table.integer('user_id')
    table.integer('moemoea_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_moemoea_relations')
};
