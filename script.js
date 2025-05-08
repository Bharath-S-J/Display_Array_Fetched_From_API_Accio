document.getElementById("loadDataBtn").addEventListener("click", loadData);

const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

// API Endpoints
const api1 = "https://dummyjson.com/posts";
const api2 = "https://dummyjson.com/products";
const api3 = "https://dummyjson.com/todos";

// Function to fetch data from the first API (Simulating delay of 1000ms)
function PromiseAPI1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(api1)
        .then((response) => response.json())
        .then((data) => {
          displayData("Posts Data", data.posts, [
            "id",
            "title",
            "body",
            "tags",
            "reactions",
            "views",
          ]); // Include tags, reactions, and views
          resolve();
        })
        .catch((error) => reject("Error fetching posts data: " + error));
    }, 1000);
  });
}

// Function to fetch data from the second API (Simulating delay of 2000ms)
function PromiseAPI2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(api2)
        .then((response) => response.json())
        .then((data) => {
          displayData("Products Data", data.products, [
            "id",
            "title",
            "description",
            "price",
            "rating",
            "stock",
            "tags",
            "brand",
          ]); // Include all relevant fields
          resolve();
        })
        .catch((error) => reject("Error fetching products data: " + error));
    }, 2000);
  });
}

// Function to fetch data from the third API (Simulating delay of 3000ms)
function PromiseAPI3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(api3)
        .then((response) => response.json())
        .then((data) => {
          displayData("Todos Data", data.todos, ["id", "todo", "completed"]); // Display todos with completion status
          resolve();
        })
        .catch((error) => reject("Error fetching todos data: " + error));
    }, 3000);
  });
}

// Function to display the data in the table
function displayData(title, items, fields) {
  const table = document.getElementById("output");

  // Create a new row for the title
  const row = document.createElement("tr");
  const titleCell = document.createElement("td");
  const dataCell = document.createElement("td");

  titleCell.textContent = title;
  dataCell.textContent = `Total items: ${items.length}`;
  row.appendChild(titleCell);
  row.appendChild(dataCell);
  table.appendChild(row);

  // Create header row for the fields
  const headerRow = document.createElement("tr");
  fields.forEach((field) => {
    const th = document.createElement("th");
    th.textContent = field.charAt(0).toUpperCase() + field.slice(1); // Capitalize field name
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Loop through the items to display detailed data
  items.forEach((item) => {
    const detailRow = document.createElement("tr");
    fields.forEach((field) => {
      const cell = document.createElement("td");
      if (field === "completed") {
        cell.textContent = item[field] ? "Completed" : "Not Completed"; // Special case for 'completed' field
      } else if (field === "reactions") {
        cell.textContent = `Likes: ${item[field].likes}, Dislikes: ${item[field].dislikes}`; // Handle reactions
      } else if (field === "tags") {
        cell.textContent = item[field].join(", "); // Display tags as a comma-separated string
      } else if (field === "dimensions") {
        cell.textContent = `Width: ${item[field].width}, Height: ${item[field].height}, Depth: ${item[field].depth}`; // Handle dimensions
      } else {
        cell.textContent = item[field];
      }
      detailRow.appendChild(cell);
    });
    table.appendChild(detailRow);
  });
}

// Function to load data from all APIs in sequence
function loadData() {
  // Clear previous error and output
  errorDiv.textContent = "";
  output.innerHTML = "";

  // Show loading spinner
  loading.style.display = "block";

  // Start the promise chain
  PromiseAPI1()
    .then(() => {
      return PromiseAPI2(); // Only call the next API if the previous one resolves
    })
    .then(() => {
      return PromiseAPI3(); // Continue with the last API
    })
    .then(() => {
      loading.style.display = "none"; // Hide loading spinner when all data is loaded
    })
    .catch((error) => {
      loading.style.display = "none"; // Hide loading spinner in case of error
      errorDiv.textContent = error; // Show error message
    });
}
