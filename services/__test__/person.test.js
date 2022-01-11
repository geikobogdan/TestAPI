const personService = require('../person');
const personDAO = require('../../dao/person');

describe('person service', () => {
  let personInfo;

  beforeEach(() => {
    personInfo = {
      firstName: 'testName',
      lastName: 'testLast',
      email: 'email@gmail.com',
      password: 'qwerty123',
      role: 'user',
    };
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('create person', () => {
    test('should return created person', () => {
      jest.spyOn(personDAO, 'createPerson').mockImplementation(
        (firstName, lastName, email, _password, role) =>
          new Promise((resolve) => {
            resolve({
              id: 21,
              firstName,
              lastName,
              email,
              role,
            });
          }),
      );

      return personService.createPerson(personInfo).then((person) => {
        expect(personDAO.createPerson).toHaveBeenCalledWith(
          'testName',
          'testLast',
          'email@gmail.com',
          'qwerty123',
          'user',
        );
        expect(person).toStrictEqual({
          id: 21,
          firstName: 'testName',
          lastName: 'testLast',
          email: 'email@gmail.com',
          role: 'user',
        });
      });
    });
  });

  describe('edit person by id', () => {
    test('should return edited person', () => {
      personInfo = {
        ...personInfo,
        id: 21,
        firstName: 'testNameEDIT',
        lastName: 'testLastEDIT',
      };

      jest.spyOn(personDAO, 'editPerson').mockImplementation(
        (id, firstName, lastName, email, _password, role) =>
          new Promise((resolve) => {
            resolve({
              id,
              firstName,
              lastName,
              email,
              role,
            });
          }),
      );

      return personService
        .editPerson(personInfo.id, personInfo)
        .then((person) => {
          expect(personDAO.editPerson).toHaveBeenCalledWith(
            21,
            'testNameEDIT',
            'testLastEDIT',
            'email@gmail.com',
            'qwerty123',
            'user',
          );
          expect(person).toStrictEqual({
            id: 21,
            firstName: 'testNameEDIT',
            lastName: 'testLastEDIT',
            email: 'email@gmail.com',
            role: 'user',
          });
        });
    });
  });

  describe('get all persons', () => {
    test('should return all persons and count', async () => {
      jest.spyOn(personDAO, 'getAll').mockImplementation(
        () =>
          new Promise((resolve) => {
            resolve({
              count: 1,
              persons: [
                {
                  id: 21,
                  firstName: 'testName',
                  lastName: 'testLast',
                  email: 'email@gmail.com',
                  role: 'user',
                },
              ],
            });
          }),
      );

      personService.getAll().then((response) => {
        const { count, persons } = response;
        expect(persons).toContainEqual({
          id: 21,
          firstName: 'testName',
          lastName: 'testLast',
          email: 'email@gmail.com',
          role: 'user',
        });
        expect(count).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('get person by id', () => {
    test('should return person by id', () => {
      jest.spyOn(personDAO, 'getById').mockImplementation(
        (id) =>
          new Promise((resolve) => {
            resolve({
              id,
              firstName: 'testName',
              lastName: 'testLast',
              email: 'email@gmail.com',
              role: 'user',
            });
          }),
      );

      return personService.getById(21).then((person) => {
        expect(personDAO.getById).toHaveBeenCalledWith(21);
        expect(person).toStrictEqual({
          id: 21,
          firstName: 'testName',
          lastName: 'testLast',
          email: 'email@gmail.com',
          role: 'user',
        });
      });
    });
  });

  describe('delete person', () => {
    test('should return 1', () => {
      jest.spyOn(personDAO, 'deletePerson').mockImplementation(
        () =>
          new Promise((resolve) => {
            resolve(1);
          }),
      );
      personService.deletePerson(21).then((response) => {
        expect(personDAO.deletePerson).toHaveBeenCalledWith(21);
        expect(response).toEqual(1);
      });
    });
  });
});
