// src/Presentation/handlers/createInvoiceFormHandler.js

import { processCreateInvoice } from '../../../BusinessLogic/invoiceProcessing/processCreateInvoice.js'; // Import hàm xử lý tạo hóa đơn

export function handleFormSubmit(form, container) {
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
