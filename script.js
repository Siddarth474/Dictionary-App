document.addEventListener('DOMContentLoaded' , () => {

    const inputBox = document.getElementById('input');
    const searchBtn = document.getElementById('search-btn');
    const displayResult = document.querySelector('.meaning-box');
    const Xbutton = document.getElementById('x-mark');

    async function fetchResult(word) {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const word_data = await fetch(`${url}`).then(response => response.json());

        displayResult.innerHTML = `fetching data...`;
        setTimeout(() => {
            showResult(word_data);
        } , 2000);
    }

    function showResult (word_data) {
        try {
            let define = word_data[0].meanings[0].definitions[0];

            displayResult.innerHTML = `
            <h2>Word: ${word_data[0].word}</h2>
            <p class="partOfSpeech"> ${word_data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning: </strong>${define.definition  === undefined ? "Not Found." : define.definition}</p>
            <p><strong>Example: </strong>${define.example === undefined ? "Not Found." : define.example}</p>
            <p><strong>Anotyms:<strong></p>`;

            let Anotyms = word_data[0].meanings[0].antonyms;

            if(Anotyms.length === 0) {
                displayResult.innerHTML += `<p>Not Found</p>`
            }
            else {
                for(let i=0;i<Anotyms.length;i++) {
                    displayResult.innerHTML += `<li>${Anotyms[i]}</li>`
                }
            }

            let phonetic = word_data[0].phonetics;

            displayResult.innerHTML += `<p><strong>Audio:</strong>
            <a href="${phonetic[0].audio === "" ? phonetic[1].audio : phonetic[0].audio}"><i class="fa-solid fa-volume-high"></i> 
            </a></p>
            <button>
                <a href = "${word_data[0].sourceUrls[0]}">Read More</a>
            </button>`;
        }
        catch (error) {
            displayResult.innerHTML = `<p>Sorry, the word could not be found!!</p>`;
        }
    }
    
    searchBtn.addEventListener('click' , () => {
        fetchResult(inputBox.value);
    });

    Xbutton.addEventListener('click' , () => {
        inputBox.value = "";
    });
});