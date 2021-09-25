let priceRange = document.getElementById("range");
let thumb = document.getElementById("selector");
let sliderTrack = document.getElementsByClassName("slider-track")[0];
let check = document.getElementById("check");
let trailBtn = document.getElementById("trail");
let modal = document.getElementsByClassName("modal-form")[0];
let sliderImage = document.getElementsByClassName("thumb")[0];
let closeBtn = document.getElementsByClassName("close")[0];
let submitBtn = document.getElementsByClassName("btnForm")[0];

let yearly = false;
let lastSliderValue = 0;

priceRange.addEventListener("change", changeValue);

function changeValue() {
  console.log(this.value);
  this.value = this.value || lastSliderValue;

  lastSliderValue = this.value;

  thumb.style.left = this.value + "%";

  sliderTrack.style.width = this.value + "%";

  let [traffic, rate] = getMonthlyPrice(this.value);

  if (yearly) {
    rate = getYearlyPrice(rate);
  }

  document.getElementById("views").innerHTML = traffic;
  document.getElementById("price").innerHTML = rate;
}

check.addEventListener("change", calculateYearlyPrice);

function calculateYearlyPrice() {
  // console.log(check.checked);
  let discountText = document.getElementById("discount");
  if (!check.checked) {
    discountText.style.display = "none";
    document.getElementById("subtext").innerHTML = "/month";
  }
  yearly = check.checked;
  changeValue();
}

const getMonthlyPrice = (value) => {
  if (value == 0 || value <= 24) {
    return ["10k", 8];
  } else if (value == 25 || value <= 49) {
    return ["50k", 12];
  } else if (value == 50 || value <= 74) {
    return ["100k", 16];
  } else if (value == 75 || value <= 99) {
    return ["500k", 24];
  } else if (value == 100) {
    return ["1M", 36];
  }
};

const getYearlyPrice = (price) => {
  let discountText = document.getElementById("discount");

  let yearlyPrice = price * 12;

  let discount = (yearlyPrice / 100) * 25;

  let discountedPrice = yearlyPrice - discount;

  document.getElementById("price").innerHTML = discountedPrice;
  document.getElementById("subtext").innerHTML = "/year";

  discountText.style.display = "flex";
  return discountedPrice;
};

trailBtn.addEventListener("click", startTrail);

function startTrail() {
  modal.style.display = "block";
  sliderImage.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none";
  sliderImage.style.display = "block";
}

window.addEventListener("click", outsideClick);

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
    sliderImage.style.display = "block";
  }
}

submitBtn.addEventListener("click", submitForm);

let full_name = document.getElementById("fname");
let company_name = document.getElementById("company");
let email = document.getElementById("emailAddress");
let phone_number = document.getElementById("phone");
function submitForm(e) {
  e.preventDefault();
  let full_nameValue = document.getElementById("fname").value;
  let company_nameValue = document.getElementById("company").value;
  let emailValue = document.getElementById("emailAddress").value;
  let phone_numberValue = document.getElementById("phone").value;

  if (
    full_nameValue == "" ||
    company_nameValue == "" ||
    emailValue == "" ||
    phone_numberValue == ""
  ) {
    alertify.alert("Please, fill all fields to continue");
    return;
  } else {
    alertify.alert("A link has been sent to your mail");
  }

  full_name.value = "";
  company_name.value = "";
  email.value = "";
  phone_number.value = "";

  closeModal();
}
