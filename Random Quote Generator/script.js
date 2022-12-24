const quoteText = document.querySelector(".quote"),
authorName = document.querySelector(".author .name"),
quoteBtn = document.querySelector("button"),
soundBtn = document.querySelector(".sound"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
whatsAppBtn = document.querySelector(".whatsapp"),
facebookBtn = document.querySelector(".facebook");


let postUrl = window.location.href;

// Random Quote function

function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    // Fetching random quotes/data from the API and parsing it into JavaScript object

    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        console.log(result);
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerText = "New Quote";
        quoteBtn.classList.remove("loading");
    });
}

soundBtn.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText + " " + `by` + " " + `${authorName.innerText}` + " " + `|` + " " + `AiDaily's Quotes Generator from:` + " " + `${postUrl}`);
});

twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}` + " " + `by` + " " + `${authorName.innerText}` + " " + `|` + " " + `AiDaily's Quotes Generator from:` + " " + `${postUrl}` ;
    window.open(tweetUrl, "_blank");
});

whatsAppBtn.addEventListener("click", () => {
    let whatsAppUrl = `https://api.whatsapp.com/send?text=${quoteText.innerText}` + " " + `by` + " " + `${authorName.innerText}` + " " + `|` + " " + `AiDaily's Quotes Generator from:`  + " " + `${postUrl}`;
    window.open(whatsAppUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);