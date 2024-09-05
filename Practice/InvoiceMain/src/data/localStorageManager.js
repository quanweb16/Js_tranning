class LocalStorageManager {
    static saveInvoices(invoices) {
        localStorage.setItem('invoices', JSON.stringify(invoices));
    }

    static getInvoices() {
        return JSON.parse(localStorage.getItem('invoices')) || [];
    }
}

export default LocalStorageManager;
