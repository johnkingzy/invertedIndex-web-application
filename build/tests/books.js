"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var myBook = function () {
  function myBook() {
    _classCallCheck(this, myBook);

    this.books = {
      'books.json': [{
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
      }, {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
      }, {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
      }, {
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
      }, {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
      }, {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
      }]
    };
  }

  _createClass(myBook, [{
    key: "getBook",
    value: function getBook(bookName) {
      if (this.books.hasOwnProperty(bookName)) {
        return this.books[bookName];
      }
    }
  }]);

  return myBook;
}();