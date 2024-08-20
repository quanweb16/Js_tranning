function showForm() {
    // Tạo phần container cho form
    const formContainer = createFormContainer();

    // Thêm form vào container và áp dụng hiệu ứng mờ
    const container = document.querySelector('.container');
    container.appendChild(formContainer);
    container.classList.add('blurred');

    // Xử lý hiển thị hình ảnh khi người dùng chọn file
    setupImageUpload(formContainer);

    // Đóng form khi người dùng click ra ngoài
    setupFormCloseEvent(formContainer, container);

    // Xử lý sự kiện submit form
    setupFormSubmitEvent(formContainer, container);
}

// Tạo phần container và gán HTML cho form
function createFormContainer() {
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

// Thiết lập sự kiện để hiển thị hình ảnh khi người dùng chọn file
function setupImageUpload(formContainer) {
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

// Thiết lập sự kiện để đóng form khi người dùng click ra ngoài
function setupFormCloseEvent(formContainer, container) {
    formContainer.addEventListener('click', function(event) {
        if (event.target === formContainer) {
            container.removeChild(formContainer);
            container.classList.remove('blurred');
        }
    });
}

// Thiết lập sự kiện submit form và xử lý dữ liệu
function setupFormSubmitEvent(formContainer, container) {
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
