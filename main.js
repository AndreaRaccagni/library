// Selectors
(function () {
  const form = document.querySelector('form');
  const btnSubmit = document.querySelector('button[type="submit"]');
  const article = document.querySelector('article');
  const addBtn = document.querySelector('.add-book-btn');
  const aside = document.querySelector('aside');

  // Event listeners
  window.addEventListener('DOMContentLoaded', () => {
    booksData.forEach((bookData) => {
      bookCollection.addBook(bookData);
    });
  });

  addBtn.addEventListener('click', () => {
    aside.classList.toggle('hide');
  });

  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    const book = new Book(formObject);

    bookCollection.addBook(formObject);
    form.reset();
  });

  // Book class
  class Book {
    constructor({ title, author, genre, year, age_range, favorite = false }) {
      this.title = title;
      this.author = author;
      this.genre = genre;
      this.year = year;
      this.age_range = age_range;
      this.favorite = favorite;
      this.read = false;
    }
  }

  // BookCollection class
  class BookCollection {
    constructor() {
      this.collection = [];
      this.currentId = 1;
    }

    addBook(bookData) {
      const book = new Book(bookData);
      book.id = this.currentId++;
      this.collection.push(book);
      this.createCard(book);
    }

    removeBook(id) {
      this.collection = this.collection.filter((book) => book.id !== id);

      const cardToRemove = document.querySelector(`.card[data-id='${id}']`);
      if (cardToRemove) {
        cardToRemove.classList.add('hide');

        cardToRemove.addEventListener('transitionend', () => {
          cardToRemove.remove();
        });
      }
    }

    toggleFavorite(id) {
      const book = this.collection.find((book) => book.id === id);
      if (book) book.favorite = !book.favorite;
      return book ? book.favorite : false;
    }

    toggleRead(id) {
      const book = this.collection.find((book) => book.id === id);
      if (book) book.read = !book.read;
      return book ? book.read : false;
    }

    createCard(book) {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-id', book.id);

      const info = document.createElement('div');
      info.className = 'info';

      const title = document.createElement('h3');
      title.textContent = book.title;
      info.appendChild(title);

      const author = document.createElement('h5');
      author.textContent = `by ${book.author}`;
      info.appendChild(author);

      const year = document.createElement('p');
      year.textContent = book.year;
      info.appendChild(year);

      const genre = document.createElement('p');
      genre.textContent = book.genre;
      info.appendChild(genre);

      const ageRange = document.createElement('p');
      ageRange.textContent = `Age range: ${book.age_range}`;
      info.appendChild(ageRange);

      const iconsDiv = document.createElement('div');
      iconsDiv.className = 'icons';

      const iBook = document.createElement('i');
      iBook.className = 'fa-solid fa-book';
      iconsDiv.appendChild(iBook);

      iBook.addEventListener('click', () => {
        const read = this.toggleRead(book.id);
        iBook.classList.toggle('fa-book-open-reader', read);
        iBook.classList.toggle('fa-book', !read);
      });

      const iStar = document.createElement('i');
      iStar.className = 'fa-regular fa-star';
      iconsDiv.appendChild(iStar);

      iStar.addEventListener('click', () => {
        const favorite = this.toggleFavorite(book.id);
        iStar.classList.toggle('fa-solid', favorite);
        iStar.classList.toggle('fa-regular', !favorite);
      });

      const iTrash = document.createElement('i');
      iTrash.className = 'fa-regular fa-trash-can';
      iconsDiv.appendChild(iTrash);

      iTrash.addEventListener('click', () => {
        this.removeBook(book.id);
      });

      card.appendChild(info);
      card.appendChild(iconsDiv);
      article.appendChild(card);
    }
  }

  // Instantiate a BookCollection instance
  const bookCollection = new BookCollection();

  // constants
  let booksData = [
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
})();
