// script.js
document.addEventListener('DOMContentLoaded', function() {
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');
    const colorDisplay = document.getElementById('colorDisplay');
    const colorCode = document.getElementById('colorCode');

    function updateColor() {
        const red = redSlider.value;
        const green = greenSlider.value;
        const blue = blueSlider.value;
        const rgbColor = `rgb(${red}, ${green}, ${blue})`;

        colorDisplay.style.backgroundColor = rgbColor;
        colorCode.textContent = `RGB: ${red}, ${green}, ${blue}`;
    }

    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);
});