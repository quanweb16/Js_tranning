document.addEventListener('DOMContentLoaded', function() {
    restoreInvoices();

    document.querySelector('.addBtn').addEventListener('click', showForm);
    document.querySelector('.delete-all').addEventListener('click', deleteSelectedInvoices);
    document.querySelector('#search-input').addEventListener('input', searchInvoices);
});