/* Card Identifier */
const primaryCard = document.querySelector(".primary-card");
const projectCard = document.getElementById("project-card-id");
const aboutMeCard = document.getElementById("about-me-card-id");
const closeButtons = document.querySelectorAll(".btn-close");

/* Primary Card Animation*/

primaryCard.classList.add("animated", "fadeIn");
projectCard.classList.add("animated", "fadeIn");
aboutMeCard.classList.add("animated", "fadeIn");

function onClickSlideOut(section) {
	isSlidingIn = true;
	isSlidingOut = false;

	//Check screen size
	const width = Math.max(
		document.documentElement.clientWidth,
		window.innerWidth || 0
	);
	if (width > 700) {
		anime({
			targets: ".primary-card",
			translateX: [0, -340],
			duration: 1000,
			delay: 100,
			begin: function onBegin() {
				switch (section) {
					case "projects":
						// fadeOutCard(projectCard);
						displayCard(projectCard);
						break;
					case "about-me":
						// fadeOutCard(aboutMeCard);
						displayCard(aboutMeCard);
						break;
					default:
						break;
				}
			}
		});
	} else {
		// hideCard(primaryCard);
		resetPrimaryCardAndShow();
		switch (section) {
			case "projects":
				// fadeOutCard(projectCard);
				displayCard(projectCard);
				break;
			case "about-me":
				// fadeOutCard(aboutMeCard);
				displayCard(aboutMeCard);
				break;
			default:
				break;
		}
	}
}

function onClickSlideIn() {
	isSlidingIn = false;
	isSlidingOut = true;
	previousSection = "";
	isSlide = true;
	//Check screen size
	const width = Math.max(
		document.documentElement.clientWidth,
		window.innerWidth || 0
	);
	if (width > 700) {
		anime({
			targets: ".primary-card",
			translateX: [-340, 0],
			duration: 1000,
			delay: 100,
			begin: function onBegin() {
				hideCard(projectCard);
				hideCard(aboutMeCard);
			}
		});
	} else {
		hideCard(projectCard);
		hideCard(aboutMeCard);
		// displayCard(primaryCard);
		resetPrimaryCardAndNoShow();
	}
}

/* Display Card */
function displayCard(card) {
	card.classList.remove("hidden");
	card.classList.add("show");
}

/* Fade out card */
function fadeOutCard(card) {
	card.classList.add("fade-out-card");
}

/* Hide Card */
function hideCard(card) {
	card.classList.remove("show");
	card.classList.add("hidden");
}

/* Reset primary card */
function resetPrimaryCardAndShow() {
	primaryCard.classList.add("show");
	//primaryCard.remove("primary-card");
}
function resetPrimaryCardAndNoShow() {
	primaryCard.classList.remove("show");
	//primaryCard.remove("primary-card");
}
/** Animate */
var isSlidingOut = true;
var isSlidingIn = false;
var isSlide = true;

var previousSection = "";

function handleOnClick(section) {
	// If click on the same previous section, isSlide will be true
	if (section === previousSection || previousSection.length === 0) {
		isSlide = true;
	} else {
		isSlide = false;
	}

	if (isSlidingOut) {
		onClickSlideOut(section);
	} else if (isSlidingIn && isSlide) {
		onClickSlideIn();
	} else if (isSlidingIn && !isSlide) {
		switch (section) {
			case "projects":
				displayCard(projectCard);
				hideCard(aboutMeCard);
				break;
			case "about-me":
				displayCard(aboutMeCard);
				hideCard(projectCard);
				break;
			default:
				break;
		}
	}
	previousSection = section;
}

// Handle close click

closeButtons.forEach(function(button) {
	button.addEventListener("click", function() {
		onClickSlideIn();
	});
});
