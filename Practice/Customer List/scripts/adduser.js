
document.addEventListener('DOMContentLoaded', function() {
    
    // Hàm hiển thị form tạo hóa đơn
    function showForm() {
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

        const container = document.querySelector('.container');
        container.appendChild(formContainer);
        container.classList.add('blurred');

        // Hiển thị hình ảnh khi người dùng chọn file
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

        formContainer.addEventListener('click', function(event) {
            if (event.target === formContainer) {
                container.removeChild(formContainer);
                container.classList.remove('blurred');
            }
        });

        const form = formContainer.querySelector('.form-invoice');
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn gửi form theo cách mặc định

            // Thu thập dữ liệu từ form
            const invoiceId = form.querySelector('#invoice-id').value;
            const date = form.querySelector('#date').value;
            const name = form.querySelector('#name').value;
            const email = form.querySelector('#email').value;
            const address = form.querySelector('#address').value;
            const profileImgSrc = imgPreview.src;

            // Thêm dữ liệu vào danh sách hóa đơn
            addInvoiceToList(invoiceId, date, name, email, address, profileImgSrc);

            // Đóng form
            container.removeChild(formContainer);
            container.classList.remove('blurred');
        });
    }

    // Hàm thêm hóa đơn vào danh sách
    function addInvoiceToList(invoiceId, date, name, email, address, profileImgSrc) {
        const cardContainer = document.querySelector('.container');
        const newCard = document.createElement('div');
        newCard.classList.add('card');
    
        const newInfo = document.createElement('div');
        newInfo.classList.add('info');

        
        const status = 'Cancel'; // Đặt trạng thái mặc định là Pending
        const invoiceData = {
            invoiceId,
            date,
            name,
            email,
            address,
            profileImgSrc,
            status // Lưu trạng thái vào đối tượng hóa đơn
        };

        // Lưu dữ liệu hóa đơn vào localStorage
        let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
        invoices.push(invoiceData);
        localStorage.setItem('invoices', JSON.stringify(invoices));
        
        newInfo.innerHTML = `
            <input type="checkbox" class="checkbox">
            <div class="invoice">${invoiceId}</div>
            <div class="profile-pic">
                <img src="${profileImgSrc}" alt="Profile Picture">
                <div class="name">${name}</div>
            </div>
            <div class="email">${email}</div>
            <div class="date"><i class="fas fa-calendar-alt"></i> ${date}</div>
            <div class="status-1">${status}</div> 
            <div class="star">
                <button class="special"><i class="fas fa-star"></i></button>
            </div>
            <div class="menuu">
                <div class="dots">•••</div>
                <div class="menu-itemss">
                    <div class="menu-itemm edit-btn">Edit</div>
                    <div class="menu-itemm delete-btn">Delete</div>
                </div>
            </div>
        `;
    
        newCard.appendChild(newInfo);
        cardContainer.appendChild(newCard);

        const deleteBtn = newCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            showDeleteConfirm(newCard);
        });

        // Sự kiện cho nút Edit
        const editBtn = newCard.querySelector('.edit-btn');
        editBtn.addEventListener('click', function() {
            showEditForm(newCard, invoiceId, date, name, email, address, profileImgSrc);
        });
    }

    // Hàm hiển thị form chỉnh sửa hóa đơn
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

            // Đóng form edit
            container.removeChild(formEdit);
            container.classList.remove('blurred');
        });
    }

    // Hàm hiển thị xác nhận xóa
    function showDeleteConfirm(cardElement) {
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

        const container = document.querySelector('.container');
        container.appendChild(confirmContainer);
        container.classList.add('blurred');

        // Xóa khi nhấn nút Yes
        const yesButton = confirmContainer.querySelector('.confirm-yes');
        yesButton.addEventListener('click', function() {
            container.removeChild(cardElement);
            container.removeChild(confirmContainer);
            container.classList.remove('blurred');
        });

        // Đóng xác nhận khi nhấn nút No
        const noButton = confirmContainer.querySelector('.confirm-no');
        noButton.addEventListener('click', function() {
            container.removeChild(confirmContainer);
            container.classList.remove('blurred');
        });

        // Đóng xác nhận khi click ra ngoài
        confirmContainer.addEventListener('click', function(event) {
            if (event.target === confirmContainer) {
                container.removeChild(confirmContainer);
                container.classList.remove('blurred');
            }
        });
    }
    function deleteSelectedInvoices() {
        const checkboxes = document.querySelectorAll('.checkbox');
        const cardContainer = document.querySelector('.container');

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const card = checkbox.closest('.card');
                if (card) {
                    showDeleteConfirm(card);
                }
            }
        });
    }

    // Hàm tìm kiếm hóa đơn
    function searchInvoices() {
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const invoiceId = card.querySelector('.invoice').textContent.toLowerCase();
            const name = card.querySelector('.name').textContent.toLowerCase();

            if (invoiceId.includes(searchInput) || name.includes(searchInput)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
    //hàm khôi phục dữ liệu từ localStoge
   
    function clearInvoices() {
        const cardContainer = document.querySelector('.container');
        while (cardContainer.firstChild) {
            cardContainer.removeChild(cardContainer.firstChild);
        }
    }

    function restoreInvoices() {
        clearInvoices();
        const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
        console.log('Restoring invoices:', invoices);
        invoices.forEach(invoice => {
            addInvoiceToList(
                invoice.invoiceId,
                invoice.date,
                invoice.name,
                invoice.email,
                invoice.address,
                invoice.profileImgSrc,
                invoice.status
            );
        });
    }

    
    

    // Thêm sự kiện cho ô tìm kiếm
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', searchInvoices);

    // Gán sự kiện cho nút 'Add New'
    const addNewButton = document.querySelector('.addBtn');
    addNewButton.addEventListener('click', showForm);

    const deleteAllButton = document.querySelector('.delete-all');
    deleteAllButton.addEventListener('click', deleteSelectedInvoices);
    restoreInvoices();
});
