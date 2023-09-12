// luu tru chia khoa tam thoi
const storeKey = { public: null, private: null }

// lay cac thanh phan tren navbar
const showEncryptArea = document.querySelector("ul#nav-bar li:nth-child(1) a")
const showDecryptArea = document.querySelector("ul#nav-bar li:nth-child(2) a")

// lay cac phan element o phan tao ma van ban
const encryptArea = document.getElementById("mahoa")
const plainText = document.getElementById("document")
const buttonSubmit = document.getElementById("submit-document")
const getResultNoti = document.querySelectorAll("p.result-noti")
const inputAreaPlainText = document.getElementById("document-input")
const resultAreaPlainText = document.getElementById("result-input-document")
const resultTextEncrypt = document.getElementById("result-document")
const resultKey = document.getElementById("key")
const download = document.getElementById("download")
const downloadKey = document.getElementById("download-key")

// lay cac phan element o phan giai ma van ban
const decryptArea = document.getElementById("giaima")
const decryptAreaText = document.getElementById("decrypt")
const decryptPlainText = document.getElementById("decrypt-text")
const decryptKey = document.getElementById("decrypt-key")
const decryptButton = document.getElementById("decrypt-submit")
const decryptAreaResult = document.getElementById("decrypt-result")
const decryptPlainTextResult = document.getElementById("decrypt-text-result")
var crypt = new Crypt();
var rsa = new RSA({
  keySize: 1024,
})
// * tao ma khoa cong khai va bi mat
rsa.generateKeyPair(function (keyPair) {
  var publicKey = keyPair.publicKey;
  var privateKey = keyPair.privateKey;
  storeKey.public = publicKey
  storeKey.private = privateKey
  localStorage.setItem("keys", JSON.stringify(storeKey))
});
// * bat tat 2 trang tao ma ma giai ma
showEncryptArea.addEventListener("click", e => {
  e.preventDefault()
  decryptArea.classList.add("d-none")
  encryptArea.classList.remove("d-none")
})
showDecryptArea.addEventListener("click", e => {
  e.preventDefault()
  encryptArea.classList.add("d-none")
  decryptArea.classList.remove("d-none")
})

// * ma hoa doan van ban
buttonSubmit.addEventListener("click", (e) => {
  e.preventDefault()
  var docEncryption = plainText.value
  var encrypted = crypt.encrypt(storeKey.public, docEncryption);
  var convertEncrypted = JSON.parse(encrypted)
  if (docEncryption.length <= 0) {
    getResultNoti[0].textContent = "Hãy nhập văn bản cần mã hoá trước khi xác nhận"
  } else {
    getResultNoti[0].textContent = ""
    inputAreaPlainText.classList.add("d-none")
    resultAreaPlainText.classList.remove("d-none")
    resultTextEncrypt.value = JSON.stringify(convertEncrypted)
    resultKey.value = storeKey.private
  }
})


// * tai file doan van ban va chia khoa giai ma
download.addEventListener("click", (e) => {
  e.preventDefault()
  var textToSave = resultTextEncrypt.value
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'Doan van da giai ma.txt';
  hiddenElement.click();
})

downloadKey.addEventListener("click", (e) => {
  e.preventDefault()
  var keyToSave = resultKey.value
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:attachment/text,' + encodeURI(keyToSave);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'chia khoa.txt';
  hiddenElement.click();
})

// * giai ma doan van ban
decryptButton.addEventListener("click", e => {
  e.preventDefault()
  var docDecryption = decryptPlainText.value
  var decryptKeyValue = decryptKey.value
  if (docDecryption.length <= 0) {
    getResultNoti[1].textContent = 'Ô đoạn văn giải mã đang để trống'
  } else {
    var decrypted = crypt.decrypt(decryptKeyValue, docDecryption);
    console.log(decrypted);
    decryptAreaText.classList.add("d-none")
    decryptAreaResult.classList.remove("d-none")
    decryptPlainTextResult.value = decrypted.message
  }
})