# InvertedIndex

[![Coverage Status](https://coveralls.io/repos/github/andela-ksolomon/invertedIndex/badge.svg?branch=developing)](https://coveralls.io/github/andela-ksolomon/invertedIndex?branch=developing)[![Code Climate](https://codeclimate.com/github/andela-ksolomon/invertedIndex/badges/gpa.svg)](https://codeclimate.com/github/andela-ksolomon/invertedIndex)[![Build Status](https://travis-ci.org/andela-ksolomon/invertedIndex.svg?branch=developing)](https://travis-ci.org/andela-ksolomon/invertedIndex)

### Introduction
Inverted Index is an online software that solves the problem of searching through little parts of a large documents using the 
*Elastic Search Concept* which allow fast full text searches, at a cost of increased processing when a document is added to the database.

[View Application] (http://www.maximuf-index.herokuapp.com)

 ### Technology
1). Bootstrap (HTML/CSS/JS)
2). Javascript (NODEJS Environment)
3). Jasmine for Testing
4). NodeJS

## Features
- Only JSON Files are Allowed
- Multiple File Upload
- Create Index for Specific File
- Search For Keywords
- Search Through Multiple Files
- Doesn't Allow Special Characters as Keywords
- Search for Multiple keywords (space/comma seperated)

## How to Use
InvertedIndex only supports JSON files only, see example below.
```
[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },
  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "tex": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },
  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },
  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },
  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

```
**Upload a JSON File
- Click on the Upload Button and Select either Multiple Files or Single File
![Upload Button](https://raw.githubusercontent.com/andela-ksolomon/invertedIndex/developing/lib/images/upload-button.png)

**Create Index
- Once File is Uploaded, Select File to Create Index
![Create Index](https://raw.githubusercontent.com/andela-ksolomon/invertedIndex/developing/lib/images/select-file.png)

**View Index
- Create Indices are stored, use the view dropdown to select file to view
![View Index](https://raw.githubusercontent.com/andela-ksolomon/invertedIndex/developing/lib/images/view-index.png)

**Search For Keyword
- Type Keywords seperated with comma or space and Select Files to Search From
![Search keyword](https://raw.githubusercontent.com/andela-ksolomon/invertedIndex/developing/lib/images/search-keyword.png)

## To Run Locally (For Developers Only)
- Clone this Repository `https://github.com/andela-ksolomon/invertedIndex.git`
- Run `npm install` to Install all packages locally
- Then Run `gulp` to Start Application.