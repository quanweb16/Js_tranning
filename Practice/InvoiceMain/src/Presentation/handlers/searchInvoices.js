// src/Presentation/searchInvoices.js

import { invoiceService } from '../../BusinessLogic/invoiceService.js';
import { handleAddNew } from './addInvoiceToList.js';

export function searchInvoices() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        const keyword = searchInput.value.trim();
        const searchResults = invoiceService.searchInvoices(keyword);
        updateInvoiceList(searchResults);
    });
}

function updateInvoiceList(invoices) {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Xóa nội dung hiện tại

    invoices.forEach(invoice => {
        handleAddNew(invoice); // Hàm này cần cập nhật lại để tạo danh sách hóa đơn từ dữ liệu mới
    });
}
