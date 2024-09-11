// Presentation/formUi/showCreateInvoicePopup.js
import { getCreateInvoiceTemplate } from '../../Template/createInvoiceTemplate.js' ;
import {getEditInvoiceTemplate} from '../../Template/editInvoiceTemplate.js';
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

    static showEditInvoicePopup(id) {

        const container = document.querySelector('.container');
        const invoice = Invoice.getInvoiceById(id); 
        console.log(invoice)
        const popupHtml = getEditInvoiceTemplate(invoice); 
        const popupElement = document.createElement('div');
        popupElement.className = 'popup-form';
        popupElement.innerHTML = popupHtml;
        container.appendChild(popupElement);
        document.querySelector('.close-popup').addEventListener('click', () => {
            container.removeChild(popupElement);
        });

        document.querySelector('.form-edit-invoice').addEventListener('submit', (event) => InvoiceManager.handleEditInvoice(event,id));
    }
    static showInvoices() {
        const container = document.querySelector('.container');
        const invoices = Invoice.getAllInvoices(); 

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
