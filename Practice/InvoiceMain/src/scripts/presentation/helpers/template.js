class Template {
  static buildInvoices(data = []) {
      return data.map(item => this.buildInvoiceItem(item)).join('');
  }

  static buildInvoiceItem(data) {
      return `
          <li class="table-item" data-id="${data.id}">
              <div class="invoice-item">
                  <input type="checkbox" class="invoice-checkbox">
                  <div class="invoice">${data.id || ''}</div>
                  <div class="profile-pic">
                      <img src="./assets/avatar.jpg" alt="Profile Picture">
                      <div class="name">${data.firstName || 'No Name'} ${data.lastName || 'No Name'}</div>
                  </div>
                  <div class="email">${data.email || 'noemail@example.com'}</div>
                  <div class="date"><i class="fas fa-calendar-alt"></i> ${data.date || ''}</div>
                  <div class="status-1">${data.status || ''}</div>
                  <button class="special"><i class="fas fa-star"></i></button>
                  <div class="action">
                      <div class="dots">•••</div>
                      <div class="button-action">
                          <div class="edit-btn">Edit</div>
                          <div class="delete-btn">Delete</div>
                      </div>
                  </div>
              </div>
          </li>
      `;
  }

  static buildInvoiceForm() {
      return `
          <div class="create-invoice-container">
              <div class="popup-form">
                  <form class="form-invoice">
                      <div class="user-img">
                          <div class="image">
                              <img src="" alt="add image" id="profile-img-preview">
                              <input type="file" id="file-upload" name="file-upload">
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="invoice-id">Invoice Id</label>
                          <input type="text" id="invoice-id" name="invoice-id" placeholder="#8181" required readonly>
                          <span class="error-message-id"></span>
                      </div>
                      <div class="form-group">
                          <label for="date">Date</label>
                          <input type="date" id="date" name="date" required>
                          <span class="error-message-date" id="date-error"></span>
                      </div>
                      <div class="form-group-inline">
                          <div class="form-group">
                              <label for="first-name">First Name</label>
                              <input type="text" id="first-name" name="first-name" placeholder="First Name" required>
                              <span class="error-message-first-name" id="first-name-error"></span>
                          </div>
                          <div class="form-group">
                              <label for="last-name">Last Name</label>
                              <input type="text" id="last-name" name="last-name" placeholder="Last Name" required>
                              <span class="error-message-last-name" id="last-name-error"></span>
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="email">Email</label>
                          <input type="email" id="email" name="email" placeholder="name@gmail.com" required>
                          <span class="error-message-email" id="email-error"></span>
                      </div>
                      <div class="form-group-inline">
                          <div class="form-group">
                              <label for="city">City</label>
                              <input type="text" id="city" name="city" placeholder="City" required>
                              <span class="error-message-city" id="city-error"></span>
                          </div>
                          <div class="form-group">
                              <label for="region">Region</label>
                              <input type="text" id="region" name="region" placeholder="Region" required>
                              <span class="error-message-region" id="region-error"></span>
                          </div>
                      </div>
                      <div class="form-group">
                          <button type="submit" class="btn-invoice-create">Create Invoice</button>
                      </div>
                  </form>
                  <button class="close-popup">
                      <i class="fas fa-times"></i>
                  </button>
              </div>
          </div>
      `;
  }

  static buildInvoiceFormEdit() {
      return `
          <div class="Edit-invoice-container">
              <div class="popup-form-edit">
                  <form class="form-invoice-edit">
                      <div class="user-img">
                          <div class="image">
                              <img src="" alt="add image" id="profile-img-preview">
                              <input type="file" id="file-upload" name="file-upload">
                          </div>
                      </div>
                      <div class="form-group-edit">
                          <label for="invoice-id">Invoice Id</label>
                          <input type="text" id="invoice-id" name="invoice-id" placeholder="#8181" required readonly>
                          <span class="error-message-id" id="invoice-id-error"></span>
                      </div>
                      <div class="form-group-edit">
                          <label for="date">Date</label>
                          <input type="date" id="date" name="date" required>
                          <span class="error-message-date" id="date-error"></span>
                      </div>
                      <div class="form-group-inline">
                          <div class="form-group-edit">
                              <label for="first-name">First Name</label>
                              <input type="text" id="first-name" name="first-name" placeholder="First Name" required>
                              <span class="error-message-first-name" id="first-name-error"></span>
                          </div>
                          <div class="form-group-edit">
                              <label for="last-name">Last Name</label>
                              <input type="text" id="last-name" name="last-name" placeholder="Last Name" required>
                              <span class="error-message-last-name" id="last-name-error"></span>
                          </div>
                      </div>
                      <div class="form-group-edit">
                          <label for="email">Email</label>
                          <input type="email" id="email" name="email" placeholder="name@gmail.com" required>
                          <span class="error-message-email" id="email-error"></span>
                      </div>
                      <div class="form-group-inline">
                          <div class="form-group-edit">
                              <label for="city">City</label>
                              <input type="text" id="city" name="city" placeholder="City" required>
                              <span class="error-message-city" id="city-error"></span>
                          </div>
                          <div class="form-group-edit">
                              <label for="region">Region</label>
                              <input type="text" id="region" name="region" placeholder="Region" required>
                              <span class="error-message-region" id="region-error"></span>
                          </div>
                      </div>
                      <div class="form-group-edit">
                          <button type="submit" class="btn-invoice-edit">Edit Invoice</button>
                      </div>
                  </form>
                  <button class="close-popup-edit">
                      <i class="fas fa-times"></i>
                  </button>
              </div>
          </div>
      `;
  }

  static buildDeletePopup() {
      return `
          <div class="confirm-delete-container">
              <h2>Are you sure you want to delete this invoice?</h2>
              <div class="confirm-buttons">
                  <button class="confirm-yes">Yes</button>
                  <button class="confirm-no">No</button>
              </div>
          </div>
      `;
  }

  static buildDeleteAllPopup() {
      return `
          <div class="confirm-deleteAll-container">
              <h2>Are you sure you want to delete these invoices?</h2>
              <div class="confirm-select-buttons">
                  <button class="confirm-yes-all">Yes</button>
                  <button class="confirm-no-all">No</button>
              </div>
          </div>
      `;
  }

  static notificationPopup() {
      return `
          <div class="notificationDeleteAll-container">
              <h2>Please select at least one invoice to delete!</h2>
              <div class="confirm-buttons">
                  <button class="confirm-yes">Yes</button>
              </div>
          </div>
      `;
  }

  static notificationCreate() {
      return `
          <div class="notificationCreate-container">
              <h2>Create successfully</h2>
              <div class="confirm-buttons-success">
                  <button class="confirm-ok-success">OK</button>
              </div>
          </div>
      `;
  }

  static notificationEdit() {
      return `
          <div class="notificationEdit-container">
              <h2>Edit successfully</h2>
              <div class="confirm-buttons-edit-success">
                  <button id="confirm-edit-success" class="confirm-edit-success">OK</button>
              </div>
          </div>
      `;
  }
}

export default Template;

