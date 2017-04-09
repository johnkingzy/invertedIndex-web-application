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
  function mainController($scope) {
    const invertedIndex = new InvertedIndex();
    $scope.uploadedFiles = {};
    $scope.indexedFiles = {};
    $scope.welcomePage = true;
    $scope.selection = {};
    $scope.msgDisplay = (type, message) => {
      $.toaster({
        priority: 'danger',
        title: '',
        message: message
      });
    };


    $scope.createIndex = (selectedFile) => {
      if (selectedFile === null || typeof selectedFile === 'undefined') {
        $scope.msgDisplay('danger', 'Hello World');
      }
      const fileContent = $scope.uploadedFiles[selectedFile];
      if (invertedIndex.createIndex(selectedFile, fileContent)) {
        const indices = invertedIndex.getIndex(selectedFile),
          tokens = Object.keys(indices),
          bookIndices = invertedIndex.booksIndex(selectedFile);
        $scope.indexedFiles[selectedFile] = {
          selectedFile,
          indices,
          bookIndices,
          tokens
        };
        $scope.books = Object.keys($scope.indexedFiles);
        if ($scope.books.length > 1) {
          $scope.showView = true;
        }
      }
      $scope.viewIndex(selectedFile);
      $scope.selection[selectedFile] = true;
    };


    $scope.viewIndex = (viewFile) => {
      const selectedFile = viewFile || $scope.viewFile;
      const indexAtrr = $scope.indexedFiles[selectedFile];
      $scope.indices = indexAtrr.indices;
      $scope.tokens = indexAtrr.tokens;
      $scope.bookIndices = indexAtrr.bookIndices;
      $scope.showIndex = true;
      $scope.welcomePage = false;
    };

    $scope.searchIndex = () => {
      $scope.searchResult = {};
      if (typeof $scope.bookIndices === 'undefined') {
        $scope.msgDisplay('danger', 'No files has been indexedFiles Yet');
        return false;
      }
      const keywords = $scope.keyword,
        selected = Object.keys($scope.selection)
          .filter(key => $scope.selection[key] === true);
      let totalBooks;
      if (selected.length < 1) {
        totalBooks = Object.keys($scope.indexedFiles);
      } else {
        totalBooks = selected;
      }
      try {
        invertedIndex.searchIndex(keywords, totalBooks);
        const finalResult = invertedIndex.finalResult;
        Object.keys(finalResult)
          .forEach((key) => {
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
              $scope.welcomePage = false;
            }
          });
      } catch (error) {
        $scope.msgDisplay('danger', error);
      }
    };

    $scope.home = () => {
      $scope.showSearch = false;
      $scope.showIndex = false;
      $scope.welcomePage = true;
    };

    /** @function uploadFile
      * @param {uploadedFile} uploadedFile
      * @return {null} null
      */
    function uploadFile(uploadedFile) {
      const files = uploadedFile.target.files;
      $scope.replaceFiles = [];
      Object.keys(files)
        .forEach((file) => {
          InvertedIndex.readFile(files[file])
            .then((result) => {
              const fileName = result[0];
              const fileContent = result[1];
              $scope.$apply(() => {
                $scope.uploadedFiles[fileName] = fileContent;
                const message = `${fileName} was uploaded successfully`;
                $.toaster({
                  priority: 'success',
                  title: 'SUCCESS!',
                  message: message
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
    function Init() {
      const fileSelect = document.getElementById('fileselect');
      fileSelect.addEventListener('change', uploadFile, false);
    }
    if (window.File && window.FileList && window.FileReader) {
      Init();
    }
  }
  /** @function imageCheck
   * @param {Array} input
   * @param {Array} tokenArray
   * @return {String} string
    */
  const imageCheck = () => (input, tokenArray) => {
    if (tokenArray.includes(input)) {
      return 'check';
    }
    return 'cross';
  };

  const app = angular.module('invertedIndex',
    ['angularUtils.directives.dirPagination']);
  app.controller('IndexController', mainController);
  app.filter('imageCheck', imageCheck);
  mainController.$inject = ['$scope'];
})();
