// src/Presentation/main.js

import { handleAddNew } from './Presentation/handlers/addInvoiceToList.js';
import { showCreateInvoicePopup } from './Presentation/form/showCreateInvoicePopup.js';
import { showEditInvoicePopup } from './Presentation/form/showEditInvoicePopup.js';
import { showDeleteConfirmationPopup } from './Presentation/form/showDeleteConfirmationPopup.js';
import { invoiceService } from './BusinessLogic/invoiceService.js';
import { searchInvoices } from './Presentation/handlers/searchInvoices.js';

document.addEventListener('DOMContentLoaded', () => {
    // Xử lý sự kiện cho nút "Add New Invoice"
    document.querySelector('.addBtn').addEventListener('click', showCreateInvoicePopup);

    // Xử lý thêm hóa đơn mới
    handleAddNew();

    // Xử lý sự kiện cho nút "Edit"
    function setupEditButtons() {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const invoiceElement = event.target.closest('.card');
                const invoiceId = invoiceElement.querySelector('.invoice').textContent.trim();
                const invoice = invoiceService.getInvoiceById(invoiceId);
                showEditInvoicePopup(invoice);
            });
        });
    }

    // Gọi hàm setupEditButtons mỗi khi danh sách hóa đơn được cập nhật
    handleAddNew();
    setupEditButtons();

    // Xử lý sự kiện cho checkbox "Chọn tất cả"
    const selectAllCheckbox = document.getElementById('checkbox');
    selectAllCheckbox.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        const checkboxes = document.querySelectorAll('.invoice-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    });

    // Xử lý sự kiện cho nút "Xóa tất cả"
    const deleteAllButton = document.querySelector('.delete-all');
    deleteAllButton.addEventListener('click', () => {
        showDeleteConfirmationPopup(() => {
            const checkboxes = document.querySelectorAll('.invoice-checkbox');
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const card = checkbox.closest('.card');
                    const invoiceId = card.querySelector('.invoice').textContent.trim(); // Lấy ID hóa đơn từ card
                    invoiceService.deleteInvoice(invoiceId); // Xóa hóa đơn từ dịch vụ
                    card.remove(); // Xóa phần tử card khỏi DOM
                }
            });
        });
    });
    searchInvoices();
});
