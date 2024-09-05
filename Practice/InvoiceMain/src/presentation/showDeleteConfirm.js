import deleteConfirmTemplate from '../template/deleteConfirmTemplate.js';
import InvoiceService from '../application/invoiceService.js';

export function showDeleteConfirm(invoiceId) {
    const container = document.querySelector('.container');
    container.innerHTML = deleteConfirmTemplate;

    document.querySelector('.confirm-yes').addEventListener('click', () => {
        InvoiceService.deleteInvoice(invoiceId);
        container.innerHTML = '';  // Đóng xác nhận
        location.reload(); // Tải lại trang để cập nhật danh sách
    });

    document.querySelector('.confirm-no').addEventListener('click', () => {
        container.innerHTML = '';  // Đóng xác nhận
    });
}
