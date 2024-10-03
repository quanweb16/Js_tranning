class ErrorMessageDisplay {
  showErrorsCreateInvoice(errors) {
    document.querySelector('.create-invoice-container .error-message-date').innerHTML = errors.date || '';
    document.querySelector('.create-invoice-container .error-message-first-name').innerHTML = errors.firstName || '';
    document.querySelector('.create-invoice-container .error-message-last-name').innerHTML = errors.lastName || '';
    document.querySelector('.create-invoice-container .error-message-email').innerHTML = errors.email || '';
    document.querySelector('.create-invoice-container .error-message-city').innerHTML = errors.city || '';
    document.querySelector('.create-invoice-container .error-message-region').innerHTML = errors.region || '';
  }

  showErrorsEditInvoice(errors) {
    document.querySelector('.edit-invoice-container .error-message-date').innerHTML = errors.date || '';
    document.querySelector('.edit-invoice-container .error-message-first-name').innerHTML = errors.firstName || '';
    document.querySelector('.edit-invoice-container .error-message-last-name').innerHTML = errors.lastName || '';
    document.querySelector('.edit-invoice-container .error-message-email').innerHTML = errors.email || '';
    document.querySelector('.edit-invoice-container .error-message-city').innerHTML = errors.city || '';
    document.querySelector('.edit-invoice-container .error-message-region').innerHTML = errors.region || '';
  }
}

export default ErrorMessageDisplay;

