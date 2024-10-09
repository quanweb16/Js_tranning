import ERROR_MESSAGES from '../constants/errorMessages';

class InvoiceValidator {
  // Validates the invoice data and returns any errors
  validateInvoiceData(data, invoices) {
    const errors = {};

    // Validate date
    if (!data.date) {
      errors.date = ERROR_MESSAGES.DATE_REQUIRED;
    } else if (!this.isValidDate(data.date)) {
      errors.date = ERROR_MESSAGES.INVALID_DATE;
    }

    // Validate email
    if (!data.email) {
      errors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
    } else if (!this.isValidEmail(data.email)) {
      errors.email = ERROR_MESSAGES.INVALID_EMAIL;
    } else {
      const existingInvoice = invoices.find(
        (invoice) => invoice.id === data.id
      );
      if (existingInvoice) {
        if (existingInvoice.email !== data.email) {
          if (this.isDuplicateInvoice(invoices, data)) {
            errors.email = ERROR_MESSAGES.EMAIL_EXISTS;
          }
        }
      } else {
        if (this.isDuplicateInvoice(invoices, data)) {
          errors.email = ERROR_MESSAGES.EMAIL_EXISTS;
        }
      }
    }

    // Validate first name
    if (!data.firstName) {
      errors.firstName = ERROR_MESSAGES.FIRST_NAME_REQUIRED;
    } else if (!this.isValidFirstName(data.firstName)) {
      errors.firstName = ERROR_MESSAGES.INVALID_FIRST_NAME;
    }

    // Validate last name
    if (!data.lastName) {
      errors.lastName = ERROR_MESSAGES.LAST_NAME_REQUIRED;
    } else if (!this.isValidLastName(data.lastName)) {
      errors.lastName = ERROR_MESSAGES.INVALID_LAST_NAME;
    }

    // Validate city
    if (!data.city) {
      errors.city = ERROR_MESSAGES.CITY_REQUIRED;
    } else if (!this.isValidCity(data.city)) {
      errors.city = ERROR_MESSAGES.INVALID_CITY;
    }

    // Validate region
    if (!data.region) {
      errors.region = ERROR_MESSAGES.REGION_REQUIRED;
    } else if (!this.isValidRegion(data.region)) {
      errors.region = ERROR_MESSAGES.INVALID_REGION;
    }

    // Return errors if any found
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // If no errors, return success
    return { success: true };
  }

  // Checks if the date is valid
  isValidDate(date) {
    const inputDate = new Date(date);
    const minDate = new Date('2020-01-01');
    const currentDate = new Date();
    if (inputDate < minDate) {
      return false;
    }
    if (inputDate > currentDate) {
      return false;
    }
    return true;
  }

  // Checks if the first name is valid
  isValidFirstName(firstName) {
    const isOnlyLettersAndSpaces = /^[\p{L}\s]+$/u.test(firstName);
    return firstName && firstName.length >= 2 && isOnlyLettersAndSpaces;
  }

  // Checks if the last name is valid
  isValidLastName(lastName) {
    const isOnlyLettersAndSpaces = /^[\p{L}\s]+$/u.test(lastName);
    return lastName && lastName.length >= 2 && isOnlyLettersAndSpaces;
  }

  // Checks if the email is valid
  isValidEmail(email) {
    const re = /^[a-zA-Z][\w.-]*@[a-zA-Z][\w.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  // Checks if the city is valid
  isValidCity(city) {
    const re = /^[\p{L}\s]+$/u;
    return re.test(city);
  }

  // Checks if the region is valid
  isValidRegion(region) {
    const re = /^[\p{L}\s]+$/u;
    return re.test(region);
  }

  // Checks if the invoice is a duplicate
  isDuplicateInvoice(invoices, data) {
    return invoices.some(
      (invoice) => invoice.email === data.email && invoice.id !== data.id
    );
  }
}

export default InvoiceValidator;
