const genreSelect = document.getElementById('genreSelect');

async function populateGenres() {
    const data = await fetchBooks(API_URL);
    const genres = new Set(data.results.flatMap(book => [...book.bookshelves, ...book.subjects]));
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
}


function filterByGenre(props) {
    const { genreSelect, bookList } = props;
    const selectedGenre = genreSelect.value.toLowerCase();
    const books = bookList.querySelectorAll('.book');
    books.forEach(book => {
        const genres = book.dataset.genres.toLowerCase();
        book.style.display = genres.includes(selectedGenre) || !selectedGenre ? '' : 'none';
    });
}

genreSelect.addEventListener('change', () => {
    filterByGenre({
        genreSelect: document.getElementById('genreSelect'),
        bookList: document.getElementById('bookList') || document.getElementById('wishlist')
    });
});


