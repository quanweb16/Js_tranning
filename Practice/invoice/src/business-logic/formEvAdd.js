

export function setupImageUpload(formContainer) {
    const fileInput = formContainer.querySelector('#file-upload');
    const imgPreview = formContainer.querySelector('#profile-img-preview');

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imgPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

export function setupFormCloseEvent(formContainer, container) {
    formContainer.addEventListener('click', function(event) {
        if (event.target === formContainer) {
            container.removeChild(formContainer);
            container.classList.remove('blurred');
        }
    });
}

export function setupFormSubmitEvent(formContainer, container) {
    const form = formContainer.querySelector('.form-invoice');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn gửi form theo cách mặc định

        // Thu thập dữ liệu từ form
        const invoiceId = form.querySelector('#invoice-id').value;
        const date = form.querySelector('#date').value;
        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const address = form.querySelector('#address').value;
        const profileImgSrc = form.querySelector('#profile-img-preview').src;

        // Thêm dữ liệu vào danh sách hóa đơn
        addInvoiceToList(invoiceId, date, name, email, address, profileImgSrc);

        // Đóng form
        container.removeChild(formContainer);
        container.classList.remove('blurred');
    });
}
