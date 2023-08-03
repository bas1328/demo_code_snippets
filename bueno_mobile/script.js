"use strict";

const logo = document.querySelector(".logo");
const textCollect = document.querySelector(".text-collect");
const textEnjoy = document.querySelector(".text-enjoy");
const chocos = document.querySelector(".chocos");
const finger = document.querySelector(".finger");
const waffles = document.querySelector(".waffles");
const hazelnut = document.querySelector(".hazelnut");
const chocolate = document.querySelector(".chocolate");
const chocolateBar = document.querySelector(".bueno");
const ctaButton = document.querySelector(".button");
const ingredients = Array.from(document.querySelectorAll(".ingredient"));
let pickedIngredient = 0;
let eventSent = false;

function wait(sec) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });
}

function initialAppearance() {
  wait(0.1)
    .then(() => {
      chocos.classList.remove("hide");
      waffles.classList.remove("hide");
      hazelnut.classList.remove("hide");
      chocolate.classList.remove("hide");
      return wait(0.4);
    })
    .then(() => {
      chocolateBar.classList.remove("hide");
      logo.classList.remove("hide");
      return wait(0.4);
    })
    .then(() => {
      textCollect.classList.remove("hide");
      return wait(0.6);
    })
    .then(() => {
      finger.classList.remove("hide");
      finger.classList.add("blink");
    });
}

function initAnimation() {
  wait(0.4)
    .then(() => {
      chocolateBar.classList.add("BuenoFinalAnimation");
      return wait(0.4);
    })
    .then(() => {
      textEnjoy.classList.remove("hide");
      ctaButton.classList.remove("hide");
      return wait(0.4);
    })
    .then(() => {
      return wait(0.7);
    })
}

chocolateBar.addEventListener("dragover", function (event) {
  event.preventDefault();
});

chocolateBar.addEventListener("drop", function () {
  pickedIngredient += 1;
  chocolateBar.src = `./img/bueno${pickedIngredient}.png`;

  if (pickedIngredient >= 1) finger.classList.add("hide");
  if (pickedIngredient === 4) {
    textCollect.classList.add("fadeOutAnimation");
    initAnimation();
  }
});

ingredients.forEach((el) => {
  el.addEventListener("dragstart", function (event) {
    finger.classList.add("hide");
    setTimeout(() => event.target.classList.add("hide"), 0);
  });

  el.addEventListener("touchmove", function (e) {
    finger.classList.add("hide");
    const touchLocation = e.targetTouches[0];
    el.style.left = touchLocation.pageX - 50 + "px";
    el.style.top = touchLocation.pageY - 50 + "px";
  });

  el.addEventListener("dragend", function (event) {
    if (!eventSent) {
      new Image().src =
        "https://{tracking_domain}/DeliverySeance/SaveCustomBannerEvent1?sid={seanceid}";
      eventSent = true;
    }
    event.target.classList.remove("hold", "hide");
    if (event.dataTransfer.dropEffect !== "none") {
      event.target.classList.add("hide");
    }
  });

  el.addEventListener("touchend", function (e) {
    if (!eventSent) {
      new Image().src =
        "https://{tracking_domain}/DeliverySeance/SaveCustomBannerEvent1?sid={seanceid}";
      eventSent = true;
    }
    const dropZonePosition = chocolateBar.getBoundingClientRect();
    const elPosition = el.getBoundingClientRect();

    // check collision
    if (
      dropZonePosition.left < elPosition.left + elPosition.width &&
      dropZonePosition.left + dropZonePosition.width > elPosition.left &&
      dropZonePosition.top < elPosition.top + elPosition.height &&
      dropZonePosition.height + dropZonePosition.top > elPosition.top
    ) {
      el.classList.add("hide");

      pickedIngredient += 1;
      chocolateBar.src = `https://gallery.hybrid.ai/examples/bueno-images/bueno${pickedIngredient}.png`;

      if (pickedIngredient > 0) finger.classList.add("hide");
      if (pickedIngredient === 4) {
        textCollect.classList.add("fadeOutAnimation");
        initAnimation();
      }
    }
  });
});

// send custom events
ctaButton.addEventListener("click", function () {
  new Image().src =
    "https://{tracking_domain}/DeliverySeance/SaveCustomBannerEvent2?sid={seanceid}";
  // uncomment the next line for mraid init (mraid sript needed)
  // mraid.open("");
});

window.addEventListener("load", initialAppearance);
