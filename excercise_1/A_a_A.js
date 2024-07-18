// Ví dụ về Async và Await
async function fetchData() {
    try {
      const data = await new Promise((resolve, reject) => {
        // Thực hiện một tác vụ asynchronous, ví dụ như gọi API
        setTimeout(() => {
          const data = { name: "John Doe", age: 30 };
          resolve(data);
        }, 2000);
      });
  
      console.log(data); // Output: { name: 'John Doe', age: 30 }
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchData();