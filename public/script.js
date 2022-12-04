let i = 1;
window.addEventListener("gamepadconnected", (e) => {
	let gp = navigator.getGamepads()[e.gamepad.index];
	console.log("A " + gp.id + " was successfully detected! There are a total of " + gp.buttons.length + " buttons.")

	setInterval(() => {
		// ===> Get a fresh GamepadList! <===
		let gp = navigator.getGamepads()[e.gamepad.index];

		console.log(gp);
	}, 100)
});