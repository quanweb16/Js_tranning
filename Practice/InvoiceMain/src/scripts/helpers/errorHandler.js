class ErrorMessageDisplay {
  showErrors(parentSelector, errors) {
    const parentElement = document.querySelector(parentSelector);
    
    parentElement.querySelector('.error-message-date').innerHTML = errors.date || '';
    parentElement.querySelector('.error-message-first-name').innerHTML = errors.firstName || '';
    parentElement.querySelector('.error-message-last-name').innerHTML = errors.lastName || '';
    parentElement.querySelector('.error-message-email').innerHTML = errors.email || '';
    parentElement.querySelector('.error-message-city').innerHTML = errors.city || '';
    parentElement.querySelector('.error-message-region').innerHTML = errors.region || '';
  }

  showErrorsCreateInvoice(errors) {
    this.showErrors('.create-invoice-container', errors);
  }

  showErrorsEditInvoice(errors) {
    this.showErrors('.edit-invoice-container', errors);
  }
}

export default ErrorMessageDisplay;


