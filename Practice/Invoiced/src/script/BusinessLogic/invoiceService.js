import { getInvoicesFromStorage, saveInvoices } from '../DataAsset/localStorageManager.js';

let invoices = getInvoicesFromStorage(); // Khởi tạo từ localStorage

export function addInvoice(invoice) {
    invoices.push(invoice);
    saveInvoices(invoices); // Lưu lại sau khi thêm
}

export function updateInvoice(updatedInvoice) {
    const index = invoices.findIndex(invoice => invoice.id === updatedInvoice.id);
    if (index !== -1) {
        invoices[index] = updatedInvoice;
        saveInvoices(invoices); // Lưu lại sau khi cập nhật
    }
}

export function deleteInvoice(invoiceId) {
    invoices = invoices.filter(invoice => invoice.id !== invoiceId);
    saveInvoices(invoices); // Lưu lại sau khi xóa
}

export function getInvoices() {
    return invoices;
}
