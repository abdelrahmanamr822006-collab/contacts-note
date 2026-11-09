let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// buttons
let addBtn = document.querySelector("nav button");
let form = document.getElementById("form");
let closeBtn = document.querySelector(".fa-xmark");
let cancelBtn = document.querySelector(".btn-c");
let saveBtn = document.querySelector(".btn-s");

// containers
let container = document.querySelector(".home .LHS");
let favList = document.querySelector(".fav-list");

// inputs
let inputName = document.getElementById("inputName");
let inputPhone = document.getElementById("inputPhone");
let inputEmail = document.getElementById("inputEmail");
let inputAddress = document.getElementById("inputAddress");
let group = document.querySelector("select");
let fav = document.getElementById("fav");
let emg = document.getElementById("emg");
let note = document.getElementById("note");

// OPEN FORM
addBtn.onclick = () => {
  form.classList.remove("d-none");
};

//  CLOSE FORM
function closeForm() {
  form.classList.add("d-none");
}

closeBtn.onclick = closeForm;
cancelBtn.onclick = closeForm;

//  SAVE CONTACT
saveBtn.onclick = (e) => {
  e.preventDefault();

  if (!inputName.value || !inputPhone.value) {
    alert("Please fill required fields");
    return;
  }

  let contact = {
    name: inputName.value,
    phone: inputPhone.value,
    email: inputEmail.value,
    address: inputAddress.value,
    group: group.value,
    fav: fav.checked,
    emg: emg.checked,
    note: note.value,
  };

  contacts.push(contact);

  localStorage.setItem("contacts", JSON.stringify(contacts));

  clearForm();
  displayContacts();
  displayFavs();
  updateStats();
  displayEmergency();
  closeForm();
};

//  SEARCH CONTACTS
function searchContacts() {
  let query = document.getElementById("searchInput").value.toLowerCase();
  let cartona = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name.toLowerCase().includes(query)) {
      cartona += `
<div class="w-50 mb-2">
  <div class="card-1 p-3 h-100">

    <div class="d-flex align-items-center gap-3 mb-3">
      <div class="avatar">${contacts[i].name.charAt(0)}</div>

      <div>
        <span class="fw-normal d-block mb-1">${contacts[i].name}</span>

        <div class="d-flex align-items-center gap-2">
          <i class="fa-solid fa-phone"></i>
          <span>${contacts[i].phone}</span>
        </div>
      </div>
    </div>

    <div class="d-flex align-items-center gap-2 mb-2 email">
      <i class="fa-solid fa-envelope"></i>
      <p class="mb-0">${contacts[i].email}</p>
    </div>

    <div class="d-flex align-items-center gap-2 mb-2 location">
      <i class="fa-solid fa-location-dot"></i>
      <p class="mb-0">${contacts[i].address}</p>
    </div>

    <div class="d-flex gap-3 mb-3">
      <span id="group">${contacts[i].group}</span>
      <span class="badge bg-secondary">${contacts[i].note}</span>

    </div>

    <div class="d-flex justify-content-between align-items-center footer mt-auto">

      <div class="icons d-flex gap-3">
        <i class="fa-solid fa-phone"></i>
        <i class="fa-solid fa-envelope"></i>
      </div>

      <div class="icons d-flex gap-3">
        <i class="fa-regular fa-star ${contacts[i].fav ? "text-warning" : ""}" onclick="toggleFav(${i})"></i>
      <i class="fa-solid fa-heart-pulse ${contacts[i].emg ? "text-danger" : ""}" onclick="toggleEmg(${i})"></i>
         <i class="fa-solid fa-trash-can" onclick="deleteContact(${i})"></i>
      </div>

    </div>

  </div>
</div>
      `;
    }
  }
  container.innerHTML = cartona || `<h3 class="text-center">No contacts found</h3>`;
 }

