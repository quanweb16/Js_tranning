// src/Template/createInvoiceTemplate.js

export function getCreateInvoiceTemplate() {
    return `
        <div class="create-invoice-container">
            <h2>Create New Invoice</h2>
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
    `;
}
