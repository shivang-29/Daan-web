const donationList = document.querySelector("#donation-list");
const form = document.querySelector("#add-donation-form");

// create element & render donation
function renderDonation(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let email = document.createElement("span");
  let date = document.createElement("span");
  let address = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  email.textContent = doc.data().email;
  date.textContent = doc.data().date;
  address.textContent = doc.data().address;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(email);
  li.appendChild(date);
  li.appendChild(address);
  li.appendChild(cross);

  donationList.appendChild(li);

  // deleting data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("donation").doc(id).delete();
  });
}

// getting data
db.collection("donation")
  .orderBy("email")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderDonation(doc);
    });
  });

// saving data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("donation").add({
    name: form.name.value,
    email: form.email.value,
    date: form.date.value,
    address: form.address.value,
  });
  form.name.value = "";
  form.email.value = "";
  form.date.value = "";
  form.address.value = "";
});

// sending alert

function myDonation() {
  alert("Sent Succesful!");
}
