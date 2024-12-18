import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyDVcG-dBlXqAfniVYqhswonvadglzaf28c",
    authDomain: "bina-siswa.firebaseapp.com",
    projectId: "bina-siswa",
    databaseURL: "https://bina-siswa-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "bina-siswa.firebasestorage.app",
    messagingSenderId: "542547140073",
    appId: "1:542547140073:web:4fb9c09ee69c8759883f78",
    measurementId: "G-2SHVXQV374"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

// Get ID Element
let username = document.getElementById("username");
let password = document.getElementById("password");
let role = document.getElementById("role");

// Get ID Btn
let login_btn = document.getElementById("login");
let register_btn = document.getElementById("register");
let register_btn_page = document.getElementById("register_page");
let logout_btn = document.getElementById("logout");

// Check if need 
if(register_btn){register_btn.addEventListener('click',Add_User);}
if(login_btn){login_btn.addEventListener('click',Check_Login);}
if(logout_btn){logout_btn.addEventListener('click',Logout);}

//Defined function

//Sweet Alert 
function showAlert(type, title, text) {
    Swal.fire({
        icon: type,
        title: title,
        text: text,
    });
}

//Register
function Add_User() {
    if (!username.value || !password.value || role.value === "") {
        showAlert('error', 'Error', 'Semua harus diisi!');
        return; 
    }else{
        set(ref(db, 'User/' + username.value), {
            password: password.value,
            role: role.value
        }).then(() => {
            console.log("Success !");
            showAlert('success', 'Berhasil!', 'Akun berhasil dibuat!');
        }).catch((error) => {
            console.log(error);
            showAlert('error', 'Oops...', 'Terjadi kesalahan saat membuat akun: ' + error);
        });
    }
}

//Login
function Check_Login() {
    const dbRef = ref(db);

    if (!username.value || !password.value || role.value === "") {
        showAlert('error', 'Error', 'Semua harus diisi!');
        return;
    }

    get(child(dbRef, 'User/' + username.value)).then((snapshot) => {
        if (snapshot.exists()) {
            let password_db = snapshot.val().password;
            let role_db = snapshot.val().role;
            if (password.value === password_db && role.value === role_db) {
                showAlert('success', 'Berhasil!', 'Login berhasil!');
                sessionStorage.setItem("username", username.value);
                if(role_db === "guru") {window.location.href = 'guru.html';}
                else if(role_db === "siswa") {window.location.href = 'siswa.html';}
                else{console.log("Something wrong to next page !");}
            } else {
                showAlert('error', 'Oops...', 'Ada salah nih!');
                console.log("Password tidak cocok");
            }
        } else {
            showAlert('error', 'Error', 'Username tidak ditemukan!\nSilahkan register terlebih dahulu !');
        }
    }).catch((error) => {
        showAlert('error', 'Error', 'Gagal terhubung ke database: ' + error.message);
        console.error("Database error:", error);
    });
}

//Logout
function Logout(){
    sessionStorage.clear();
    window.location.href = "index.html";
}