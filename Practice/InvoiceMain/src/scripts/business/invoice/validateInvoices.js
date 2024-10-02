import ERROR_MESSAGES from "./errorMessages";

class ValidateInvoices {
  validateInvoiceData(data, invoices) {
    const errors = {};

    if (!data.date) {
      errors.date = ERROR_MESSAGES.DATE_REQUIRED;
    } else if (!this.isValidDate(data.date)) {
      errors.date = ERROR_MESSAGES.INVALID_DATE;
    }

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

    if (!data.firstName) {
      errors.firstName = ERROR_MESSAGES.FIRST_NAME_REQUIRED;
    } else if (!this.isValidFirstName(data.firstName)) {
      errors.firstName = ERROR_MESSAGES.INVALID_FIRST_NAME;
    }

    if (!data.lastName) {
      errors.lastName = ERROR_MESSAGES.LAST_NAME_REQUIRED;
    } else if (!this.isValidLastName(data.lastName)) {
      errors.lastName = ERROR_MESSAGES.INVALID_LAST_NAME;
    }

    if (!data.city) {
      errors.city = ERROR_MESSAGES.CITY_REQUIRED;
    } else if (!this.isValidCity(data.city)) {
      errors.city = ERROR_MESSAGES.INVALID_CITY;
    }

    if (!data.region) {
      errors.region = ERROR_MESSAGES.REGION_REQUIRED;
    } else if (!this.isValidRegion(data.region)) {
      errors.region = ERROR_MESSAGES.INVALID_REGION;
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    return { success: true };
  }

  isValidDate(date) {
    const inputDate = new Date(date);
    const minDate = new Date("2020-01-01");
    const currentDate = new Date();
    if (inputDate < minDate) {
      return false;
    }
    if (inputDate > currentDate) {
      return false;
    }
    return true;
  }

  isValidFirstName(firstName) {
    const isOnlyLettersAndSpaces = /^[\p{L}\s]+$/u.test(firstName);
    return firstName && firstName.length >= 2 && isOnlyLettersAndSpaces;
  }

  isValidLastName(lastName) {
    const isOnlyLettersAndSpaces = /^[\p{L}\s]+$/u.test(lastName);
    return lastName && lastName.length >= 2 && isOnlyLettersAndSpaces;
  }

  isValidEmail(email) {
    const re = /^[a-zA-Z][\w.-]*@[a-zA-Z][\w.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  isValidCity(city) {
    const re = /^[\p{L}\s]+$/u;
    return re.test(city);
  }

  isValidRegion(region) {
    const re = /^[\p{L}\s]+$/u;
    return re.test(region);
  }

  isDuplicateInvoice(invoices, data) {
    return invoices.some(
      (invoice) => invoice.email === data.email && invoice.id !== data.id
    );
  }
}
export default ValidateInvoices;
