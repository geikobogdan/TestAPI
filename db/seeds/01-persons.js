exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('person')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('person').insert([
        {
          id: 1,
          first_name: 'test_name_1',
          last_name: 'test_last_name_1',
          email: 'test1@gmail.com',
          role: 'admin',
          password:
            '$2b$10$74VXRPWfPqEYokXskR4VKuc4FOT2pqkQFe.YOxW7GCP0Cw9ifNhLa', // qwerty123
        },
        {
          id: 2,
          first_name: 'test_name_2',
          last_name: 'test_last_name_2',
          email: 'test2@gmail.com',
          role: 'user',
          password:
            '$2b$10$74VXRPWfPqEYokXskR4VKuc4FOT2pqkQFe.YOxW7GCP0Cw9ifNhLa', // qwerty123
        },
      ]));
};
