
(function (){
const app = angular.module("invertedIndex", ['angularUtils.directives.dirPagination']);
  app.controller('IndexCtrl', mainCtrl);
  app.filter('rowFunc', rowFilterFactory);
  mainCtrl.$inject = ['$scope', '$timeout'];
 function mainCtrl ($scope, $timeout) {
  const invertedIndex = new InvertedIndex();
  $scope.uploadedFiles = {};
  $scope.indexed = {};
  $scope.welcome = true;
  $scope.bookIndices;
  $scope.selection = {};
  $scope.msgDisplay = function (type, msg) {
    $scope.msgType = type;
    $scope.displayMsg = msg;
    $scope.showError = true;
    $timeout(function () {
    $scope.showError = false;
    }, 3000);
  };

  $scope.createIndex = (selectedFile) => {

    if(selectedFile === null || typeof selectedFile === 'undefined') {
      $scope.msgDisplay('danger', 'Select a File to Create Index');
      // $("#myModal").modal('show');
    }
    let fileContent = $scope.uploadedFiles[selectedFile];
    if(invertedIndex.createIndex(selectedFile, fileContent)) {
      let indices = invertedIndex.getIndex(selectedFile);
      let tokens = Object.keys(indices);
      let bookIndices = invertedIndex.getNumOfBooks(selectedFile);
      $scope.indexed[selectedFile] = {
        selectedFile,
        indices,
        bookIndices,
        tokens
      }
    $scope.books = Object.keys($scope.indexed);
    if($scope.books.length > 1) {
      $scope.showView = true;
    }
  }
  $scope.viewIndex(selectedFile);
  $scope.selection[selectedFile] = true;
}


$scope.viewIndex = (viewFile) => {
  let selectedFile = viewFile || $scope.viewFile;
  let indexAtrr = $scope.indexed[selectedFile];
    $scope.indices = indexAtrr.indices;
    $scope.tokens = indexAtrr.tokens;
    $scope.bookIndices = indexAtrr.bookIndices;
    $scope.showIndex =  true;
    $scope.welcome = false;
}

$scope.searchIndex = () => {
  $scope.searchResult = {};
  if(typeof $scope.bookIndices === 'undefined') {
    $scope.msgDisplay('danger', 'No files has been indexed Yet');
    return false;
  }
  let selectedFile = $scope.selectedFile;
  let keywords = $scope.keyword;
  let ms = Object.keys($scope.selection).filter((key) => {
      return $scope.selection[key] === true;
  });
  let totalBooks;
  if(ms.length < 1) {
    totalBooks = Object.keys($scope.indexed);
  } else {
    totalBooks = ms;
  }
  let selections = $scope.selection;
  let selection = Object.keys(selections)

    try {
      invertedIndex.searchIndex(keywords, totalBooks);
      let finalResult = invertedIndex.finalResult;
      for (let eachFile in finalResult) {
        let numOfBook = invertedIndex.getNumOfBooks(eachFile);
        $scope.searchResult[eachFile] = {
          name: eachFile,
          result: finalResult[eachFile],
          countBook: numOfBook
        }
        $scope.showSearch = true;
        $scope.showIndex =  false;
        $scope.welcome =  false;
      }
    } catch(err) {
        $scope.msgDisplay('danger', err);
    }
};

$scope.home = () => {
  $scope.showSearch = false;
  $scope.showIndex =  false;
  $scope.welcome =  true;
  

}


// We can attach the `fileselect` event to all file inputs on the page
let fileUpload = document.getElementById('upload');
function Init() {
  var fileselect = document.getElementById("fileselect");
  fileselect.addEventListener("change", uploadFile, false);
}

// call initialization function 
if (window.File && window.FileList && window.FileReader) {
  Init();
}

function uploadFile (e) {
  let files = e.target.files;
  $scope.replaceFiles = [];
  for (var i = 0, f; f = files[i]; i++) {
    let fileName = f.name;
    InvertedIndex.readFile(f)
    .then((result) => {
      let fileName = result[0];
      let fileContent = result[1];
      $scope.$apply(function(){
      $scope.uploadedFiles[fileName] = fileContent;
      let msg = fileName + ' was uploaded successfully'
      $.toaster({ priority : 'success', title : 'SUCCESS!', message : msg});
      })
    })
    .catch((error) => {
      $scope.msgDisplay('danger', error);
      $scope.$apply();
    })

 
  }
     
  }
};

function rowFilterFactory () {
  return function(input, arr) {
    if(arr.includes(input)) {
      return "check";
    }
    else {
      return "cross";
    }
  }
}

})();