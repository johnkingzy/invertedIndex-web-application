'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* My Test Setups */
// const myClass = new InvertedIndex();
var allBooks = new myBook();
var book = allBooks.getBook('books.json');
myClass.createIndex('books.json', book);
// const result = getIndex('books.json');

/* My Suites */
describe('Class and Method Instantaion', function () {
    var myClass = void 0;
    beforeEach(function () {
        myClass = new InvertedIndex();
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

        expect(_typeof(myClass.readFile)).toBe('function');
    });

    it('Should contain the tokenize method', function () {

        expect(_typeof(myClass.tokenize)).toBe('function');
    });

    it('Should contain the validateFile method', function () {

        expect(_typeof(myClass.validateFile)).toBe('function');
    });
});

describe('Populating Data', function () {
    var myClass = void 0;
    beforeEach(function () {
        myClass = new InvertedIndex();
    });
    it('Should return true for creating Index', function () {
        expect(myClass.createIndex('books.json', book)).toBeTruthy();
    });

    it('Should return `file does not exist for unknown fileName', function () {
        expect(myClass.getIndex('welcome')).toBe('File doesn\'t exist');
    });

    it('Should return `file does not exist for unknown fileName', function () {
        expect(myClass.searchIndex('alice')).toBeTruthy();
    });
});