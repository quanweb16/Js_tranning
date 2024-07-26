// Mảng dữ liệu
var languages = [
    { name: 'JavaScript', releaseDate: 1995, fileExtension: '.js', creator: 'Brendan Eich' },
    { name: 'Java', releaseDate: 1995, fileExtension: '.java', creator: 'James Gosling' },
    { name: 'PHP', releaseDate: 1995, fileExtension: '.php', creator: 'Rasmus Lerdorf' },
    { name: 'C++', releaseDate: 1985, fileExtension: '.cpp', creator: 'Bjarne Stroustrup' },
];

// Lấy phần tử bảng
var table = document.getElementById('languageTable');

// Tạo phần tiêu đề của bảng
var thead = document.createElement('thead');
var headerRow = document.createElement('tr');
var headers = ['Name', 'Release Date', 'File Extension', 'Creator'];

// Hàm để tạo tiêu đề
function createHeaderCell(header) {
    var th = document.createElement('th');
    var textNode = document.createTextNode(header);
    th.appendChild(textNode);
    return th;
}

// Tạo các ô tiêu đề và thêm vào hàng tiêu đề
for (var i = 0; i < headers.length; i++) {
    var headerCell = createHeaderCell(headers[i]);
    headerRow.appendChild(headerCell);
}

thead.appendChild(headerRow);
table.appendChild(thead);

// Tạo phần thân của bảng
var tbody = document.createElement('tbody');

// Hàm để tạo các ô dữ liệu
function createDataCell(data) {
    var td = document.createElement('td');
    var textNode = document.createTextNode(data);
    td.appendChild(textNode);
    return td;
}

// Hàm để tạo hàng dữ liệu 
function createRow(lang) {
    var row = document.createElement('tr');
    row.appendChild(createDataCell(lang.name));
    row.appendChild(createDataCell(lang.releaseDate));
    row.appendChild(createDataCell(lang.fileExtension));
    row.appendChild(createDataCell(lang.creator));
    return row;
}

// Tạo các hàng dữ liệu và thêm vào phần thân của bảng
for (var j = 0; j < languages.length; j++) {
    var row = createRow(languages[j]);
    tbody.appendChild(row);
}

table.appendChild(tbody);
