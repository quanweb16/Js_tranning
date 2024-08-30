// src/Presentation/invoice/action/handleEditInvoice.js

import { invoiceService } from '../../../BusinessLogic/invoiceService.js';
import { showEditInvoicePopup } from '../../form/formUI/showEditInvoicePopup.js';

export function setupEditButtons() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const invoiceElement = event.target.closest('.card');
            const invoiceId = invoiceElement.querySelector('.invoice').textContent.trim();
            const invoice = invoiceService.getInvoiceById(invoiceId);
            showEditInvoicePopup(invoice);
        });
    });
}
