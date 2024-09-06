const productItemsList = document.getElementById("productItemsList");

let storedData = JSON.parse(localStorage.getItem("data")) || [];

if (storedData.length) {
  storedData.forEach((item, index) => {
    const cartRow = `<tr>
        <td scope="row">
          <div class="d-flex align-items-center">
            <img
              src="${item.cover}"
              class="img-fluid rounded-3"
              style="width: 120px"
              alt="Book"
            />
            <div class="flex-column ms-4">
              <p class="mb-2 d-none d-sm-inline-block">${item.name}</p>
            </div>
          </div>
        </td>
        <td class="align-middle">
        <button class="add-btn btn border-0 ms-4 mt-1 btn-outline-danger btn-sm" data-mdb-toggle="tooltip"
        title="Duplicate item">
        <i class="bi bi-plus-lg"></i>
        </button>
      </td>
        <td class="align-middle">
        <strike class="text-secondary">${item.lastprice || ""}</strike>
        <p class="mb-0" style="font-weight: 500">$${item.price}</p>
          </td>
          <td class="align-middle">
          <button class="remove-btn btn ms-4 mt-1 btn-outline-danger btn-sm" data-mdb-toggle="tooltip"
          title="Remove item">
          <i class="bi bi-trash"></i>
        <div class="d-none">${item.value}</div>
          </button>
        </td>
        </tr>
        `;

    productItemsList.innerHTML += cartRow;

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemValue = button.closest('tr').querySelector('.d-none').innerText;
        const filteredData = storedData.filter((data) => data.value !== itemValue);
        localStorage.setItem("data", JSON.stringify(filteredData));
        location.reload();
      });
    });

    const addButtons = document.querySelectorAll(".add-btn");
    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        let newItem = {
          cover: button.closest('tr').querySelector('img').src,
          name: button.closest('tr').querySelector('p').innerText,
          price: button.closest('tr').querySelector('p').innerText.slice(1),
          value: Math.random() * 10e60,
          lastprice: button.closest('tr').querySelector('strike').innerText || "",
        };
        storedData.push(newItem);
        localStorage.setItem("data", JSON.stringify(storedData));
        location.reload();
      });
    });
  });
}

// proceed to pay modal section

const modalBody = document.querySelector(".modal-body");
let totalCost = 0;

storedData.forEach((item) => {
  const productDetail = `<div class="d-flex justify-content-between align-items-center py-3 pe-4">
  <div class="">
    <div class="d-flex align-items-center">
      <img
        src="${item.cover}"
        class="img-fluid rounded-3"
        style="width: 120px"
        alt="Book"
      />
      <div class="flex-column ms-4">
        <p class="mb-2 d-none d-sm-inline fs-10">${item.name}</p>
      </div>
    </div>
  </div>
  <div class="align-middle">
  </div>
  <div class="align-middle">
  <strike class="text-secondary">${item.lastprice || ""}</strike>
  <p class="mb-0" style="font-weight: 500">$${item.price}</p>
    </div>
    </div>`;
  modalBody.innerHTML += productDetail;
  totalCost += Math.round(Number(item.price) * 100) / 100;
});

const modalBody2 = document.querySelector(".modal-body-2");

function updateModalBody2() {
  totalCost = Math.round(totalCost * 100) / 100;
  const discountSection = ` <div class="mb-5">
<div class="form-floating">
  <input type="number" class="form-control border border-danger border-opacity-25" id="discountInput" placeholder="v">
  <label class="form-label" for="discountInput">Enter your discount code (1-70)</label>
</div>
</div>
<div class="d-flex justify-content-between">
<h5 class="text-uppercase">Total price : </h5>
<h5>$${totalCost}</h5>
</div>`;

  modalBody2.innerHTML = discountSection;
}

updateModalBody2();

// discount code process

const discountInput = document.querySelector("#discountInput");

discountInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const discountValue = discountInput.value;
    if (discountValue <= 70 && discountValue >= 1) {
      setTimeout(() => {
        totalCost -= (totalCost * discountValue) / 100;
        updateModalBody2();
      }, 500);
    }
  }
});
