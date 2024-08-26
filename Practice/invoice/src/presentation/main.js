import {restoreInvoices,clearInvoices} from '../data/restoreInvoices.js';
import {showForm} from '../presentation/showFormAdd.js';
import {deleteSelectedInvoices} from './deleteSelectedInvoiceform.js';

document.addEventListener('DOMContentLoaded', function() {
    restoreInvoices();

    document.querySelector('.addBtn').addEventListener('click', showForm);
    console.log( document.querySelector('.addBtn'));
    document.querySelector('.delete-all').addEventListener('click', deleteSelectedInvoices);
    document.querySelector('#search-input').addEventListener('input', searchInvoices);
});