// selectors
const cards = document.querySelectorAll('.cards');
const form = document.querySelector('form');
const btnSubmit = document.querySelector('button[type="submit"]');
const btnReset = document.querySelector('button[type="reset"]');
const article = document.querySelector('article');

let id = 0;

// event listeners
window.addEventListener('DOMContentLoaded', () => {
  books.forEach((book) => {
    createCard(book);
  });
});

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  const book = createNewBook(formObject);

  addBook(book);
  createCard(book);

  form.reset();
});

btnReset.addEventListener('click', () => {
  return;
});

// functions
function Book(title, author, genre, year, age_range, id, favorite) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.year = year;
  this.age_range = age_range;
  this.favorite = favorite || false;
  this.read = false;
  this.id = id;
}

const createNewBook = (data) => {
  const { title, author, genre, year, age_range, id, favorite } = data;
  return new Book(title, author, genre, year, age_range, id, favorite);
};

const addBook = (book) => {
  books.push(book);
};

const removeBook = (id) => {
  books = books.filter((book) => {
    return book.id !== parseInt(id);
  });

  const cardToRemove = document.querySelector(`.card[data-id='${id}']`);
  if (cardToRemove) {
    cardToRemove.classList.add('hide');

    cardToRemove.addEventListener('transitionend', () => {
      cardToRemove.remove();
    });
  }
};

const toggleFavorite = (id) => {
  const target = books.find((book) => book.id === id);
  target.favorite = !target.favorite;
  return target.favorite;
};

const toggleRead = (id) => {
  const target = books.find((book) => book.id === id);
  target.read = !target.read;
  return target.read;
};

const createCard = (book) => {
  id++;

  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-id', book.id);

  const info = document.createElement('div');
  info.className = 'info';

  const title = document.createElement('h3');
  title.textContent = book.title;
  card.appendChild(title);

  const author = document.createElement('h5');
  author.textContent = `by ${book.author}`;
  card.appendChild(author);

  const year = document.createElement('p');
  year.textContent = book.year;
  card.appendChild(year);

  const genre = document.createElement('p');
  genre.textContent = book.genre;
  card.appendChild(genre);

  const age_range = document.createElement('p');
  age_range.textContent = `Age range: ${book.age_range}`;
  card.appendChild(age_range);

  const iconsDiv = document.createElement('div');
  iconsDiv.className = 'icons';

  const iBook = document.createElement('i');
  iBook.className = 'fa-solid fa-book';
  iconsDiv.appendChild(iBook);

  iBook.addEventListener('click', () => {
    const parentId = book.id;
    const read = toggleRead(parentId);
    if (read) {
      iBook.classList.add('fa-book-open-reader');
      iBook.classList.remove('fa-book');
    } else {
      iBook.classList.add('fa-book');
      iBook.classList.remove('fa-book-open-reader');
    }
  });

  const iStar = document.createElement('i');
  iStar.className = 'fa-regular fa-star';
  iconsDiv.appendChild(iStar);

  iStar.addEventListener('click', () => {
    const parentId = book.id;
    const favorite = toggleFavorite(parentId);
    if (favorite) {
      iStar.classList.add('fa-solid');
      iStar.classList.remove('fa-regular');
    } else {
      iStar.classList.add('fa-regular');
      iStar.classList.remove('fa-solid');
    }
  });

  const iTrash = document.createElement('i');
  iTrash.className = 'fa-regular fa-trash-can';
  iconsDiv.appendChild(iTrash);

  iTrash.addEventListener('click', () => {
    const parentId = book.id;
    removeBook(parentId);
  });

  card.appendChild(info);
  card.appendChild(iconsDiv);
  article.appendChild(card);
};

// constants
let books = [
  {
    title: 'The Gruffalo',
    author: 'Julia Donaldson',
    genre: 'Animals, Adventure',
    year: 1999,
    age_range: '3-7',
    id: 1,
  },
  {
    title: 'How I Became a Pirate',
    author: 'Melinda Long',
    genre: 'Pirates, Adventure',
    year: 2003,
    age_range: '4-8',
    id: 2,
  },
  {
    title: 'Where the Wild Things Are',
    author: 'Maurice Sendak',
    genre: 'Adventure, Imagination',
    year: 1963,
    age_range: '4-8',
    id: 3,
  },
  {
    title: 'The Very Hungry Caterpillar',
    author: 'Eric Carle',
    genre: 'Growth, Nature',
    year: 1969,
    age_range: '2-5',
    id: 4,
  },
  {
    title: 'Goodnight Moon',
    author: 'Margaret Wise Brown',
    genre: 'Bedtime, Calm',
    year: 1947,
    age_range: '0-5',
    id: 5,
  },
  {
    title: 'Dragons Love Tacos',
    author: 'Adam Rubin',
    genre: 'Humor, Dragons, Food',
    year: 2012,
    age_range: '3-7',
    id: 6,
  },
  {
    title: 'The Day the Crayons Quit',
    author: 'Drew Daywalt',
    genre: 'Humor, Creativity',
    year: 2013,
    age_range: '3-7',
    id: 7,
  },
  {
    title: 'The Tale of Peter Rabbit',
    author: 'Beatrix Potter',
    genre: 'Animals, Adventure',
    year: 1902,
    age_range: '3-7',
    id: 8,
  },
  {
    title: 'Corduroy',
    author: 'Don Freeman',
    genre: 'Adventure, Friendship',
    year: 1968,
    age_range: '3-8',
    id: 9,
  },
  {
    title: "We're All Wonders",
    author: 'R.J. Palacio',
    genre: 'Kindness, Acceptance',
    year: 2017,
    age_range: '4-8',
    id: 10,
  },
];
