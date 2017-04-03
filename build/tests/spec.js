'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* My Test Setups */
/* global describe it expect */
/* global FileReader */
/* global InvertedIndex */
/* global File */


var _books = require('./books.json');

var _books2 = _interopRequireDefault(_books);

var _emptyBook = require('./emptyBook.json');

var _emptyBook2 = _interopRequireDefault(_emptyBook);

var _Invalidkeys = require('./Invalidkeys.json');

var _Invalidkeys2 = _interopRequireDefault(_Invalidkeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* My Suites */
describe('Class and Method Instantaion', function () {
  var myClass = new InvertedIndex();

  it('Should be instantiated with the new keyword', function () {
    var init = function init() {
      InvertedIndex();
    };
    expect(init).toThrowError('Cannot call a class as a function');
  });

  it('Should contain the getIndex method', function () {
    expect(_typeof(myClass.getIndex)).toBe('function');
  });

  it('Should contain the createIndex method', function () {
    expect(_typeof(myClass.createIndex)).toBe('function');
  });

  it('Should contain the searchIndex method', function () {
    expect(_typeof(myClass.searchIndex)).toBe('function');
  });

  it('Should contain the readFile method', function () {
    expect(_typeof(InvertedIndex.readFile)).toBe('function');
  });

  it('Should contain the tokenize method', function () {
    expect(_typeof(InvertedIndex.tokenize)).toBe('function');
  });

  it('Should contain the validateFile method', function () {
    expect(_typeof(InvertedIndex.validateFile)).toBe('function');
  });
});

describe('Populating Data', function () {
  var myClass = new InvertedIndex();
  myClass.createIndex('books.json', _books2.default);
  var getIndex = myClass.getIndex('books.json');
  var jsonFile = new File([JSON.stringify(_books2.default)], 'books.json', { type: 'application/json' });
  it('Should return true for creating Index', function () {
    expect(myClass.createIndex('books.json', _books2.default)).toBeTruthy();
  });

  it('Should return `No file has been indexed yet', function () {
    var search = function search() {
      myClass.searchIndex('alice');
    };
    expect(search).toThrowError();
  });

  it('Should return `please enter a keyword to search.`', function () {
    var search = function search() {
      myClass.searchIndex();
    };
    expect(search).toThrowError('please enter a keyword to search.');
  });

  it('Should return true for well formatted File', function () {
    var book = JSON.stringify(_books2.default);
    expect(InvertedIndex.validateFile(book, 'books.json')).toBeTruthy();
  });

  it('Should throw an error for empty books', function () {
    var name = 'emptybook.json';
    var checkEmptyBook = function checkEmptyBook() {
      InvertedIndex.validateFile(_emptyBook2.default, name);
    };
    expect(checkEmptyBook).toThrowError();
  });

  it('Should throw an error for Invalid keys', function () {
    var name = 'invalidKeys.json';
    var invalidKey = function invalidKey() {
      InvertedIndex.validateFile(_Invalidkeys2.default, name);
    };
    expect(invalidKey).toThrowError('OOPS!!! ' + name + ' is not well formatted');
  });

  it('Should return an object for getIndex method', function () {
    expect(typeof getIndex === 'undefined' ? 'undefined' : _typeof(getIndex)).toBe('object');
  });

  it('Should return an alive as the first token', function () {
    var alltoken = Object.keys(getIndex);
    expect(alltoken[0]).toBe('alice');
  });

  it('Should return the numbers of books in a file', function () {
    var numOfBooks = myClass.getNumOfBooks('books.json');
    expect(numOfBooks.length).toEqual(6);
  });

  it('Should return an array for the JSON File', function (done) {
    var readFile = InvertedIndex.readFile(jsonFile);
    readFile.then(function (res) {
      expect(res[1][0].title).toBe('Alice in Wonderland');
      done();
    });
  });

  it('Should return throw an error for Invalid file Extension', function () {
    var validate = function validate() {
      InvertedIndex.validateFile('result', 'sample.txt');
    };
    var error = 'sample.txt has an Invalid File extension, JSON only';
    expect(validate).toThrowError(error);
  });

  it('Should return an array of clean values', function () {
    expect(InvertedIndex.cleanValues('How, are, you doing today')).toEqual(['how', 'are', 'you', 'doing', 'today']);
  });
});