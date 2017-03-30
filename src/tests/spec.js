/* My Test Setups */
// const myClass = new InvertedIndex();
const allBooks = new myBook();
const book = allBooks.getBook('books.json');
myClass.createIndex('books.json', book);
// const result = getIndex('books.json');

/* My Suites */
describe('Class and Method Instantaion', () => {
  let myClass;
  beforeEach(() => {
    myClass = new InvertedIndex();
  });
  it('Should contain the getIndex method', () => {
    expect(typeof myClass.getIndex).toBe('function');
  });

  it('Should contain the createIndex method', () => {
    expect(typeof myClass.createIndex).toBe('function');
  });

  it('Should contain the searchIndex method', () => {
    expect(typeof myClass.searchIndex).toBe('function');
  });

  it('Should contain the readFile method', () => {
    expect(typeof myClass.readFile).toBe('function');
  });

  it('Should contain the tokenize method', () => {
    expect(typeof myClass.tokenize).toBe('function');
  });

  it('Should contain the validateFile method', () => {
    expect(typeof myClass.validateFile).toBe('function');
  });
});

describe('Populating Data', () => {
  let myClass;
  beforeEach(() => {
    myClass = new InvertedIndex();
  });
  it('Should return true for creating Index', () => {
    expect(myClass.createIndex('books.json', book)).toBeTruthy();
  });

  it('Should return `file does not exist for unknown fileName', () => {
    expect(myClass.getIndex('welcome')).toBe('File doesn\'t exist');
  });

  it('Should return `file does not exist for unknown fileName', () => {
    expect(myClass.searchIndex('alice')).toBeTruthy();
  });
});
