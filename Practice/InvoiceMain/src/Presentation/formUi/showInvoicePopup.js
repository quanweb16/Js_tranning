// Presentation/formUi/showCreateInvoicePopup.js
import { getCreateInvoiceTemplate } from '../../Template/createInvoiceTemplate.js' ;
import {getInvoiceTemplate} from '../../Template/invoiceTemplate.js';
import { InvoiceManager } from '../formHandler/InvoiceHandler.js';
import { Invoice } from '../../Business/invoice.js';

export class InvoicePopupManager {
    static showCreateInvoicePopup() {
        const container = document.querySelector('.container');
        const popupHtml = getCreateInvoiceTemplate();

        const popupElement = document.createElement('div');
        popupElement.className = 'popup-form';
        popupElement.innerHTML = popupHtml;
        container.appendChild(popupElement);

        document.querySelector('.close-popup').addEventListener('click', () => {
            container.removeChild(popupElement);
        });

        document.querySelector('.form-invoice').addEventListener('submit', InvoiceManager.handleCreateInvoice);
    }

    static showEditInvoicePopup(invoiceId) {
        const container = document.querySelector('.container');
        const invoice = Invoice.getInvoiceById(invoiceId); // Giả sử bạn có phương thức này

        if (!invoice) {
            console.error('Invoice not found');
            return;
        }

        const popupHtml = getEditInvoiceTemplate(invoice); // Pass the invoice data to the template

        const popupElement = document.createElement('div');
        popupElement.className = 'popup-form';
        popupElement.innerHTML = popupHtml;
        container.appendChild(popupElement);

        document.querySelector('.close-popup').addEventListener('click', () => {
            container.removeChild(popupElement);
        });

        document.querySelector('.form-edit-invoice').addEventListener('submit', (event) => this.handleEditInvoice(event, invoiceId));
    }
    static showInvoices() {
        const container = document.querySelector('.container');
        const invoices = Invoice.getAllInvoices(); // Giả sử bạn có phương thức này để lấy tất cả hóa đơn

        container.innerHTML = ''; // Xóa nội dung hiện tại trong container

        invoices.forEach(invoice => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card');

            const infoContainer = document.createElement('div');
            infoContainer.classList.add('info');
            infoContainer.innerHTML = getInvoiceTemplate(invoice);

            cardContainer.appendChild(infoContainer);
            container.appendChild(cardContainer);
        });
    }

}
