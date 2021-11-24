const testList = document.querySelector("#test-list");
const form = document.querySelector("#add-cafe-form");

// create element & render cafe
function renderTest(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let email = document.createElement("span");
  let subject = document.createElement("span");
  let message = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  email.textContent = doc.data().email;
  subject.textContent = doc.data().subject;
  message.textContent = doc.data().message;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(email);
  li.appendChild(subject);
  li.appendChild(message);
  li.appendChild(cross);

  testList.appendChild(li);

  // deleting data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("test").doc(id).delete();
  });
}

// getting data
db.collection("test")
  .orderBy("email")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderTest(doc);
    });
  });

// saving data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("test").add({
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value,
  });
  form.name.value = "";
  form.email.value = "";
  form.subject.value = "";
  form.message.value = "";
});
