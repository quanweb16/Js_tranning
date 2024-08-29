// src/Presentation/showEditInvoicePopup.js

import { getEditInvoiceTemplate } from '../../Template/editInvoiceTemplate.js';
import { invoiceService } from '../../BusinessLogic/invoiceService.js';

export function showEditInvoicePopup(invoice) {
    const { profileImgSrc, id: invoiceId, date, name, email, address } = invoice;
    const container = document.createElement('div');
    container.innerHTML = getEditInvoiceTemplate(profileImgSrc, invoiceId, date, name, email, address);
    container.classList.add('popup-form', 'popup-overlay'); // 
    document.body.appendChild(container);
    
    const closeButton = container.querySelector('.close-popup');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.body.removeChild(container);
        });
    }

    const form = container.querySelector('.form-invoice');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const updatedInvoice = {
                id: formData.get('invoice-id'),
                date: formData.get('date'),
                name: formData.get('name'),
                email: formData.get('email'),
                address: formData.get('address'),
                profileImgSrc: formData.get('file-upload-edit') ? URL.createObjectURL(formData.get('file-upload-edit')) : profileImgSrc
            };

            invoiceService.updateInvoice(updatedInvoice); // Cập nhật hóa đơn trong dịch vụ
            document.body.removeChild(container);
            window.location.reload(); 
        });
    }
}
