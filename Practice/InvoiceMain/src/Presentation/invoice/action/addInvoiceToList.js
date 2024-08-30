// src/Presentation/handlers/addInvoiceToList.js

import { getInvoiceTemplate } from '../../../Template/invoiceTemplate.js';
import { invoiceService } from '../../../BusinessLogic/invoiceService.js';
import { attachDeleteButtonHandler } from './handleDeleteInvoice.js'; // Cập nhật đường dẫn import

export function handleAddNew() {
    const container = document.querySelector('.container');
    const invoices = invoiceService.getInvoices(); // Lấy danh sách hóa đơn từ invoiceService

    container.innerHTML = '';
    invoices.forEach(invoice => {       
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card');        
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info');    
        infoContainer.innerHTML = getInvoiceTemplate(invoice);
        cardContainer.appendChild(infoContainer);     
        container.appendChild(cardContainer);

        attachDeleteButtonHandler(infoContainer, invoice.id, handleAddNew); // Gắn sự kiện xóa
    });
}
