// localStorageManager.js
export class localStorageManager {

   
    static saveInvoicesToLocalStorage(invoices) {
        localStorage.setItem('invoices', JSON.stringify(invoices));
    }

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
