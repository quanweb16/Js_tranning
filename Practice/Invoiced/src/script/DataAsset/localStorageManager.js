export function saveInvoices(invoices) {
    localStorage.setItem('invoices', JSON.stringify(invoices));
}

export function getInvoicesFromStorage() {
    const invoices = localStorage.getItem('invoices');
    return invoices ? JSON.parse(invoices) : [];
}
