// Fungsi untuk membuka database IndexedDB
function bukaDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("KomentarDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore("komentar", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("komentar", "komentar", { unique: false });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject("Error saat membuka database: " + event.target.errorCode);
    };
  });
}

// Fungsi untuk menyimpan komentar ke IndexedDB
function simpanKomentar(komentar) {
  bukaDatabase()
    .then((db) => {
      const transaction = db.transaction(["komentar"], "readwrite");
      const objectStore = transaction.objectStore("komentar");
      const request = objectStore.add({ komentar: komentar });

      request.onsuccess = () => {
        console.log("Komentar berhasil disimpan ke IndexedDB");
      };

      request.onerror = () => {
        console.error("Error saat menyimpan komentar ke IndexedDB");
      };
    })
    .catch((error) => {
      console.error(error);
    });
}

// Fungsi untuk menangani formulir komentar
function handleFormSubmit() {
  const komentar = document.getElementById("komentar").value;
  simpanKomentar(komentar);
  // Tambahkan logika lainnya atau pindahkan pengalihan halaman di sini
}
