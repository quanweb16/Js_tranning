// src/BusinessLogic/invoiceService.js

import { localStorageManager } from '../DataAccess/localStorageManager.js';

export const invoiceService = {
    getInvoices() {
        return localStorageManager.getInvoices();
    },
    getInvoiceById(id) {
        const invoices = this.getInvoices(); 
        return invoices.find(invoice => invoice.id === id);
    },
    addInvoice(invoice) {
        const invoices = this.getInvoices(); 
        invoices.push(invoice);
        localStorageManager.saveInvoices(invoices);
    },
    updateInvoice(updatedInvoice) {
        let invoices = this.getInvoices(); 
        invoices = invoices.map(invoice => invoice.id === updatedInvoice.id ? updatedInvoice : invoice);
        localStorageManager.saveInvoices(invoices);
    },
    deleteInvoice(id) {
        let invoices = this.getInvoices();
        invoices = invoices.filter(invoice => invoice.id !== id);
        localStorageManager.saveInvoices(invoices);
    },
    searchInvoices(keyword) {
        const invoices = this.getInvoices();

        if (!keyword) {
            return invoices;
        }

        const keywordLower = keyword.toLowerCase();

        return invoices.filter(invoice => 
            (invoice.id && invoice.id.toLowerCase().includes(keywordLower)) ||
            (invoice.name && invoice.name.toLowerCase().includes(keywordLower)) ||
            (invoice.email && invoice.email.toLowerCase().includes(keywordLower))
        );
    }
};
