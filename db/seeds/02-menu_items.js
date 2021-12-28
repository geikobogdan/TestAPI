exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("menu")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("menu").insert([
        {
          id: 1,
          name: "menu_item_1",
          ingredients: ["ingr1", "ingr2", "ingr3", "ingr4"],
        },
        {
          id: 2,
          name: "menu_item_2",
          ingredients: ["ingr21", "ingr22", "ingr23", "ingr24"],
        },
      ]);
    });
};
