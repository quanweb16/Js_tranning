import editInvoiceTemplate from '../template/editInvoiceTemplate.js';
import InvoiceService from '../application/invoiceService.js';

export function showEditForm(invoice) {
    const container = document.querySelector('.container');
    container.innerHTML = editInvoiceTemplate(invoice);

    const form = document.querySelector('.form-invoice');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const updatedInvoice = {
            id: invoice.id,
            name: form.name.value,
            email: form.email.value,
            date: form.date.value,
            profileImgSrc: form['file-upload-edit'].files[0]?.name || invoice.profileImgSrc,
            status: invoice.status
        };
        InvoiceService.editInvoice(updatedInvoice);
        container.innerHTML = '';  // Đóng form
    });

    document.querySelector('.close-popup').addEventListener('click', () => {
        container.innerHTML = '';
    });
}
