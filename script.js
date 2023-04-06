"use strict";

// Import images
import starIcon from "url:./images/icon-star.svg";
import illustrationIcon from "url:./images/illustration-thank-you.svg";

// Select parent element
const parentElement = document.querySelector(".main-contents");

let ratingNums = document.querySelector(".rating-numbers");
let eachRating = document.querySelectorAll(".rating-number");

// Initialize selectedNum to null
let selectedNum = null;

// Add event listener to parent element
parentElement.addEventListener("click", function (e) {
  // Get submit and back arrow buttons
  const submitBtn = e.target.closest(".btn-submit");
  const backArrow = e.target.closest(".back-arrow");

  // If neither button is clicked, exit function
  if (!submitBtn && !backArrow) return;

  // If back arrow is clicked, return to rating state
  if (backArrow) {
    ratingState();
    ratingSelection();
  }

  // If submit button is clicked and a rating is selected, enter thanking state
  if (submitBtn) {
    e.preventDefault();
    if (selectedNum === null) return;
    thankingState();
    selectedNum = null;
  }
});

// Define thanking state function
const thankingState = function () {
  const markup = `
    <div class="thanking-state">
      <span class="back-arrow">◄</span>
      <img
        class="thanking-state__illustration"
        src="${illustrationIcon}"
        alt="Thank you illustration"
      />

      <p class="thanking-state__rating-output">You selected ${selectedNum} out of 5</p>

      <h1 class="thanking-state__header">Thank you!</h1>
      <p class="thanking-state__description">
        We appreciate you taking the time to give a rating. If you ever need
        more support, don’t hesitate to get in touch!
      </p>
    </div>
  `;

  // Fade out parent element and replace contents with thanking state markup
  parentElement.style.opacity = "0";

  setTimeout(() => {
    parentElement.innerHTML = markup;
    parentElement.style.opacity = "1";
    ratingSelection();
  }, 200);
};

// Define rating state function
const ratingState = function () {
  // Remove the existing event listener for 'click' on ratingNums
  if (ratingNums) {
    ratingNums.removeEventListener("click", ratingSelection);
  }

  // Create markup for rating state
  const markup = `
    <div class="rating-state">
      <div class="rating-state__icon-star">
        <img src="${starIcon}" alt="Star icon" />
      </div>

      <h1 class="rating-state__header">How did we do?</h1>
      <p class="rating-state__description">
        Please let us know how we did with your support request. All
        feedback is appreciated to help us improve our offering!
      </p>

      <form action="">
        <ul class="rating-numbers">
          <li class="rating-number" data-ratingValue="1">1</li>
          <li class="rating-number" data-ratingValue="2">2</li>
          <li class="rating-number" data-ratingValue="3">3</li>
          <li class="rating-number" data-ratingValue="4">4</li>
          <li class="rating-number" data-ratingValue="5">5</li>
        </ul>

        <button class="btn-submit" type="submit">Submit</button>
      </form>
    </div>
  `;

  // Fade out parent element and update inner HTML
  parentElement.style.opacity = "0";

  setTimeout(() => {
    parentElement.innerHTML = markup;
    parentElement.style.opacity = "1";

    ratingNums = document.querySelector(".rating-numbers");
    ratingSelection();
    eachRating = document.querySelectorAll(".rating-number");
  }, 200);
};

/**
 * Updates the rating selection when a user clicks on a rating number.
 * Sets the selected number to the data-ratingvalue attribute of the clicked element
 */
const ratingSelection = function () {
  // If ratingNums or eachRating is null, return early
  if (!ratingNums || !eachRating) return;

  // Add a 'click' event listener to ratingNums
  ratingNums.addEventListener("click", function (e) {
    // Find the closest '.rating-number' element to the clicked target
    const el = e.target.closest(".rating-number");
    // If no element was found, return early
    if (!el) return;

    // Remove the 'active' class from all rating numbers
    eachRating.forEach((entry) => entry.classList.remove("active"));
    // Add the 'active' class to the clicked rating number
    el.classList.add("active");
    // Set the selected number to the value of the data-ratingvalue attribute of the clicked rating number
    selectedNum = Number(el.dataset.ratingvalue);
  });
};

// Call the function to set up the initial rating selection
ratingSelection();
