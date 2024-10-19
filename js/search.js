function searchBooks(event) {
    const searchTerm = event.target.value.toLowerCase();
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        const title = book.querySelector('h3').textContent.toLowerCase();
        book.style.display = title.includes(searchTerm) ? '' : 'none';
    });
}
