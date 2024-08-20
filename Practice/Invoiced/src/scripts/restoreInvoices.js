function clearInvoices() {
    const cardContainer = document.querySelector('.container');
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
}
const headerCheckbox = document.querySelector('.checkbox-header .checkbox');
headerCheckbox.addEventListener('change', function() {
    const allCheckboxes = document.querySelectorAll('.card .checkbox');
    allCheckboxes.forEach(function(checkbox) {
        checkbox.checked = headerCheckbox.checked;
    });
});

function restoreInvoices() {
    clearInvoices();
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    console.log('Restoring invoices:', invoices);
    invoices.forEach(invoice => {
        addInvoiceToList(
            invoice.invoiceId,
            invoice.date,
            invoice.name,
            invoice.email,
            invoice.address,
            invoice.profileImgSrc,
            invoice.status
        );
    });
} 
