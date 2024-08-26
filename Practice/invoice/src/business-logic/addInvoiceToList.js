function addInvoiceToList(invoiceId, date, name, email, address, profileImgSrc) {
    const cardContainer = document.querySelector('.container');

    // Tạo phần tử thẻ card mới
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    
    // Tạo phần tử thông tin trong thẻ card
    const newInfo = document.createElement('div');
    newInfo.classList.add('info');

    // Đặt trạng thái mặc định là 'Pending'
    const status = 'Pending'; 
    const invoiceData = {
        invoiceId,
        date,
        name,
        email,
        address,
        profileImgSrc,
        status // Lưu trạng thái vào đối tượng hóa đơn
    };
    
    // Lấy dữ liệu hóa đơn từ localStorage
    let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    
    // Kiểm tra xem hóa đơn với invoiceId đã tồn tại chưa
    const existingInvoiceIndex = invoices.findIndex(invoice => invoice.invoiceId === invoiceId);
    
    if (existingInvoiceIndex !== -1) {
        // Nếu đã tồn tại, cập nhật hóa đơn
        invoices[existingInvoiceIndex] = invoiceData;
    } else {
        // Nếu chưa tồn tại, thêm hóa đơn mới
        invoices.push(invoiceData);
    }
    
    // Cập nhật lại localStorage
    localStorage.setItem('invoices', JSON.stringify(invoices));

    // Tạo nội dung cho phần tử thông tin trong thẻ card
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

    // Thêm phần tử thông tin vào thẻ card
    newCard.appendChild(newInfo);
    // Thêm thẻ card vào container
    cardContainer.appendChild(newCard);

    // Xử lý sự kiện cho nút Delete
    const deleteBtn = newCard.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        showDeleteConfirm(newCard);
    });

    // Xử lý sự kiện cho nút Edit
    const editBtn = newCard.querySelector('.edit-btn');
    editBtn.addEventListener('click', function() {
        showEditForm(newCard, invoiceId, date, name, email, address, profileImgSrc);
    });

    // Xử lý sự kiện cho nút Star
    const starBtn = newCard.querySelector('.star .special');
    starBtn.addEventListener('click', function() {
        starBtn.classList.toggle('active');
    });
}
