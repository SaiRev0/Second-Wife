document.getElementById("subBtn").addEventListener("click", save_address);

function save_address() {
  address = document.getElementById("address").value;
  sessionStorage.setItem("address", address);
}
