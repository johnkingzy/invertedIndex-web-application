'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* My Test Setups */
/* global describe it expect */


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
    expect(_typeof(myClass.readFile)).toBe('function');
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
  it('Should return true for creating Index', function () {
    expect(myClass.createIndex('books.json', _books2.default)).toBeTruthy();
  });

  it('Should return `please enter a keyword to search', function () {
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
    expect(invalidKey).toThrowError();
  });
});