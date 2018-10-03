
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ngamoemoea').del()
    .then(function () {
      // Inserts seed entries
      return knex('ngamoemoea').insert([
        {id: 1, name: 'License', description: 'I want to get my heavy shipping license'},
        {id: 2, name: 'Enlightment', description: 'I want to become enlightened'},
        {id: 3, name: 'Dog', description: 'I want to own a dog'}
      ]);
    });
};
