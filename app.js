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
let reg_role = document.getElementById("choose_role");

//Siswa
let reg_username = document.getElementById("reg_username");
let reg_password = document.getElementById("reg_password");
let reg_email = document.getElementById("reg_email");
let reg_sekolah = document.getElementById("reg_sekolah");
let reg_gender = document.getElementById("reg_gender");

//Guru
let reg_username_guru = document.getElementById("reg_username_guru");
let reg_password_guru = document.getElementById("reg_password_guru");
let reg_email_guru = document.getElementById("reg_email_guru");
let reg_ins_email = document.getElementById("reg_email_ins");
let reg_studi = document.getElementById("reg_studi");
let reg_experience = document.getElementById("reg_experience");
let reg_gender_guru = document.getElementById("reg_gender_guru");

// Get ID Btn
let login_btn = document.getElementById("login");
let register_btn = document.getElementById("register");
let register_btn_page = document.getElementById("register_page");
let logout_btn = document.getElementById("logout");
let back_btn = document.getElementById("back");

// Check if needed
if(register_btn){register_btn.addEventListener('click',Add_User);}
if(login_btn){login_btn.addEventListener('click',Check_Login);}
if(logout_btn){logout_btn.addEventListener('click',Logout);}
if(register_btn_page){register_btn_page.addEventListener('click',toRegisterPage);}
if(back_btn){back_btn.addEventListener('click',toIndexPage);}


//Defined function

//Logout
function Logout(){
    sessionStorage.clear();
    window.location.href = "index.html";
}

//Sweet Alert 
function showAlert(type, title, text) {
    Swal.fire({
        icon: type,
        title: title,
        text: text,
    });
}

//Register page
function toRegisterPage(){
    window.location.href = "register.html";
}

function toIndexPage(){
    window.location.href = "index.html";
}

//Register
function Add_User() {
    if(reg_role.value === "siswa"){
        if (!reg_username.value || !reg_password.value || !reg_email.value || !reg_sekolah.value || reg_gender.value === "") {
            showAlert('error', 'Error', 'Semua harus diisi!');
            return; 
        }else{
            set(ref(db, 'Siswa/' + reg_username.value), {
                password: reg_password.value,
                email: reg_email.value,
                sekolah: reg_sekolah.value,
                gender: reg_gender.value
            }).then(() => {
                showAlert('success', 'Berhasil!', 'Akun berhasil dibuat!');
            }).catch((error) => {
                console.log(error);
                showAlert('error', 'Oops...', 'Terjadi kesalahan saat membuat akun: ' + error);
            });
        }
        
    }else if(reg_role.value === "guru"){
        if (!reg_username_guru.value || !reg_password_guru.value || !reg_email_guru.value || !reg_ins_email.value || !reg_studi.value || !reg_experience.value || reg_gender_guru.value === "") {
            showAlert('error', 'Error', 'Semua harus diisi!');
            return;
        }
        else{
            set(ref(db, 'Guru/' + reg_username_guru.value), {
            password: reg_password_guru.value,
            email_pribadi: reg_email_guru.value,
            email_institusi: reg_ins_email.value,
            studi: reg_studi.value,
            exp: reg_experience.value,
            gender: reg_gender_guru.value
        }).then(() => {
            showAlert('success', 'Berhasil!', 'Akun berhasil dibuat!');
        }).catch((error) => {
            console.log(error);
            showAlert('error', 'Oops...', 'Terjadi kesalahan saat membuat akun: ' + error);
        });}
        
    }else{
        showAlert('error', 'Oops...', 'Ada sedikit masalah !');
    }
}

//Login
function Check_Login() {
    const dbRef = ref(db);

    if (!username.value || !password.value || role.value === "") {
        showAlert('error', 'Error', 'Semua harus diisi!');
        return;
    }else if(role.value === "siswa"){
        get(child(dbRef, 'Siswa/' + username.value)).then((snapshot) => {
            if (snapshot.exists()) {
                let password_db = snapshot.val().password;
                if (password.value === password_db) {
                    showAlert('success', 'Berhasil!', 'Login berhasil!');
                    sessionStorage.setItem("username", username.value);
                    window.location.href = "siswa.html";
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
    }else if(role.value === "guru"){
        get(child(dbRef, 'Guru/' + username.value)).then((snapshot) => {
            if (snapshot.exists()) {
                let password_db = snapshot.val().password;
                if (password.value === password_db) {
                    showAlert('success', 'Berhasil!', 'Login berhasil!');
                    sessionStorage.setItem("username", username.value);
                    window.location.href = "guru.html";
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
    }else{
        showAlert('error', 'Error', 'Ada yang salah nih !');
    }

    
}
