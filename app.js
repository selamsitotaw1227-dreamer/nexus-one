let employees = JSON.parse(localStorage.getItem("employees")) || [];

displayEmployees();

/* ---------------- LOGIN ---------------- */

function login(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let savedPassword = localStorage.getItem("password") || "123456";

    if(email === "admin@gmail.com" && password === savedPassword){

        window.location.href = "dashboard.html";

    }else{

        document.getElementById("message").innerHTML =
        "Invalid Email or Password";

    }
}

/* ---------------- EMPLOYEE CRUD ---------------- */

function addEmployee(){

    let name = document.getElementById("empName").value;
    let dept = document.getElementById("empDept").value;

    if(name === "" || dept === ""){
        alert("Please fill all fields");
        return;
    }

    employees.push({name, dept});

    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();

    document.getElementById("empName").value = "";
    document.getElementById("empDept").value = "";
}

function displayEmployees(){

    let list = document.getElementById("employeeList");

    if(!list) return;

    list.innerHTML = "";

    employees.forEach((emp,index)=>{

        list.innerHTML += `
        <tr>
            <td>${emp.name}</td>
            <td>${emp.dept}</td>
            <td>

                <button onclick="editEmployee(${index})">Edit</button>

                <button class="delete-btn"
                onclick="deleteEmployee(${index})">
                Delete
                </button>

            </td>
        </tr>
        `;
    });

    document.getElementById("totalEmployees").innerHTML =
    employees.length;

    let departments = [...new Set(employees.map(emp => emp.dept))];

    document.getElementById("totalDepartments").innerHTML =
    departments.length;

    document.getElementById("activeStaff").innerHTML =
    employees.length;
}

/* ---------------- DELETE ---------------- */

function deleteEmployee(index){

    employees.splice(index,1);

    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();
}

/* ---------------- SEARCH ---------------- */

function searchEmployee(){

    let input =
    document.getElementById("search").value.toLowerCase();

    let rows =
    document.querySelectorAll("#employeeList tr");

    rows.forEach(row => {

        let name =
        row.children[0].textContent.toLowerCase();

        row.style.display =
        name.includes(input) ? "" : "none";

    });

}

/* ---------------- UI FEATURES ---------------- */

function toggleDarkMode(){
    document.body.classList.toggle("light-mode");
}

function editEmployee(index){

    let newName = prompt("Enter new employee name");
    let newDept = prompt("Enter new department");

    if(newName && newDept){

        employees[index] = {
            name: newName,
            dept: newDept
        };

        localStorage.setItem("employees", JSON.stringify(employees));

        displayEmployees();
    }
}

function logout(){
    window.location.href = "index.html";
}

function changePassword(){

    let newPass = prompt("Enter new password:");

    if(newPass){
        localStorage.setItem("password", newPass);
        alert("Password updated successfully!");
    }
}