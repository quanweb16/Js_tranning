// Ví dụ về Promises
function fetchData() {
    return new Promise((resolve, reject) => {
      // Thực hiện một tác vụ asynchronous, ví dụ như gọi API
      setTimeout(() => {
        const data = { name: "John Doe", age: 30 };
        resolve(data);
      }, 2000);
    });
  }
  
  fetchData()
    .then((data) => {
      console.log(data); // Output: { name: 'John Doe', age: 30 }
    })
    .catch((error) => {
      console.error(error);
    });