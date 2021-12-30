const personService = require("../person");

describe("person service", () => {
  let personInfo;

  beforeAll(() => {
    personInfo = {
      firstName: "testName",
      lastName: "testLast",
      email: "email@gmail.com",
      password: "qwerty123",
      role: "user",
    };
  });

  test("create person", () => {
    return personService.createPerson(personInfo).then((person) => {
      delete personInfo.password;
      const { id, ...data } = person;

      expect(id).toBeGreaterThan(0);
      expect(data).toEqual(personInfo);

      personInfo.id = id;
    });
  });

  test("edit person by id", () => {
    personInfo = {
      ...personInfo,
      firstName: "testNameEDIT",
      lastName: "testLastEDIT",
    };

    return personService
      .editPerson(personInfo.id, {
        firstName: "testNameEDIT",
        lastName: "testLastEDIT",
      })
      .then((person) => {
        expect(person).toEqual(personInfo);
      });
  });

  test("get all persons", () => {
    personService.getAll().then((response) => {
      const { count, persons } = response;
      expect(persons).toContainEqual(personInfo);
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test("get person by id", () => {
    return personService.getById(personInfo.id).then((person) => {
      expect(person).toEqual(personInfo);
    });
  });

  test("delete person", () => {
    return personService.deletePerson(personInfo.id).then((response) => {
      expect(response).toEqual(1);
    });
  });
});
