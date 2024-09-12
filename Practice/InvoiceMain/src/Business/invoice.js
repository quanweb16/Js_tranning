import { localStorageManager } from "../Data/localStorageManager.js";

export class Invoice {
    constructor(id, name,email,date,status,profileImgSrc){
        this.id = id;
        this.name=name;
        this.email=email;
        this.date = date;
        this.status=status;
        this.profileImgSrc=profileImgSrc;
    }
    static addInvoice(newInvoice) {
        const invoices = localStorageManager.getInvoicesFromLocalStorage();
        invoices.push(newInvoice);
        localStorageManager.saveInvoicesToLocalStorage(invoices);
    }
    static updateInvoice(updatedInvoice) {
        let invoices = this.getInvoices(); 
        console.log('Before update:', invoices); 
    
        invoices = invoices.map(invoice =>
            invoice.id === updatedInvoice.id ? updatedInvoice : invoice
        );
    
        console.log('After update:', invoices); 
        localStorageManager.saveInvoicesToLocalStorage(invoices);
    }

    static deleteInvoice(id) {
        const invoices = localStorageManager.getInvoicesFromLocalStorage();
        invoices = invoices.filter(inv => inv.id !== id);
        localStorageManager.saveInvoicesToLocalStorage(invoices);
    }

    static getAllInvoices() {
        return localStorageManager.getInvoicesFromLocalStorage();
    }

    static getInvoices(){
        return localStorageManager.getInvoicesFromLocalStorage();

    }

    static getInvoiceById(id) {
        const invoices = this.getInvoices(); 
        const requestedIdAsString = String(id);
        return invoices.find(invoice => String(invoice.id) === requestedIdAsString);
}
    
    

   
}