// localStorageManager.js
export class localStorageManager {

    // Lưu danh sách hóa đơn vào localStorage
    static saveInvoicesToLocalStorage(invoices) {
        localStorage.setItem('invoices', JSON.stringify(invoices));
    }

    // Lấy danh sách hóa đơn từ localStorage
    static getInvoicesFromLocalStorage() {
        const invoices = localStorage.getItem('invoices');
        return invoices ? JSON.parse(invoices) : [];
    }
    static searchInvoices(searchTerm) {
        const invoices = this.getInvoicesFromLocalStorage();
        return invoices.filter(invoice => 
            invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            invoice.mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
}
