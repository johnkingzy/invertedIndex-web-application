/* global angular */
/* global document */
/* global window */
/* global $ */
/* global InvertedIndex */

(() => {
  /** @function mainCtrl
   * @param {$scope} $scope
   * @return {null} null
  */
  mainCtrl = ($scope) => {
    const invertedIndex = new InvertedIndex();
    $scope.uploadedFiles = {};
    $scope.indexed = {};
    $scope.welcome = true;
    $scope.selection = {};
    $scope.msgDisplay = (type, msg) => {
      $.toaster({
        priority: 'danger',
        title: '',
        message: msg
      });
    };

    $scope.createIndex = (selectedFile) => {
      if (selectedFile === null || typeof selectedFile === 'undefined') {
        $scope.msgDisplay('danger', 'Select a File to Create Index');
      }
      const fileContent = $scope.uploadedFiles[selectedFile];
      if (invertedIndex.createIndex(selectedFile, fileContent)) {
        const indices = invertedIndex.getIndex(selectedFile),
          tokens = Object.keys(indices),
          bookIndices = invertedIndex.booksIndex(selectedFile);
        $scope.indexed[selectedFile] = {
          selectedFile,
          indices,
          bookIndices,
          tokens
        };
        $scope.books = Object.keys($scope.indexed);
        if ($scope.books.length > 1) {
          $scope.showView = true;
        }
      }
      $scope.viewIndex(selectedFile);
      $scope.selection[selectedFile] = true;
    };


    $scope.viewIndex = (viewFile) => {
      const selectedFile = viewFile || $scope.viewFile;
      const indexAtrr = $scope.indexed[selectedFile];
      $scope.indices = indexAtrr.indices;
      $scope.tokens = indexAtrr.tokens;
      $scope.bookIndices = indexAtrr.bookIndices;
      $scope.showIndex = true;
      $scope.welcome = false;
    };

    $scope.searchIndex = () => {
      $scope.searchResult = {};
      if (typeof $scope.bookIndices === 'undefined') {
        $scope.msgDisplay('danger', 'No files has been indexed Yet');
        return false;
      }
      const keywords = $scope.keyword,
        location = Object.keys($scope.selection)
          .filter(key => $scope.selection[key] === true);
      let totalBooks;
      if (location.length < 1) {
        totalBooks = Object.keys($scope.indexed);
      } else {
        totalBooks = location;
      }
      try {
        invertedIndex.searchIndex(keywords, totalBooks);
        const finalResult = invertedIndex.finalResult,
          keys = Object.keys(finalResult);
        keys.forEach((key) => {
          const file = finalResult[key];
          const totalBook = invertedIndex.booksIndex(key);
          $scope.searchResult[key] = {
            name: key,
            result: file,
            countBook: totalBook
          };
          if (Object.keys($scope.searchResult).length !== 0) {
            $scope.showSearch = true;
            $scope.showIndex = false;
            $scope.welcome = false;
          }
        });
      } catch (error) {
        $scope.msgDisplay('danger', error);
      }
    };

    $scope.home = () => {
      $scope.showSearch = false;
      $scope.showIndex = false;
      $scope.welcome = true;
    };

    /** @function init
     * @param {object} uploadedFile
   * @return {null} null
  */
    uploadFile = (uploadedFile) => {
      const files = uploadedFile.target.files;
      $scope.replaceFiles = [];
      const keys = Object.keys(files);
      keys.forEach((key) => {
        InvertedIndex.readFile(files[key])
          .then((result) => {
            const fileName = result[0];
            const fileContent = result[1];
            $scope.$apply(() => {
              $scope.uploadedFiles[fileName] = fileContent;
              const msg = `${fileName} was uploaded successfully`;
              $.toaster({
                priority: 'success',
                title: 'SUCCESS!',
                message: msg
              });
            });
          })
          .catch((error) => {
            $scope.msgDisplay('danger', error);
            $scope.$apply();
          });
      });
    }

    /** @function Init
   * @return {null} null
  */
    Init = () => {
      const fileselect = document.getElementById('fileselect');
      fileselect.addEventListener('change', uploadFile, false);
    }
    if (window.File && window.FileList && window.FileReader) {
      Init();
    }
  }
  /** @function checkBook
   * @param {Number} input
   * @param {Array} Books
   * @return {String} 
  */
  const checkBook = () => (input, Books) => {
    if (Books.includes(input)) {
      return 'check';

    }
    return 'cross';
  };

  const app = angular.module('invertedIndex',
    ['angularUtils.directives.dirPagination']);
  app.controller('IndexCtrl', mainCtrl);
  app.filter('checkBook', checkBook);
  mainCtrl.$inject = ['$scope'];
})();
