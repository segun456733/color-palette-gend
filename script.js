document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const colorBlocks = document.querySelectorAll(".color");
    const body = document.body;
    const alertDiv = document.querySelector(".alert-div p");

    // Generate random hex color
    function getRandomHex() {
        const hex = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += hex[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Show alert
    function showAlert(message) {
        alertDiv.textContent = message;
        alertDiv.parentElement.style.display = "block";
        setTimeout(() => {
            alertDiv.parentElement.style.display = "none";
        }, 50000);
    }

    // Generate colors
    function generatePalette() {
        const newColors = [];

        colorBlocks.forEach(block => {
            const randomColor = getRandomHex();
            const colorImg = block.querySelector(".color-img");
            const colorText = block.querySelector(".color-text");
            const copyBtn = block.querySelector(".copy");
            const colorPicker = block.querySelector('input[type="color"]');

            colorImg.style.backgroundColor = randomColor;
            colorText.textContent = randomColor;
            copyBtn.textContent = "Copy";
            colorPicker.value = randomColor;

            newColors.push(randomColor);
        });

        body.style.background = `linear-gradient(to right, ${newColors.join(",")})`;
    }

    // Copy color to clipboard
    function handleCopyClick(e) {
        if (!e.target.classList.contains("copy")) return;

        const button = e.target;
        const colorBlock = button.closest(".color");
        const colorCode = colorBlock.querySelector(".color-text").textContent;

        navigator.clipboard.writeText(colorCode)
            .then(() => {
                button.textContent = "Copied";
                showAlert(`${colorCode} copied to your clipboard`);

                setTimeout(() => {
                    button.textContent = "Copy";
                }, 1500);
            })
            .catch(() => {
                showAlert("Failed to copy");
            });
    }

    // Live update on color picker input
    function handleColorPickerChange(e) {
        const picker = e.target;
        const newColor = picker.value;
        const colorBlock = picker.closest(".color");
        const colorImg = colorBlock.querySelector(".color-img");
        const colorText = colorBlock.querySelector(".color-text");

        colorImg.style.backgroundColor = newColor;
        colorText.textContent = newColor;
    }

    // Event listeners
    generateBtn.addEventListener("click", generatePalette);
    window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            e.preventDefault();
            generatePalette();
        }
    });
    document.addEventListener("click", handleCopyClick);
    document.addEventListener("input", (e) => {
        if (e.target.matches('input[type="color"]')) {
            handleColorPickerChange(e);
        }
    });

    // Initial load
    generatePalette();
});
