/* Primary Card Animation*/

function fadeInPrimaryCard(className) {
	const primaryCard = document.querySelector(".primary-card");
	primaryCard.classList.add("animated", "fadeIn");
}

fadeInPrimaryCard(".primary-card");

/** Animate */
var isSlidingOut = true;
var isSlidingIn = false;
var isSlide = true;

var previousSection = "";

function onClickSlideOut(section) {
	console.log(section);
	anime({
		targets: ".primary-card",
		translateX: [0, -340],
		duration: 1000,
		delay: 100,
		//easing: "easeInOutSine"
		begin: function onBegin() {
			displayComponent("secondary-card");
			switch (section) {
				case "projects":
					displayComponent("project-card");
					break;
				case "about-me":
					displayComponent("about-me-card");
					break;
				default:
					break;
			}
		},
		complete: function onComplete() {
			isSlidingIn = true;
			isSlidingOut = false;
		}
	});
}

function onClickSlideIn(section) {
	anime({
		targets: ".primary-card",
		translateX: [-340, 0],
		duration: 1000,
		delay: 100,
		begin: function onBegin() {
			hideComponent("secondary-card");
			switch (section) {
				case "projects":
					hideComponent("project-card");
					break;
				case "about-me":
					hideComponent("about-me-card");
					break;
				default:
					break;
			}
		},
		complete: function onComplete() {
			isSlidingIn = false;
			isSlidingOut = true;
			previousSection = "";
			isSlide = true;
		}
	});
}

/* Display components */
function displayComponent(className) {
	console.log(className);
	var components = document.querySelectorAll(
		"[class=" + CSS.escape(className) + "]"
	);
	components.forEach(component => {
		if (component != null) {
			component.style.display = "block";
			console.log("display " + className);
		} else {
			console.log("Not find " + className);
		}
	});
}

/* Hide components */
function hideComponent(className) {
	console.log(className);
	var components = document.querySelectorAll(
		"[class=" + CSS.escape(className) + "]"
	);
	components.forEach(component => {
		if (component != null) {
			component.style.display = "none";
			console.log("Hide " + className);
		} else {
			console.log("Not find " + className);
		}
	});
}

function handleOnClick(section) {
	// If click on the same previous section, isSlide will be true
	if (section === previousSection || previousSection.length === 0) {
		isSlide = true;
	} else {
		isSlide = false;
	}

	switch (section) {
		case "projects":
			if (isSlidingOut && isSlide) {
				onClickSlideOut(section);
				isSlidingOut = false;
				isSlidingIn = true;
			} else if (isSlidingIn && isSlide) {
				onClickSlideIn(section);
				isSlidingIn = false;
				isSlidingOut = true;
			} else {
				displayComponent("project-card");
				hideComponent("about-me-card");
			}
			break;
		case "about-me":
			if (isSlidingOut && isSlide) {
				onClickSlideOut(section);
				isSlidingOut = false;
				isSlidingIn = true;
			} else if (isSlidingIn && isSlide) {
				onClickSlideIn(section);
				isSlidingIn = false;
				isSlidingOut = true;
			} else {
				displayComponent("about-me-card");
				hideComponent("project-card");
			}
			break;
		default:
			break;
	}
	previousSection = section;
}
