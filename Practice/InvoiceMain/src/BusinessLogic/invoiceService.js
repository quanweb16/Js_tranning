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
    
        // Trả về tất cả hóa đơn nếu không có từ khóa
        if (!keyword) {
            return invoices;
        }
    
        const keywordLower = keyword.toLowerCase();
    
        return invoices.filter(invoice => {
            // Tạo một mảng các giá trị để tìm kiếm
            const fieldsToSearch = [
                invoice.id,
                invoice.name,
                invoice.email
            ];
    
            // Sử dụng some() để kiểm tra nếu bất kỳ trường nào khớp với từ khóa
            return fieldsToSearch.some(field => 
                field && field.toLowerCase().includes(keywordLower)
            );
        });
    }
};
