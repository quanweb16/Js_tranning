import { invoiceService } from '../../../BusinessLogic/invoiceService.js';
import { getInvoiceTemplate } from '../../../Template/invoiceTemplate.js';
import { attachDeleteButtonHandler } from '../action/handleDeleteInvoice.js';
export function handleSearchResults(searchResults) {
    const container = document.querySelector('.container');
    
    container.innerHTML = ''; // Xóa nội dung hiện tại

    searchResults.forEach(invoice => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card');

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info');
        infoContainer.innerHTML = getInvoiceTemplate(invoice);
        
        cardContainer.appendChild(infoContainer);
        container.appendChild(cardContainer);

        // Gắn sự kiện xóa cho nút xóa
        attachDeleteButtonHandler(infoContainer, invoice.id, handleSearchResults);
    });
}


