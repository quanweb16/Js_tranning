    class Template {
        static buildInvoices(data = []) {
            return data.map(item => this.buildInvoiceItem(item)).join('');
        }

        static buildInvoiceItem(data) {
            
            return `<li class="table-item" data-id="${data.id}" >
                <div class="invoice-item">
                <input type="checkbox" class="invoice-checkbox">
                <div class="invoice">${data.id || ''}</div>
                <div class="profile-pic">
                    <img src="images/anh1.jpg" alt="Profile Picture">
                    <div class="name">${data.name || 'No Name'}</div>
                </div>
                <div class="email">${data.email || 'noemail@example.com'}</div>
                <div class="date"><i class="fas fa-calendar-alt"></i>  ${data.date || ''}</div>
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
            </li>`; //html
        };
        static buildInvoiceForm(){
            return`<div class="create-invoice-container">           
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
        </div>
    </div>`;
        };
        static buildInvoiceFormEdit(){
            return`<div class="Edit-invoice-container">
            
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
                </div>
                <div class="form-group-edit">
                    <label for="date">Date</label>
                    <input type="date" id="date" name="date" required >
                </div>
                <div class="form-group-edit">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="QuanDoan" required >
                </div>
                <div class="form-group-edit">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="name@gmail.com" >
                </div>
                <div class="form-group-edit">
                    <label for="address">Address</label>
                    <input type="text" id="address" name="address" placeholder="Name City">
                </div>
                <div class="form-group-edit">
                    <button type="submit" class="btn-invoice-edit">Edit Invoice</button>
                </div>
            </form>
            <button class="close-popup">Close</button>
        </div>
    </div>`;
        };

        static buildDeletePopup(){
            return ` <div class="confirm-delete-container">
            <h2>Are you sure you want to delete this invoice?</h2>
            <div class="confirm-buttons">
                <button class="confirm-yes">Yes</button>
                <button class="confirm-no">No</button>
            </div>
        </div>`;
        }
        static buildDeleteAllPopup(){
            return ` <div class="confirm-deleteAll-container">
            <h2>Are you sure you want to delete these  invoices?</h2>
            <div class="confirm-select-buttons">
                <button class="confirm-yes-all">Yes</button>
                <button class="confirm-no-all">No</button>
            </div>
        </div>`;
        }
    };

    export default Template;