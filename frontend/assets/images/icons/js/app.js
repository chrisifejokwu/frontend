// Handle login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await apiRequest("/auth/login", "POST", { email, password });
      localStorage.setItem("token", res.token);
      alert("Login successful!");
      window.location.href = "cars.html";
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  });
}

// Handle registration
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await apiRequest("/auth/register", "POST", { name, email, password });
      alert("Registered! Please log in.");
      window.location.href = "login.html";
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  });
}

// Load cars
const carList = document.getElementById("carList");
if (carList) {
  (async () => {
    try {
      const cars = await apiRequest("/cars");
      carList.innerHTML = cars.map(
        (c) => `<div>
          <h3>${c.make} ${c.model} (${c.year})</h3>
          <p>$${c.price}</p>
          <a href="car-details.html?id=${c._id}">View Details</a>
        </div>`
      ).join("");
    } catch (err) {
      carList.innerHTML = "Failed to load cars.";
    }
  })();
}

