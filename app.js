let employees = JSON.parse(localStorage.getItem("employees")) || [];

/* ---------------- INIT ---------------- */
displayEmployees();

/* ---------------- LOGIN ---------------- */
function login(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let savedPassword = localStorage.getItem("password") || "123456";

    if(email === "admin@gmail.com" && password === savedPassword){
        window.location.href = "dashboard.html";
    }else{
        let msg = document.getElementById("message");
        if(msg) msg.innerHTML = "Invalid Email or Password";
    }
}

/* ---------------- ADD EMPLOYEE ---------------- */
function addEmployee(){

    let name = document.getElementById("empName");
    let dept = document.getElementById("empDept");

    if(!name || !dept) return;

    if(name.value === "" || dept.value === ""){
        alert("Please fill all fields");
        return;
    }

    employees.push({
        name: name.value,
        dept: dept.value
    });

    localStorage.setItem("employees", JSON.stringify(employees));

    name.value = "";
    dept.value = "";

    displayEmployees();
}

/* ---------------- DISPLAY ---------------- */
function displayEmployees(){

    let list = document.getElementById("employeeList");

    if(!list) return;

    list.innerHTML = "";

    employees.forEach((emp, index)=>{

        list.innerHTML += `
        <tr>
            <td>${emp.name}</td>
            <td>${emp.dept}</td>
            <td>
                <button onclick="editEmployee(${index})">Edit</button>
                <button onclick="deleteEmployee(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

    let totalEmp = document.getElementById("totalEmployees");
    let totalDept = document.getElementById("totalDepartments");
    let active = document.getElementById("activeStaff");

    if(totalEmp) totalEmp.innerHTML = employees.length;

    let departments = [...new Set(employees.map(emp => emp.dept))];

    if(totalDept) totalDept.innerHTML = departments.length;
    if(active) active.innerHTML = employees.length;
}

/* ---------------- DELETE ---------------- */
function deleteEmployee(index){

    employees.splice(index, 1);

    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();
}

/* ---------------- SEARCH ---------------- */
function searchEmployee(){

    let input = document.getElementById("search");

    if(!input) return;

    let filter = input.value.toLowerCase();

    let rows = document.querySelectorAll("#employeeList tr");

    rows.forEach(row => {

        let name = row.children[0].textContent.toLowerCase();

        row.style.display = name.includes(filter) ? "" : "none";

    });
}

/* ---------------- EDIT ---------------- */
function editEmployee(index){

    let newName = prompt("Enter new employee name");
    let newDept = prompt("Enter new department");

    if(newName && newDept){

        employees[index].name = newName;
        employees[index].dept = newDept;

        localStorage.setItem("employees", JSON.stringify(employees));

        displayEmployees();
    }
}

/* ---------------- DARK MODE ---------------- */
function toggleDarkMode(){
    document.body.classList.toggle("light-mode");
}

/* ---------------- LOGOUT ---------------- */
function logout(){
    localStorage.clear();
    window.location.replace("index.html");
}
/* ---------------- CHANGE PASSWORD ---------------- */
function changePassword(){

    let newPass = prompt("Enter new password:");

    if(newPass && newPass.trim() !== ""){
        localStorage.setItem("password", newPass);
        alert("Password updated successfully!");
    }
}