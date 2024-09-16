class Template {
    static buildInvoices(data = []) {
        return data.map(item => this.buildInvoiceItem(item)).join('');
    }

    static buildInvoiceItem(data) {
        return `<li class="table-item">
            <div class="invoice-item">
              <input type="checkbox" class="invoice-checkbox">
              <div class="invoice">${data.invoiceId || ''}</div>
              <div class="profile-pic">
                <img src="${data.profileImgSrc || 'profile.jpg'}" alt="Profile Picture">
                <div class="name">${data.name || 'No Name'}</div>
              </div>
              <div class="email">${data.email || 'noemail@example.com'}</div>
              <div class="date"><i class="fas fa-calendar-alt"></i>${data.date || ''}</div>
              <div class="status-1">${data.status || 'Pending'}</div>
              <button class="special"><i class="fas fa-star"></i></button>
              <div class="action">
                <div class="dots">•••</div>
                <div class="button-action">
                  <div class="edit-btn">Edit</div>
                  <div class="delete-btn">Delete</div>
                </div>
              </div>
            </div>
          </li>`; //html
    };
    static buildInvoiceForm(){
        return`<form class="form-invoice">
            <div class="user-img">
                <div class="image">
                    <img src="" alt="add image" id="profile-img-preview">
                    <input type="file" id="file-upload" name="file-upload">
                </div>
            </div>
            <div class="form-group">
                <label for="invoice-id">Invoice Id</label>
                <input type="text" id="invoice-id" name="invoice-id" placeholder="#8181" required>
            </div>
            <div class="form-group">
                <label for="date">Date</label>
                <input type="date" id="date" name="date" required>
            </div>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" placeholder="QuanDoan" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="name@gmail.com" required>
            </div>
            <div class="form-group">
                <label for="address">Address</label>
                <input type="text" id="address" name="address" placeholder="Name City" required>
            </div>
            <div class="form-group">
                <button type="submit" class="btn-invoice-create">Create Invoice</button>
            </div>
        </form>
        <button class="close-popup">Close</button>
    </div>`;
    };
};

export default Template;