import { localStorageManager } from "../Data/localStorageManager.js";

export class Invoice {
    constructor(id, name,mail,date,status,profileImg){
        this.id = id;
        this.name=name;
        this.mail=mail;
        this.date = date;
        this.status=status;
        this.profileImg=profileImg;
    }
    static addInvoice(newInvoice) {
        const invoices = localStorageManager.getInvoicesFromLocalStorage();
        invoices.push(newInvoice);
        localStorageManager.saveInvoicesToLocalStorage(invoices);
    }

    // Sửa hóa đơn
    static editInvoice(id, updatedInvoice) {
        let invoices = localStorageManager.getInvoicesFromLocalStorage();
        const index = invoices.findIndex(inv => inv.id === id);
        if (index !== -1) {
            invoices[index] = updatedInvoice;
            localStorageManager.saveInvoicesToLocalStorage(invoices);
        } else {
            console.log("Invoice not found");
        }
    }

    // Xóa hóa đơn
    static deleteInvoice(id) {
        let invoices = localStorageManager.getInvoicesFromLocalStorage();
        invoices = invoices.filter(inv => inv.id !== id);
        localStorageManager.saveInvoicesToLocalStorage(invoices);
    }
    static getAllInvoices() {
        return localStorageManager.getInvoicesFromLocalStorage();
    }
    static getInvoiceById(id) {
        const invoices = localStorageManager.getInvoicesFromLocalStorage();
        return invoices.find(inv => inv.id === id);
    }

   
}