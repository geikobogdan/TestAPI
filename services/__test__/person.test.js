const personService = require('../person');

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

  describe('create person', () => {
    test('should return created person', () => {
      jest.spyOn(personService, 'createPerson').mockImplementation(
        () => new Promise((resolve) => {
          resolve({
            id: 21,
            firstName: 'testName',
            lastName: 'testLast',
            email: 'email@gmail.com',
            role: 'user',
          });
        }),
      );

      return personService.createPerson(personInfo).then((person) => {
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
      delete personInfo.password;
      personInfo = {
        ...personInfo,
        firstName: 'testNameEDIT',
        lastName: 'testLastEDIT',
      };

      jest.spyOn(personService, 'editPerson').mockImplementation(
        () => new Promise((resolve) => {
          resolve({
            id: 21,
            firstName: 'testNameEDIT',
            lastName: 'testLastEDIT',
            email: 'email@gmail.com',
            role: 'user',
          });
        }),
      );

      return personService
        .editPerson(personInfo.id, {
          firstName: 'testNameEDIT',
          lastName: 'testLastEDIT',
        })
        .then((person) => {
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
    test('should return all persons and count', () => {
      jest.spyOn(personService, 'getAll').mockImplementation(
        () => new Promise((resolve) => {
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
      jest.spyOn(personService, 'getById').mockImplementation(
        () => new Promise((resolve) => {
          resolve({
            id: 21,
            firstName: 'testName',
            lastName: 'testLast',
            email: 'email@gmail.com',
            role: 'user',
          });
        }),
      );

      return personService.getById(21).then((person) => {
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
    jest.spyOn(personService, 'deletePerson').mockImplementation(
      () => new Promise((resolve) => {
        resolve(1);
      }),
    );
    test('should return 1', () => personService.deletePerson(21).then((response) => {
      expect(response).toEqual(1);
    }));
  });
});
