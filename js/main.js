/* Card Identifier */
const projectCard = document.getElementById("project-card-id");
const aboutMeCard = document.getElementById("about-me-card-id");

/* Primary Card Animation*/

function fadeInPrimaryCard(className) {
	const primaryCard = document.querySelector(".primary-card");
	primaryCard.classList.add("animated", "fadeIn");
}

fadeInPrimaryCard(".primary-card");

function onClickSlideOut(section) {
	isSlidingIn = true;
	isSlidingOut = false;
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
}

function onClickSlideIn() {
	isSlidingIn = false;
	isSlidingOut = true;
	previousSection = "";
	isSlide = true;

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
