function searchInvoices() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const invoiceId = card.querySelector('.invoice').textContent.toLowerCase();
        const name = card.querySelector('.name').textContent.toLowerCase();

        if (invoiceId.includes(searchInput) || name.includes(searchInput)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}