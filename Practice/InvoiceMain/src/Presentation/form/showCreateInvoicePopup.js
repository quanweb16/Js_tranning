// src/Presentation/showCreateInvoicePopup.js

import { getCreateInvoiceTemplate } from '../../Template/createInvoiceTemplate.js';
import { processCreateInvoice } from '../../BusinessLogic/invoiceProcessing/processCreateInvoice.js';

export function showCreateInvoicePopup() {
    const container = document.createElement('div');
    container.innerHTML = getCreateInvoiceTemplate();
    container.classList.add('popup-form', 'popup-overlay'); // Thêm lớp popup-form  
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
            const invoiceData = {
                id: formData.get('invoice-id'),
                date: formData.get('date'),
                name: formData.get('name'),
                email: formData.get('email'),
                address: formData.get('address'),
                profileImgFile: formData.get('file-upload'),
            };
            processCreateInvoice(invoiceData);
            document.body.removeChild(container);
            window.location.reload(); 
        });
    }
}
