function showEditForm(cardElement, invoiceId, date, name, email, address, profileImgSrc) {
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

    const container = document.querySelector('.container');
    container.appendChild(formEdit);
    container.classList.add('blurred');

    // Đóng form khi click ra ngoài
    formEdit.addEventListener('click', function(event) {
        if (event.target === formEdit) {
            container.removeChild(formEdit);
            container.classList.remove('blurred');
        }
    });

    // Hiển thị hình ảnh khi người dùng chọn file mới
    const fileInputEdit = formEdit.querySelector('#file-upload-edit');
    const imgPreviewEdit = formEdit.querySelector('#profile-img-preview-edit');
    fileInputEdit.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imgPreviewEdit.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    const form = formEdit.querySelector('.form-invoice');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Lấy dữ liệu từ form
        const editedInvoiceId = form.querySelector('#invoice-id').value;
        const editedDate = form.querySelector('#date').value;
        const editedName = form.querySelector('#name').value;
        const editedEmail = form.querySelector('#email').value;
        const editedAddress = form.querySelector('#address').value;
        const editedProfileImgSrc = imgPreviewEdit.src;
    
        // Cập nhật thông tin trên thẻ card
        cardElement.querySelector('.invoice').textContent = editedInvoiceId;
        cardElement.querySelector('.date').innerHTML = `<i class="fas fa-calendar-alt"></i> ${editedDate}`;
        cardElement.querySelector('.name').textContent = editedName;
        cardElement.querySelector('.email').textContent = editedEmail;
        cardElement.querySelector('.profile-pic img').src = editedProfileImgSrc;
    
        // Cập nhật thông tin hóa đơn trong localStorage
        let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
        const existingInvoiceIndex = invoices.findIndex(invoice => invoice.invoiceId === invoiceId);
        if (existingInvoiceIndex !== -1) {
            invoices[existingInvoiceIndex] = {
                invoiceId: editedInvoiceId,
                date: editedDate,
                name: editedName,
                email: editedEmail,
                address: editedAddress,
                profileImgSrc: editedProfileImgSrc,
                status: invoices[existingInvoiceIndex].status
            };
            localStorage.setItem('invoices', JSON.stringify(invoices)); // Sửa 'invoice' thành 'invoices'
        }
    
        // Đóng form edit
        container.removeChild(formEdit);
        container.classList.remove('blurred');
    });
}