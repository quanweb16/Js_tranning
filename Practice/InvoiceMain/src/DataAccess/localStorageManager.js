// src/Data/localStorageManager.js

export const localStorageManager = {
    getInvoices() {
        return JSON.parse(localStorage.getItem('invoices')) || [];
    },
    saveInvoices(invoices) {
        localStorage.setItem('invoices', JSON.stringify(invoices));
    }
};
