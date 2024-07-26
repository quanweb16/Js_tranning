var languages = [
    { name: 'JavaScript', releaseDate: 1995, fileExtension: '.js', creator: 'Brendan Eich' },
    { name: 'Java', releaseDate: 1995, fileExtension: '.java', creator: 'James Gosling' },
    { name: 'PHP', releaseDate: 1995, fileExtension: '.php', creator: 'Rasmus Lerdorf' },
    { name: 'C++', releaseDate: 1985, fileExtension: '.cpp', creator: 'Bjarne Stroustrup' },
];


 var table = document.getElementById('languageTable');
table.innerHTML=`
    <thead>
    <tr>
    <th>Name</th>
    <th>Name</th>
    <th>Name</th>
    <th>Name</th>
    </tr>
    </thead>
    <tbody>
    ${
        languages.map(lang =>`
            <tr>
            <td>${lang.name}</td>
            <td>${lang.releaseDate}</td>
            <td>${lang.fileExtension}</td>
            <td>${lang.creator}</td>
            </tr>

            `).join('')}
   
    </tbody>

`;