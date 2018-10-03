
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_moemoea_relations').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_moemoea_relations').insert([
        {id: 1, user_id: 1, moemoea_id: 2},
        {id: 2, user_id: 1, moemoea_id: 3},
        {id: 3, user_id: 2, moemoea_id: 1},
        {id: 4, user_id: 2, moemoea_id: 2},
        {id: 5, user_id: 3, moemoea_id: 3},
        {id: 6, user_id: 3, moemoea_id: 1}
      ]);
    });
};
