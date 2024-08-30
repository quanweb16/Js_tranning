// src/Presentation/main.js

import { handleAddNew } from './Presentation/invoice/action/addInvoiceToList.js';
import { showCreateInvoicePopup } from './Presentation/form/formUI/showCreateInvoicePopup.js';
import { showEditInvoicePopup } from './Presentation/form/formUI/showEditInvoicePopup.js';
import { showDeleteConfirmationPopup } from './Presentation/form/formUI/showDeleteConfirmationPopup.js';
import { invoiceService } from './BusinessLogic/invoiceService.js';
import { searchInvoices } from './Presentation/invoice/search/searchInvoices.js';
import { handleDeleteAllInvoices } from './Presentation/invoice/action/handleDeleteInvoice.js';
import { setupEditButtons } from './Presentation/invoice/action/handleEditInvoice.js';
import { setupSelectAllCheckbox } from './Presentation/invoice/action/handleSelectAllCheckbox.js';

document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelector('.addBtn').addEventListener('click', showCreateInvoicePopup);
    const deleteAllButton = document.querySelector('.delete-all');
    deleteAllButton.addEventListener('click', () => {
        handleDeleteAllInvoices(handleAddNew); 
    });
    handleAddNew();
    setupEditButtons();
    setupSelectAllCheckbox();   
    searchInvoices();
});
