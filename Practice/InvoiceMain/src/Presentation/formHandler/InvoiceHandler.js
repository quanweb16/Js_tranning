
import { Invoice } from '../../Business/invoice.js';

export class InvoiceManager {
    static handleCreateInvoice(event) {
        event.preventDefault();
        const invoiceId = document.getElementById('invoice-id').value;
        const date = document.getElementById('date').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const newInvoice = new Invoice(
            invoiceId,
            name,
            email,
            date,
            'Pending',
            ''
        );
        Invoice.addInvoice(newInvoice);
        const container = document.querySelector('.container');
        const popupElement = document.querySelector('.popup-form');
        container.removeChild(popupElement);
        window.location.reload();
    }

    static handleEditInvoice(event, invoiceId) {
        event.preventDefault();
        const date = document.getElementById('date').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const updatedInvoice = new Invoice(
            invoiceId,
            name,
            email,
            date,
            'Pending',
            ''
        );
        Invoice.editInvoice(invoiceId, updatedInvoice);
        const container = document.querySelector('.container');
        const popupElement = document.querySelector('.popup-form');
        container.removeChild(popupElement);
        window.location.reload();
        
    }
}
