export function editInvoicePopup(invoiceId, profileImgSrc, date, name, email, address) {
    const formEdit = document.createElement('div');
    formEdit.classList.add('popup-form');

    formEdit.innerHTML = `
        <div class="create-invoice-container">
            <h2>Edit Invoice</h2>
            <form class="form-invoice">
                <div class="user-img">
                    <div class="image">
                        <img src="${profileImgSrc}" alt="add image" id="profile-img-preview-edit">
                        <input type="file" id="file-upload-edit" name="file-upload-edit">
                    </div>
                </div>
                <div class="form-group">
                    <label for="invoice-id">Invoice Id</label>
                    <input type="text" id="invoice-id" name="invoice-id" value="${invoiceId}">
                </div>
                <div class="form-group">
                    <label for="date">Date</label>
                    <input type="date" id="date" name="date" value="${date}">
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" value="${name}">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" value="${email}">
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" id="address" name="address" value="${address}">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn-edit">Save Changes</button>
                </div>
            </form>
        </div>
    `;
    return formEdit;
}
