// REMOVE ALL OLD CONTACT FETCH CODE

const params = new URLSearchParams(window.location.search);
const msg = document.getElementById("successMsg");

if (params.get("success") === "true") {
  msg.textContent = "Message sent successfully.";
}
