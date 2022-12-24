const txtInput = document.querySelector(".inputs input"),
checkBtn = document.querySelector(".inputs button"),
infoTxt = document.querySelector(".info-box");
let filterInput;

checkBtn.addEventListener("click", () => {
    // Splitting user input character, reversing them,
    // and joining them as a single word
    let reverseInt = filterInput.split("").reverse().join("");
    infoTxt.style.display = "block";
    if(filterInput != reverseInt) {
        return infoTxt.innerHTML = `No, <span>'${txtInput.value}'</span> isn't a Palindrome!`;
    }
    infoTxt.innerHTML = `Yes, <span>'${txtInput.value}'</span> is a Palindrome!`
});

txtInput.addEventListener("keyup", () => {
    // Removing spaces & all special characters from entered value
    filterInput = txtInput.value.toLowerCase().replace(/[^A-Z0-9]/ig, "");
    console.log(filterInput);
    if(filterInput) {
        return checkBtn.classList.add("active");
    }
    infoTxt.style.display = "none";
    checkBtn.classList.remove("active");
});