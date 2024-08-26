export function createFormContainer() {
    const formContainer = document.createElement('div');
    formContainer.classList.add('popup-form');

    formContainer.innerHTML = `
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
                    <input type="text" id="invoice-id" name="invoice-id" placeholder="#8181">
                </div>
                <div class="form-group">
                    <label for="date">Date</label>
                    <input type="date" id="date" name="date">
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="QuanDoan">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="name@gmail.com">
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" id="address" name="address" placeholder="Name City">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn-invoice-create">Invoice Create</button>
                </div>
            </form>
        </div>
    `;

    return formContainer;
}
export function createConfirmContainer() {
    const confirmContainer = document.createElement('div');
    confirmContainer.classList.add('confirm-delete');

    confirmContainer.innerHTML = `
        <div class="confirm-delete-container">
            <h2>Are you sure you want to delete this invoice?</h2>
            <div class="confirm-buttons">
                <button class="confirm-yes">Yes</button>
                <button class="confirm-no">No</button>
            </div>
        </div>
    `;

    return confirmContainer;
}
export function createEditFormContainer(invoiceId, date, name, email, address, profileImgSrc) {
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
export function createDeleteConfirmation(numberOfSelectedCards) {
    const confirmContainer = document.createElement('div');
    confirmContainer.classList.add('confirm-delete');

    confirmContainer.innerHTML = `
        <div class="confirm-delete-container">
            <h2>Are you sure you want to delete ${numberOfSelectedCards} selected invoices?</h2>
            <div class="confirm-buttons">
                <button class="confirm-yes">Yes</button>
                <button class="confirm-no">No</button>
            </div>
        </div>
    `;

    return confirmContainer;
}