// src/Presentation/handlers/handleDeleteInvoice.js

import { invoiceService } from '../../../BusinessLogic/invoiceService.js';
import { showDeleteConfirmationPopup } from '../../form/formUI/showDeleteConfirmationPopup.js'; // Cập nhật đường dẫn import

export function handleDeleteInvoice(invoiceId, refreshInvoices) {
    showDeleteConfirmationPopup(() => {
        invoiceService.deleteInvoice(invoiceId); // Xóa hóa đơn trong service
        refreshInvoices(); // Tải lại danh sách hóa đơn
    });
}

export function attachDeleteButtonHandler(infoContainer, invoiceId, refreshInvoices) {
    const deleteButton = infoContainer.querySelector('.delete-btn'); // Chọn nút xóa trong HTML
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            handleDeleteInvoice(invoiceId, refreshInvoices); // Sử dụng hàm xử lý xóa
        });
    }
}
export function handleDeleteAllInvoices(refreshInvoices) {
    showDeleteConfirmationPopup(() => {
        const checkboxes = document.querySelectorAll('.invoice-checkbox');
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const card = checkbox.closest('.card');
                const invoiceId = card.querySelector('.invoice').textContent.trim(); // Lấy ID hóa đơn từ card
                invoiceService.deleteInvoice(invoiceId); // Xóa hóa đơn từ dịch vụ
            }
        });
        refreshInvoices(); // Tải lại danh sách hóa đơn sau khi xóa
    });
}
