'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class InvertedIndex
 * @classdesc blah blah
 */
var InvertedIndex = function () {
  /**
   * @constructor
   * initialises the class base properties
   */
  function InvertedIndex() {
    _classCallCheck(this, InvertedIndex);

    this.indicies = {};
    this.indexedFiles = {};
    this.numOfBooks;
    this.uploadedFiles = {};
  }

  /**
   * @createIndex method
   * @param {fileName}
   * @param {fileContent}
   * create index of the fileName
   */


  _createClass(InvertedIndex, [{
    key: 'createIndex',
    value: function createIndex(fileName, fileContent) {
      var _this2 = this;

      this.indicies[fileName] = this.indicies[fileName] || {};
      var numOfBooks = fileContent.length;

      var _loop = function _loop(bookIndex) {
        var eachBookTitle = fileContent[bookIndex].title;
        var eachBookText = fileContent[bookIndex].text;
        var eachBookToken = _this2.tokenize(eachBookTitle + ' ' + eachBookText);

        eachBookToken.forEach(function (elem, index) {
          if (elem in _this2.indicies[fileName]) {
            var eachToken = _this2.indicies[fileName][elem];
            if (eachToken.indexOf(bookIndex) === -1) {
              _this2.indicies[fileName][elem].push(bookIndex);
            }
          } else {
            //Initially this is what happens
            _this2.indicies[fileName][elem] = [bookIndex];
          }
        });
      };

      for (var bookIndex = 0; bookIndex < numOfBooks; bookIndex += 1) {
        _loop(bookIndex);
      }

      this.indexedFiles[fileName] = numOfBooks;
      return true;
    }

    /**
     * @getIndex method
     * @param {fileName}
     * gets the index of the fileName
     */

  }, {
    key: 'getIndex',
    value: function getIndex(fileName) {
      if (typeof fileName === 'string') {
        if (this.indicies.hasOwnProperty(fileName)) {
          return this.indicies[fileName];
        } else {
          return 'File doesn\'t exist';
        }
      } else {
        return false;
      }
    }

    /**
     * @getNumofBooks method
     * @param {fileName}
     * create index of the fileName
     */

  }, {
    key: 'getNumOfBooks',
    value: function getNumOfBooks(fileName) {
      var numOfBooks = this.indexedFiles[fileName];
      var arr = [];
      for (var i = 0; i < numOfBooks; i += 1) {
        arr.push(i);
      }
      return arr;
    }

    /**
     * @tokenize method
     * @param {str}
     * create index of the fileName
     */

  }, {
    key: 'tokenize',
    value: function tokenize(str) {
      var value = str;
      value = value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').trim().toLowerCase().split(" ");
      return value;
    }

    /**
     * @readFile method
     * @param {book}
     * reads the content of the book
     */

  }, {
    key: 'readFile',
    value: function readFile(book) {
      var _this = this;
      return new Promise(function (resolve, reject) {
        var bookReader = new FileReader();
        bookReader.onload = function onload() {
          return function (readObj) {
            try {
              var tranFile = [];
              var fileName = book.name;
              var fileContent = JSON.parse(readObj.target.result);
              if (_this.validateFile(fileContent, fileName)) {
                tranFile.push(fileName);
                tranFile.push(fileContent);
                resolve(tranFile);
              }
            } catch (error) {
              console.log(error);
            }
          };
        }(book);
        bookReader.readAsText(book);
      });
    }

    /**
     * @validateFile method
     * @param {fileContent}
     * @param {fileName}
     * reads the content of the book
     */

  }, {
    key: 'validateFile',
    value: function validateFile(fileContent, fileName) {
      // return 
      try {
        var fileExt = fileName.split(".").pop();
        if (fileExt != "json") {
          throw new Error("Invalid File Type, Only JSON documents are allowed");
        }
        fileContent.forEach(function (elem, i) {
          if (!Object.keys(elem).includes('title') || !Object.keys(elem).includes('text')) {
            throw new Error("OOPS! your file is not well formatted");
          }
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    /**
     * @validateFile method
     * @param {fileContent}
     * @param {fileName}
     * reads the content of the book
     */

  }, {
    key: 'searchIndex',
    value: function searchIndex(keyword, locations) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        try {
          if (!keyword) {
            throw new Error('Please enter a keyword to search');
          }
          var _this = _this3;
          var finalResult = {};
          if (locations.length === 0) {
            locations = Object.keys(_this3.indicies);
          }
          locations.forEach(function (fileName) {
            var result = _this3.getResult(keyword, fileName);
            finalResult[fileName] = result;
          });
          resolve(finalResult);
        } catch (error) {
          console.log(error);
        }
      });
    }

    /**
     * @getResult method
     * @param {keyword}
     * @param {token}
     * get the result of the keyword from the indicies
     */

  }, {
    key: 'getResult',
    value: function getResult(keyword, fileName) {
      var _this = this;
      var searchResult = {};
      var keywords = _this.cleanValues(keyword);
      var fileIndex = this.indicies[fileName];
      var currentToken = Object.keys(this.indicies[fileName]);
      keywords.forEach(function (elem) {
        if (currentToken.includes(elem)) {
          searchResult[elem] = fileIndex[elem];
        }
      });
      return searchResult;
    }

    /**
     * @cleanValues method
     * @param {str}
     * cleans the keyword for search
     */

  }, {
    key: 'cleanValues',
    value: function cleanValues(str) {
      var value = str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ' ').split(/\b\s+(?!$)/);
      return value;
    }
  }]);

  return InvertedIndex;
}();