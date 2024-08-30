// src/Presentation/searchInvoices.js

import { invoiceService } from '../../../BusinessLogic/invoiceService.js';
import { handleSearchResults } from '../action/showSearchResults.js';

// Ví dụ sử dụng trong hàm tìm kiếm
export function searchInvoices() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        const keyword = searchInput.value.trim();
        const searchResults = invoiceService.searchInvoices(keyword);
        handleSearchResults(searchResults);
    });
}

