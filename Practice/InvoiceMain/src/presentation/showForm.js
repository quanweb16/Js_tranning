import invoiceFormTemplate from '../template/invoiceFormTemplate.js';
import InvoiceService from '../application/invoiceService.js';

export function showForm() {
    const container = document.querySelector('.container');
    container.innerHTML = invoiceFormTemplate;

    const form = document.querySelector('.form-invoice');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const invoice = new InvoiceService(
            Date.now().toString(),
            form.name.value,
            form.email.value,
            form.date.value,
            'Pending', // Mặc định là Pending
            form['file-upload'].files[0].name
        );
        InvoiceService.addInvoice(invoice);
        container.innerHTML = '';  // Đóng form
    });

    document.querySelector('.close-popup').addEventListener('click', () => {
        container.innerHTML = '';
    });
}
