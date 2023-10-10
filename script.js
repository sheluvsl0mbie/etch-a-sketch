const sizeOfGrid = 16;
const resetButton = document.querySelector("button")
const container = document.querySelector(".container")

const createRandomRGB = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    return { r, g, b}
}

const createGrid = (amountOfGrids) => {
    const wrapper = document.createElement("div")
    wrapper.classList.add("wrapper")

    for (let i = 0; i < amountOfGrids; i++) {
        const row = document.createElement("div")
        row.classList.add("grid-row")

        for (let j=0; j < amountOfGrids; j++) {
            const { r, g, b} = createRandomRGB ()

            const widthAndHeight = 600 / amountOfGrids
            const gridBox = document.createElement("div")
            gridBox.classList.add("grid-box")
            gridBox.style.width = `${widthAndHeight}px`
            gridBox.style.height = `${widthAndHeight}px`

            gridBox.addEventListener("mouseenter", () => {
                gridBox.style.background = "black"
            })
            row.appendChild(gridBox)
        }

        wrapper.appendChild(row)
    }
    container.appendChild(wrapper)
}

createGrid(sizeOfGrid)

resetButton.addEventListener("click", () => {
    let userSize = Number(prompt("Size Grid?"))

    while (userSize > 100) {
        userSize = Number(prompt("Pick A Size Grid Smaller Than 100:  "))
    }

    const wrapper = document.querySelector(".wrapper")
    wrapper.remove()
    createGrid(userSize)
})

// Add this code below your existing JavaScript code

const changeColorButton = document.querySelector(".change-color");
let isChangingColor = false;

changeColorButton.addEventListener("click", () => {
    isChangingColor = !isChangingColor;

    if (isChangingColor) {
        changeColorButton.textContent = "Stop Rainbow Mode";
        startChangingColor();
    } else {
        changeColorButton.textContent = "Change Color";
        stopChangingColor();
    }
});

function startChangingColor() {
    const gridBoxes = document.querySelectorAll(".grid-box");
    
    gridBoxes.forEach((gridBox) => {
        gridBox.addEventListener("mouseenter", changeColorOnHover);
    });
}

function stopChangingColor() {
    const gridBoxes = document.querySelectorAll(".grid-box");
    
    gridBoxes.forEach((gridBox) => {
        gridBox.removeEventListener("mouseenter", changeColorOnHover);
    });
}

function changeColorOnHover() {
    const { r, g, b } = createRandomRGB();
    const bgColor = "rgb(" + r + "," + g + "," + b + ")";
    this.style.background = bgColor;
}

// Add this code below your existing JavaScript code

const addTintButton = document.querySelector(".add-tint");
let isTinting = false;

addTintButton.addEventListener("click", () => {
    isTinting = !isTinting;

    if (isTinting) {
        addTintButton.textContent = "Remove Black & White";
        addRandomTint();
    } else {
        addTintButton.textContent = "Add Black & White";
        removeTint();
    }
});

function addRandomTint() {
    const gridBoxes = document.querySelectorAll(".grid-box");
    
    gridBoxes.forEach((gridBox) => {
        gridBox.addEventListener("mouseenter", addRandomTintOnHover);
    });
}

function addRandomTintOnHover() {
    const currentColor = this.style.backgroundColor;
    if (!currentColor) return;

    const rgbValues = currentColor.match(/\d+/g);
    if (rgbValues.length !== 3) return;

    const r = Math.min(255, parseInt(rgbValues[0]) + Math.random() * 25.5);
    const g = Math.min(255, parseInt(rgbValues[1]) + Math.random() * 25.5);
    const b = Math.min(255, parseInt(rgbValues[2]) + Math.random() * 25.5);

    const tintedColor = `rgb(${r},${g},${b})`;
    this.style.backgroundColor = tintedColor;
}

function removeTint() {
    const gridBoxes = document.querySelectorAll(".grid-box");
    
    gridBoxes.forEach((gridBox) => {
        gridBox.removeEventListener("mouseenter", addRandomTintOnHover);
    });
}