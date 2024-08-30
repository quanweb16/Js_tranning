// src/Presentation/form/showCreateInvoicePopup.js

import { getCreateInvoiceTemplate } from '../../../Template/createInvoiceTemplate.js';
import { handleFormSubmit } from '../FormEvent/createInvoiceFormHandler.js'; // Import hàm xử lý form

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
        handleFormSubmit(form, container); // Sử dụng hàm xử lý form
    }
}
