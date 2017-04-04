/* global angular */
/* global InvertedIndex */
/* global document */
/* global window */
/* global $ */
(() => {
  /** @function mainCtrl
   * @param {$scope} $scope
   * @param {$timeout} $timeout
   * @return {null} null
  */
  function mainCtrl($scope, $timeout) {
    const invertedIndex = new InvertedIndex();
    $scope.uploadedFiles = {};
    $scope.indexed = {};
    $scope.welcome = true;
    $scope.selection = {};
    $scope.msgDisplay = (type, msg) => {
      $scope.msgType = type;
      $scope.displayMsg = msg;
      $scope.showError = true;
      $timeout(() => {
        $scope.showError = false;
      }, 3000);
    };

    $scope.createIndex = (selectedFile) => {
      if (selectedFile === null || typeof selectedFile === 'undefined') {
        $scope.msgDisplay('danger', 'Select a File to Create Index');
        // $("#myModal").modal('show');
      }
      const fileContent = $scope.uploadedFiles[selectedFile];
      if (invertedIndex.createIndex(selectedFile, fileContent)) {
        const indices = invertedIndex.getIndex(selectedFile),
          tokens = Object.keys(indices),
          bookIndices = invertedIndex.getNumOfBooks(selectedFile);
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
        ms = Object.keys($scope.selection)
        .filter(key => $scope.selection[key] === true);
      let totalBooks;
      if (ms.length < 1) {
        totalBooks = Object.keys($scope.indexed);
      } else {
        totalBooks = ms;
      }
      try {
        invertedIndex.searchIndex(keywords, totalBooks);
        const finalResult = invertedIndex.finalResult,
          keys = Object.keys(finalResult);
        keys.forEach((key) => {
          const file = finalResult[key];
          const numOfBook = invertedIndex.getNumOfBooks(key);
          $scope.searchResult[key] = {
            name: key,
            result: file,
            countBook: numOfBook
          };
          if (Object.keys($scope.searchResult).length !== 0) {
            $scope.showSearch = true;
            $scope.showIndex = false;
            $scope.welcome = false;
          }
        });
      } catch (err) {
        $scope.msgDisplay('danger', err);
      }
    };

    $scope.home = () => {
      $scope.showSearch = false;
      $scope.showIndex = false;
      $scope.welcome = true;
    };

    /** @function init
     * @param {uploadedFile} uploadedFile
   * @return {null} null
  */
    function uploadFile(uploadedFile) {
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
    // We can attach the `fileselect` event to all file inputs on the page
    // const fileUpload = document.getElementById('upload');
    /** @function init
   * @return {null} null
  */
    function Init() {
      const fileselect = document.getElementById('fileselect');
      fileselect.addEventListener('change', uploadFile, false);
    }
    if (window.File && window.FileList && window.FileReader) {
      Init();
    }
  }
  /** @function init
   * @return {null} null
  */
  const table = () => (input, arr) => {
    if (arr.includes(input)) {
      return 'check';
    }
    return 'cross';
  };
  // };

  const app = angular.module('invertedIndex',
    ['angularUtils.directives.dirPagination']);
  app.controller('IndexCtrl', mainCtrl);
  app.filter('rowFunc', table);
  mainCtrl.$inject = ['$scope', '$timeout'];
})();