//  DISPLAY CONTACTS
function displayContacts(query = "") {
  let cartona = "";

  contacts.forEach((c, index) => {
    if (c.name.toLowerCase().includes(query.toLowerCase())) {
      cartona += `
<div class="w-50 mb-2">
  <div class="card-1 p-3 h-100">

    <div class="d-flex align-items-center gap-3 mb-3">
      <div class="avatar">${c.name.charAt(0)}</div>

      <div>
        <span class="fw-normal d-block mb-1">${c.name}</span>

        <div class="d-flex align-items-center gap-2">
          <i class="fa-solid fa-phone"></i>
          <span>${c.phone}</span>
        </div>
      </div>
    </div>

    <div class="d-flex align-items-center gap-2 mb-2 email">
      <i class="fa-solid fa-envelope"></i>
      <p class="mb-0">${c.email}</p>
    </div>

    <div class="d-flex align-items-center gap-2 mb-2 location">
      <i class="fa-solid fa-location-dot"></i>
      <p class="mb-0">${c.address}</p>
    </div>

    <div class="d-flex gap-3 mb-3">
      <span id="group">${c.group}</span>
      <span class="badge bg-secondary">${c.note}</span>

    </div>

    <div class="d-flex justify-content-between align-items-center footer mt-auto">

      <div class="icons d-flex gap-3">
        <i class="fa-solid fa-phone"></i>
        <i class="fa-solid fa-envelope"></i>
      </div>

      <div class="icons d-flex gap-3">
        <i class="fa-regular fa-star ${c.fav ? "text-warning" : ""}" onclick="toggleFav(${index})"></i>
      <i class="fa-solid fa-heart-pulse ${c.emg ? "text-danger" : ""}" onclick="toggleEmg(${index})"></i>
         <i class="fa-solid fa-trash-can" onclick="deleteContact(${index })"></i>
      </div>

    </div>

  </div>
</div>
      `;
    }
  });

  container.innerHTML = cartona || `<h3>No results</h3>`;
}

//dispalay emergency contacts in red and with heart icon
function displayEmergency() {
  let emgContacts = contacts.filter((c) => c.emg);

  let emgList = document.querySelector(".emg-list");

  if (emgContacts.length === 0) {
    emgList.innerHTML = `
      <div class="empty">
        No emergency contacts
      </div>
    `;
    return;
  }

  emgList.innerHTML = emgContacts
    .map(
      (c) => `
      <div class="d-flex align-items-center gap-3 mb-2">
        <div class="avatar3">${c.name?.charAt(0) || ""}</div>

        <div>
          <span class="fw-normal d-block mb-1">${c.name}</span>
          <div class="d-flex align-items-center gap-2">
            <i class="fa-solid fa-phone"></i>
            <span>${c.phone}</span>
          </div>
        </div>
      </div>
    `,
    )
    .join("");
}

//  DISPLAY FAVS
function displayFavs() {
  let favContacts = contacts.filter((c) => c.fav);

  if (favContacts.length === 0) {
    favList.innerHTML = `
      <div class="empty">
        No favorites yet
      </div>
    `;
    return;
  }

  favList.innerHTML = favContacts
    .map(
      (c) => `
    <div class="d-flex align-items-center gap-3 mb-2">
      <div class="avatar2">${c.name?.charAt(0) || ""}</div>
      <div>
        <span class="fw-normal d-block mb-1">${c.name}</span>
        <div class="d-flex align-items-center gap-2">
          <i class="fa-solid fa-phone"></i>
          <span>${c.phone}</span>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

//  TOGGLE FAVORITE
function toggleFav(index) {
  contacts[index].fav = !contacts[index].fav;

  localStorage.setItem("contacts", JSON.stringify(contacts));

  displayContacts();
  displayFavs();
  updateStats();
}
//  TOGGLE EMERGENCY

function toggleEmg(index) {
  contacts[index].emg = !contacts[index].emg;

  localStorage.setItem("contacts", JSON.stringify(contacts));

  displayContacts();
  displayEmergency();
  updateStats();
}
//  DELETE
function deleteContact(index) {
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  displayContacts();
  displayFavs();
  displayEmergency(); 
  updateStats();
}

//  CLEAR FORM
function clearForm() {
  inputName.value = "";
  inputPhone.value = "";
  inputEmail.value = "";
  inputAddress.value = "";
  group.value = "select";
  fav.checked = false;
  emg.checked = false;
  note.value = "";
}

//update  STATS
function updateStats() {
  document.getElementById("total").innerText = contacts.length;

  document.getElementById("favcount").innerText = contacts.filter(
    (c) => c.fav,
  ).length;

  document.getElementById("emccount").innerText = contacts.filter(
    (c) => c.emg,
  ).length;
}

//  INIT
function init() {
  displayContacts();
  displayFavs();
  displayEmergency();
  updateStats();
}
init();
