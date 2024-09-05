export class InvoiceService {
    constructor(id, name, email, date, status, profileImgSrc) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.date = date;
        this.status = status;
        this.profileImgSrc = profileImgSrc;
    }

    // Thêm hóa đơn mới
    static addInvoice(invoice) {
        const invoices = localStorageManager.getInvoices();
        invoices.push(invoice);
        localStorageManager.saveInvoices(invoices);
    }

    // Chỉnh sửa hóa đơn
    editInvoice(newData) {
        const invoices = localStorageManager.getInvoices();
        const invoiceIndex = invoices.findIndex(i => i.id === this.id);
        if (invoiceIndex !== -1) {
            invoices[invoiceIndex] = { ...this, ...newData };
            localStorageManager.saveInvoices(invoices);
        }
    }

    // Xóa hóa đơn
    static deleteInvoice(id) {
        let invoices = localStorageManager.getInvoices();
        invoices = invoices.filter(invoice => invoice.id !== id);
        localStorageManager.saveInvoices(invoices);
    }

    // Lấy tất cả hóa đơn
    static getAllInvoices() {
        return localStorageManager.getInvoices();
    }
}

export default InvoiceService;
