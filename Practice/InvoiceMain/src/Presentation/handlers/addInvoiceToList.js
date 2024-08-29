// src/Presentation/addInvoiceToList.js

import { getInvoiceTemplate } from '../../Template/invoiceTemplate.js';
import { invoiceService } from '../../BusinessLogic/invoiceService.js';
import { showDeleteConfirmationPopup } from '../form/showDeleteConfirmationPopup.js'; // Import hàm hiển thị cửa sổ xác nhận xóa

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

        const deleteButton = infoContainer.querySelector('.delete-btn'); // Chọn nút xóa trong HTML
        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                showDeleteConfirmationPopup(() => {
                    invoiceService.deleteInvoice(invoice.id); // Xóa hóa đơn trong service
                    handleAddNew(); // Tải lại danh sách hóa đơn
                });
            });
        }
    });
}
