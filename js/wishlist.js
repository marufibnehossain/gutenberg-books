let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function addToWishlist(bookId) {
    if (bookId && !isNaN(bookId)) {
        const index = wishlist.indexOf(bookId);
        if (index > -1) {
            wishlist = wishlist.filter(id => id !== null && id !== bookId);
            const bookElement = document.querySelector(`.book[data-book-id="${bookId}"]`);
            if (bookElement) {
                bookElement.remove();
            }
        } else {
            wishlist.push(bookId);
        }
        wishlist = wishlist.filter(id => id !== null);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistUI(bookId);
        console.log('Updated wishlist:', wishlist);
    } else {
        console.log('Invalid book ID:', bookId);
    }
}




function updateWishlistUI(bookId) {
    const button = document.querySelector(`[data-book-id="${bookId}"]`);
    if (button) {
        if (wishlist.includes(bookId)) {
            button.innerHTML = '<i class="fa-solid fa-heart"></i>';
            button.classList.add('in-wishlist');
        } else {
            button.innerHTML = '<i class="fa-regular fa-heart"></i>';
            button.classList.remove('in-wishlist');
        }
    }
}

function renderWishlist() {
    const wishlistElement = document.getElementById('wishlist');
    if (!wishlistElement) return;

    const bookPromises = wishlist.map(bookId => 
        fetchBookDetails(bookId)
            .then(book => {
                const allGenres = [...new Set([...(book.bookshelves || []), ...(book.subjects || [])])];
                const displayGenres = allGenres.slice(0, 3).join(', ') + (allGenres.length > 5 ? '...' : '');
                const isInWishlist = wishlist.includes(book.id);
                const buttonText = isInWishlist ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
                return `
                    <div class="book" data-genres="${allGenres.join(', ').toLowerCase()}" data-book-id="${book.id}">
                        <img src="${book.formats['image/jpeg'] || 'placeholder.jpg'}" alt="${book.title}" onclick="goToBookDetails(${book.id})">
                        <div class="book-info">
                            <h3 onclick="goToBookDetails(${book.id})">${book.title}</h3>
                            <p>${book.authors.map(author => author.name).join(', ')}</p>
                            <p class="genres">${displayGenres}</p>
                            <button onclick="addToWishlist(${book.id})" data-book-id="${book.id}">${buttonText}</button>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                console.error(`Error fetching book ${bookId}:`, error);
                return '';
            })
    );

    Promise.all(bookPromises).then(elements => {
        wishlistElement.innerHTML = elements.join('');
        if (elements.every(el => el === '')) {
            wishlistElement.innerHTML = '<p>Your wishlist is empty.</p>';
        }
    });
}


function removeFromWishlist(bookId) {
    addToWishlist(bookId); 
    const bookElement = document.querySelector(`.book[data-book-id="${bookId}"]`);
    if (bookElement) {
        bookElement.remove();
    }
    if (wishlist.length === 0) {
        document.getElementById('wishlist').innerHTML = '<p>Your wishlist is empty.</p>';
    }
}



function initWishlist() {
    renderWishlist();
    document.querySelectorAll('[data-book-id]').forEach(button => {
        const bookId = parseInt(button.dataset.bookId);
        updateWishlistUI(bookId);
    });
}

function goToBookDetails(bookId) {
    window.location.href = `book-details.html?id=${bookId}`;
}

