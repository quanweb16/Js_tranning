import { getEditInvoiceTemplate } from '../../../Template/editInvoiceTemplate.js';
import { handleEditInvoiceSubmit } from '../FormEvent/editInvoiceFormHandler.js';

export function showEditInvoicePopup(invoice) {
    const { profileImgSrc, id: invoiceId, date, name, email, address } = invoice;
    const container = document.createElement('div');
    container.innerHTML = getEditInvoiceTemplate(profileImgSrc, invoiceId, date, name, email, address);
    container.classList.add('popup-form', 'popup-overlay');
    document.body.appendChild(container);

    const closeButton = container.querySelector('.close-popup');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.body.removeChild(container);
        });
    }

    const form = container.querySelector('.form-invoice');
    if (form) {
        handleEditInvoiceSubmit(form, invoice, container);
    }
}
