class ErrorMessageDisplay {
  showErrorsCreateInvoice(errors) {
    this.modalEl.querySelector('.create-invoice-container .error-message-date').innerHTML = errors.date || '';
    this.modalEl.querySelector('.create-invoice-container .error-message-first-name').innerHTML = errors.firstName || '';
    this.modalEl.querySelector('.create-invoice-container .error-message-last-name').innerHTML = errors.lastName || '';
    this.modalEl.querySelector('.create-invoice-container .error-message-email').innerHTML = errors.email || '';
    this.modalEl.querySelector('.create-invoice-container .error-message-city').innerHTML = errors.city || '';
    this.modalEl.querySelector('.create-invoice-container .error-message-region').innerHTML = errors.region || '';
  }

  showErrorsEditInvoice(errors) {
    this.modalEl.querySelector('.edit-invoice-container .error-message-date').innerHTML = errors.date || '';
    this.modalEl.querySelector('.edit-invoice-container .error-message-first-name').innerHTML = errors.firstName || '';
    this.modalEl.querySelector('.edit-invoice-container .error-message-last-name').innerHTML = errors.lastName || '';
    this.modalEl.querySelector('.edit-invoice-container .error-message-email').innerHTML = errors.email || '';
    this.modalEl.querySelector('.edit-invoice-container .error-message-city').innerHTML = errors.city || '';
    this.modalEl.querySelector('.edit-invoice-container .error-message-region').innerHTML = errors.region || '';
  }
}

export default ErrorMessageDisplay;

