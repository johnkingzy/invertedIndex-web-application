/* My Test Setups */
/* global describe it expect */
import myBook from './books.json';
import emptyBook from './emptyBook.json';
import invalidKeys from './Invalidkeys.json';

/* My Suites */
describe('Class and Method Instantaion', () => {
  const myClass = new InvertedIndex();
  it('Should contain the getIndex method', () => {
    expect(typeof myClass.getIndex).toBe('function');
  });

  it('Should contain the createIndex method', () => {
    expect(typeof myClass.createIndex).toBe('function');
  });

  it('Should contain the searchIndex method', () => {
    expect(typeof myClass.searchIndex).toBe('function');
  });

  it('Should contain the readFile method', () => {
    expect(typeof myClass.readFile).toBe('function');
  });

  it('Should contain the tokenize method', () => {
    expect(typeof InvertedIndex.tokenize).toBe('function');
  });

  it('Should contain the validateFile method', () => {
    expect(typeof InvertedIndex.validateFile).toBe('function');
  });
});

describe('Populating Data', () => {
  const myClass = new InvertedIndex();
  it('Should return true for creating Index', () => {
    expect(myClass.createIndex('books.json', myBook)).toBeTruthy();
  });

  it('Should return `please enter a keyword to search', () => {
    const search = () => {
      myClass.searchIndex();
    };
    expect(search).toThrowError('please enter a keyword to search.');
  });

  it('Should return true for well formatted File', () => {
    const book = JSON.stringify(myBook);
    expect(InvertedIndex.validateFile(book, 'books.json')).toBeTruthy();
  });

  it('Should throw an error for empty books', () => {
    const name = 'emptybook.json';
    const checkEmptyBook = () => {
      InvertedIndex.validateFile(emptyBook, name);
    };
    expect(checkEmptyBook).toThrowError();
  });

  it('Should throw an error for Invalid keys', () => {
    const name = 'invalidKeys.json';
    const invalidKey = () => {
      InvertedIndex.validateFile(invalidKeys, name);
    };
    expect(invalidKey).toThrowError();
  });
});
