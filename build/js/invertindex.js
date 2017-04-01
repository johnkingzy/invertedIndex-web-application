'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*eslint-disable */
/* global FileReader */
/**
 * @class InvertedIndex
 * @classdesc blah blah
 */
var InvertedIndex = function () {
  /**
   * * @constructor
   * initialises the class base properties
   */
  function InvertedIndex() {
    _classCallCheck(this, InvertedIndex);

    this.indicies = {};
    this.indexedFiles = {};
    this.uploadedFiles = {};
  }
  /*eslint-enable */
  /**
   * @createIndex method
   * @param {fileName} fileName
   * @param {fileContent} fileContent
   * @returns {boolean}
   * create index of the fileName
   */


  _createClass(InvertedIndex, [{
    key: 'createIndex',
    value: function createIndex(fileName, fileContent) {
      var _this = this;

      this.indicies[fileName] = this.indicies[fileName] || {};
      var numOfBooks = fileContent.length;

      var _loop = function _loop(bookIndex) {
        var _fileContent$bookInde = fileContent[bookIndex],
            title = _fileContent$bookInde.title,
            text = _fileContent$bookInde.text;

        var tokens = InvertedIndex.tokenize(title + ' ' + text);
        var indicies = _this.indicies[fileName];
        tokens.forEach(function (token) {
          if (token in indicies) {
            var eachToken = indicies[token];
            if (eachToken.indexOf(bookIndex) === -1) {
              indicies[token].push(bookIndex);
            }
          } else {
            // Initially this is what happens
            indicies[token] = [bookIndex];
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
     * @param {fileName} fileName
     * @returns {Object}
     * gets the index of the fileName
     */

  }, {
    key: 'getIndex',
    value: function getIndex(fileName) {
      return this.indicies[fileName];
    }

    /**
    * @getNumofBooks method
    * @param {fileName} fileName
    * @returns {Array}
    * create index of the fileName
    */

  }, {
    key: 'getNumOfBooks',
    value: function getNumOfBooks(fileName) {
      var numOfBooks = this.indexedFiles[fileName];
      var indexArr = [];
      for (var i = 0; i < numOfBooks; i += 1) {
        indexArr.push(i);
      }
      return indexArr;
    }

    /**
     * @tokenize method
     * @param {str} str
     * @returns {Array}
     * create index of the fileName
     */

  }, {
    key: 'searchIndex',


    /**
     * @searchIndex method
     * @param {keyword} keyword
     * @param {locations} locations
     * @returns {Boolean}
     * reads the content of the book
     */
    value: function searchIndex(keyword, locations) {
      var _this2 = this;

      var self = this;
      var books = Object.keys(self.indicies);
      if (!keyword) {
        var error = 'please enter a keyword to search.';
        throw new Error(error);
      }

      self.finalResult = {};
      if (!locations || books.length === 0) {
        var _error = 'No file has been indexed yet';
        throw new Error(_error);
      } else {
        locations = Object.keys(this.indicies);
      }
      locations.forEach(function (fileName) {
        var result = _this2.getResult(keyword, fileName);
        self.finalResult[fileName] = result;
      });
      return true;
    }

    /**
     * @getResult method
     * @param {keyword} keyword
     * @param {fileName} fileName
     * @returns {Array}
     * get the result of the keyword from the indicies
     */

  }, {
    key: 'getResult',
    value: function getResult(keyword, fileName) {
      var searchResult = {};
      var keywords = InvertedIndex.cleanValues(keyword);
      var fileIndex = this.indicies[fileName];
      var currentToken = Object.keys(this.indicies[fileName]);
      keywords.forEach(function (elem) {
        if (currentToken.includes(elem)) {
          searchResult[elem] = fileIndex[elem];
        } else {
          searchResult[elem] = [];
        }
      });
      return searchResult;
    }

    /**
     * @cleanValues method
     * @param {str} str
     * @returns {Array}
     * cleans the keyword for search
     */

  }], [{
    key: 'tokenize',
    value: function tokenize(str) {
      var value = str;
      value = value.replace(/[&\\#,+()$~%.'":*?<>{}]/g, '').trim().toLowerCase().split(/\s+/);
      return value;
    }

    /**
     * @readFile method
     * @param {currentFile} currentFile
     * @returns {Array}
     * reads the content of the book
     */

  }, {
    key: 'readFile',
    value: function readFile(currentFile) {
      return new Promise(function (resolve, reject) {
        var bookReader = new FileReader();
        bookReader.onload = function onload() {
          return function (readObj) {
            var tranFile = [];
            var fileName = currentFile.name;
            var fileContent = readObj.target.result;
            try {
              InvertedIndex.validateFile(fileContent, fileName);
              var content = JSON.parse(fileContent);
              tranFile.push(fileName);
              tranFile.push(content);
              resolve(tranFile);
            } catch (e) {
              reject(e);
            }
          };
        }(currentFile);
        bookReader.readAsText(currentFile);
      });
    }
    /**
     * @validateFile method
     * @param {fileContent} fileContent
     * @param {fileName} fileName
     * @returns {Boolean}
     * reads the content of the book
     */

  }, {
    key: 'validateFile',
    value: function validateFile(fileContent, fileName) {
      var fileExt = fileName.split('.').pop();
      if (fileExt !== 'json') {
        var error = fileName + ' has an Invalid File extension, JSON only';
        throw new Error(error);
      }
      try {
        JSON.parse(fileContent);
      } catch (e) {
        var _error2 = 'OOPS!!! ' + fileName + ' is not well formatted';
        throw new Error(_error2);
      }
      var content = JSON.parse(fileContent);
      if (content.length === 0) {
        var _error3 = fileName + ' is an empty JSON file';
        throw new Error(_error3);
      }
      content.forEach(function (elem) {
        if (!Object.keys(elem).includes('title') || !Object.keys(elem).includes('text')) {
          var _error4 = 'OOPS!!! ' + fileName + ' does not contain title and text';
          throw new Error(_error4);
        }
      });
      return true;
    }
  }, {
    key: 'cleanValues',
    value: function cleanValues(str) {
      var value = str.replace(/[&\\#,+()$~%.'":*?<>{}]/g, ' ').toLowerCase().split(/\b\s+(?!$)/);
      return value;
    }
  }]);

  return InvertedIndex;
}();