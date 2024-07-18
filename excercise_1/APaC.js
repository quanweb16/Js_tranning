// Ví dụ về asynchronous programming và callbacks
function fetchData(callback) {
    // Thực hiện một tác vụ asynchronous, ví dụ như gọi API
    setTimeout(() => {
      const data = { name: "John Doe", age: 30 };
      callback(data);
    }, 2000);
  }
  
  fetchData((data) => {
    console.log(data); // Output: { name: 'John Doe', age: 30 }
  });