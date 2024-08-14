// Fungsi untuk menyimpan data siswa ke localStorage
function saveStudentData(nis, nama) {
    localStorage.setItem('nis', nis);
    localStorage.setItem('nama', nama);
}

// Fungsi untuk mengambil data siswa dari localStorage
function getStudentData() {
    const nis = localStorage.getItem('nis');
    const nama = localStorage.getItem('nama');
    return { nis, nama };
}

// Fungsi untuk menghapus data siswa dari localStorage (jika diperlukan)
function clearStudentData() {
    localStorage.removeItem('nis');
    localStorage.removeItem('nama');
}

// Event Listener untuk Halaman Login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const nis = document.getElementById('nis').value.trim();
        const nama = document.getElementById('nama').value.trim();
        
        // Validasi sederhana: memastikan NIS dan Nama diisi
        if (nis === '' || nama === '') {
            document.getElementById('loginError').innerText = 'Silakan isi semua bidang.';
        } else {
            // Simpan data siswa dan arahkan ke halaman ujian
            saveStudentData(nis, nama);
            window.location.href = 'quiz.html';
        }
    });
}

// Menampilkan informasi siswa di Halaman Ujian
if (document.getElementById('studentInfo')) {
    const { nis, nama } = getStudentData();
    if (nis && nama) {
        document.getElementById('studentInfo').innerText = `Nama: ${nama} | NIS: ${nis}`;
    } else {
        // Jika data siswa tidak ada, kembali ke halaman login
        alert('Silakan login terlebih dahulu.');
        window.location.href = 'index.html';
    }
}

// Event Listener untuk Halaman Ujian
if (document.getElementById('quizForm')) {
    document.getElementById('quizForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var totalQuestions = 2; // Update sesuai jumlah soal
        var correctAnswers = 0;

        // Mengambil jawaban yang dipilih
        var q1 = document.querySelector('input[name="q1"]:checked');
        var q2 = document.querySelector('input[name="q2"]:checked');
        
        // Tambahkan variabel untuk soal tambahan jika ada

        // Mengecek apakah jawaban benar
        if (q1 && q1.value === "benar") {
            correctAnswers++;
        }
        if (q2 && q2.value === "benar") {
            correctAnswers++;
        }
        // Tambahkan pengecekan untuk soal tambahan jika ada

        // Menampilkan hasil
        var resultText = `Anda menjawab ${correctAnswers} dari ${totalQuestions} soal dengan benar.`;
        document.getElementById("result").innerText = resultText;
        
        // Opsional: Menonaktifkan form setelah submit
        document.getElementById('quizForm').querySelectorAll('input').forEach(input => {
            input.disabled = true;
        });
        document.querySelector('button[type="submit"]').disabled = true;
    });
}
function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide the link
    downloadLink.style.display = "none";

    // Add the link to the DOM
    document.body.appendChild(downloadLink);

    // Click the link
    downloadLink.click();
}

function exportAnswersToCSV() {
    const { nis, nama } = getStudentData();
    let csv = "NIS,Nama,Soal,Jawaban\n";

    // Contoh untuk dua soal
    const q1 = document.querySelector('input[name="q1"]:checked') ? document.querySelector('input[name="q1"]:checked').value : "Tidak Dijawab";
    const q2 = document.querySelector('input[name="q2"]:checked') ? document.querySelector('input[name="q2"]:checked').value : "Tidak Dijawab";

    // Tambahkan data ke CSV
    csv += `${nis},${nama},Soal 1,${q1}\n`;
    csv += `${nis},${nama},Soal 2,${q2}\n`;

    // Jika ada soal tambahan, tambahkan di sini
    
    // Download CSV
    downloadCSV(csv, `jawaban_${nis}.csv`);
}

// Event Listener untuk Halaman Ujian
if (document.getElementById('quizForm')) {
    document.getElementById('quizForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var totalQuestions = 2; // Update sesuai jumlah soal
        var correctAnswers = 0;

        // Mengambil jawaban yang dipilih
        var q1 = document.querySelector('input[name="q1"]:checked');
        var q2 = document.querySelector('input[name="q2"]:checked');
        
        // Tambahkan variabel untuk soal tambahan jika ada

        // Mengecek apakah jawaban benar
        if (q1 && q1.value === "benar") {
            correctAnswers++;
        }
        if (q2 && q2.value === "benar") {
            correctAnswers++;
        }
        // Tambahkan pengecekan untuk soal tambahan jika ada

        // Menampilkan hasil
        var resultText = `Anda menjawab ${correctAnswers} dari ${totalQuestions} soal dengan benar.`;
        document.getElementById("result").innerText = resultText;
        
        // Simpan jawaban siswa ke file CSV
        exportAnswersToCSV();

        // Opsional: Menonaktifkan form setelah submit
        document.getElementById('quizForm').querySelectorAll('input').forEach(input => {
            input.disabled = true;
        });
        document.querySelector('button[type="submit"]').disabled = true;
    });
}
