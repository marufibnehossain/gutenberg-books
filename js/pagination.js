let currentPage = 1;
let totalPages = 1;

async function fetchAndRenderBooks() {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.textContent = 'Loading...';
    document.getElementById('bookList').appendChild(loadingIndicator);
    try {
        const limit = 21; // Set your desired number of books per page
        const data = await fetchBooks(`${API_URL}?page=${currentPage}&limit=${limit}`);
        renderBooks(data.results.slice(0, limit));
        totalPages = Math.ceil(data.count / limit);
        updatePaginationUI();
    } catch (error) {
        console.error('Error fetching books:', error);
    }
    finally {
        loadingIndicator.remove();
    }
}

function updatePaginationUI(currentPage, totalPages) {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    if (prevButton) prevButton.disabled = currentPage === 1;
    if (nextButton) nextButton.disabled = currentPage === totalPages;

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

async function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        await fetchAndRenderBooks();
    }
}

async function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        await fetchAndRenderBooks();
    }
}

// Initial load
// fetchAndRenderBooks();
