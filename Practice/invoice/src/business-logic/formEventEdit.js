

export function setupFormCloseEvent(formEdit, container) {
    formEdit.addEventListener('click', function(event) {
        if (event.target === formEdit) {
            container.removeChild(formEdit);
            container.classList.remove('blurred');
        }
    });
}

// Thiết lập sự kiện để hiển thị hình ảnh khi người dùng chọn file mới
export function setupImageUploadEdit(formEdit) {
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
}

// Thiết lập sự kiện submit form và xử lý dữ liệu
export function setupFormSubmitEventEdit(formEdit, cardElement, originalInvoiceId, container) {
    const form = formEdit.querySelector('.form-invoice');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn gửi form theo cách mặc định

        // Lấy dữ liệu từ form
        const editedInvoiceId = form.querySelector('#invoice-id').value;
        const editedDate = form.querySelector('#date').value;
        const editedName = form.querySelector('#name').value;
        const editedEmail = form.querySelector('#email').value;
        const editedAddress = form.querySelector('#address').value;
        const editedProfileImgSrc = form.querySelector('#profile-img-preview-edit').src;

        // Cập nhật thông tin trên thẻ card
        updateCardElement(cardElement, editedInvoiceId, editedDate, editedName, editedEmail, editedProfileImgSrc);

        // Cập nhật thông tin hóa đơn trong localStorage
        updateLocalStorageInvoice(originalInvoiceId, editedInvoiceId, editedDate, editedName, editedEmail, editedAddress, editedProfileImgSrc);

        // Đóng form edit
        container.removeChild(formEdit);
        container.classList.remove('blurred');
    });
}

// Cập nhật thông tin trên thẻ card
 export function updateCardElement(cardElement, invoiceId, date, name, email, profileImgSrc) {
    cardElement.querySelector('.invoice').textContent = invoiceId;
    cardElement.querySelector('.date').innerHTML = `<i class="fas fa-calendar-alt"></i> ${date}`;
    cardElement.querySelector('.name').textContent = name;
    cardElement.querySelector('.email').textContent = email;
    cardElement.querySelector('.profile-pic img').src = profileImgSrc;
}

// Cập nhật thông tin hóa đơn trong localStorage
export function updateLocalStorageInvoice(originalInvoiceId, invoiceId, date, name, email, address, profileImgSrc) {
    let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const existingInvoiceIndex = invoices.findIndex(invoice => invoice.invoiceId === originalInvoiceId);
    
    if (existingInvoiceIndex !== -1) {
        invoices[existingInvoiceIndex] = {
            invoiceId,
            date,
            name,
            email,
            address,
            profileImgSrc,
            status: invoices[existingInvoiceIndex].status
        };
        localStorage.setItem('invoices', JSON.stringify(invoices));
    }
}
