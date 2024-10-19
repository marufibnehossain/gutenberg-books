const API_URL = 'https://gutendex.com/books';
let currentPageUrl = API_URL;

async function fetchBooks(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function fetchBookDetails(bookId) {
    return fetch(`https://gutendex.com/books/${bookId}`)
        .then(response => response.json())
        .then(data => {
            return {
                id: data.id,
                title: data.title,
                authors: data.authors,
                formats: data.formats,
                bookshelves: data.bookshelves,
                formats: data.formats
            };
        });
}
