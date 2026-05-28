let employees = [];

/* ---------------- INIT ---------------- */
loadEmployees();

/* ---------------- INIT PASSWORD DEFAULT ---------------- */
if (!localStorage.getItem("password")) {
    localStorage.setItem("password", "123456");
}

/* ---------------- LOGIN ---------------- */
function login(){
function loadEmployees(){

    employees = [];

    db.collection("employees").get().then((snapshot)=>{

        snapshot.forEach((doc)=>{

            employees.push({
                id: doc.id,
                ...doc.data()
            });

        });

        displayEmployees();

    });

}
   
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    if(!email || !password) return;

    let savedPassword = localStorage.getItem("password");

    if(email.value === "admin@gmail.com" && password.value === savedPassword){
        window.location.href = "dashboard.html";
    }else{
        let msg = document.getElementById("message");
        if(msg) msg.innerHTML = "Invalid Email or Password";
    }
}

/* ---------------- ADD EMPLOYEE ---------------- */
function addEmployee(){

    let name = document.getElementById("empName").value;
    let dept = document.getElementById("empDept").value;

    if(name === "" || dept === ""){
        alert("Please fill all fields");
        return;
    }

    db.collection("employees").add({

        name: name,
        dept: dept

    }).then(()=>{

        loadEmployees();

        document.getElementById("empName").value = "";
        document.getElementById("empDept").value = "";

    });

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
                onclick="deleteEmployee('${emp.id}')"
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
function deleteEmployee(id){

    db.collection("employees").doc(id).delete()
    .then(()=>{

        loadEmployees();

    });

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

        employees[index].name = newName.trim();
        employees[index].dept = newDept.trim();

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
    window.location.href = "index.html";
}

/* ---------------- CHANGE PASSWORD ---------------- */
function changePassword(){

    let newPass = prompt("Enter new password:");

    if(newPass && newPass.trim() !== ""){
        localStorage.setItem("password", newPass.trim());
        alert("Password updated successfully!");
    }
}