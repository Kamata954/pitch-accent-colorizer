// Get the URL of the wanakana.min.js file
var wanakanaUrl = chrome.runtime.getURL('wanakana/wanakana.min.js');

// Create a script tag to load the library
var script = document.createElement('script');
script.src = wanakanaUrl;

// Append the script tag to the document
document.head.appendChild(script);

// Parse the JSON file and store the pitch accent information in an object
fetch(chrome.runtime.getURL('accents.json'))
  .then(response => response.json())
  .then(data => {
    const pitchAccentData = data;
    var body = document.body.innerHTML

    // Tokenize all the text on the webpage using wanakana.tokenize()
    const allText = document.body.textContent;
    const words = wanakana.tokenize(allText);
    console.log(words)

    // Iterate over each word
    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      // Check if the word is in the pitch accent data object
      if (pitchAccentData[word]) {
        const pitchAccent = pitchAccentData[word].accents[0];
        const wordSpan = document.createElement('span');
        wordSpan.innerText = word;
        wordSpan.classList.add('colored-word');
        console.log(wordSpan)
        
        // Change the color of the word based on its pitch accent
        switch (pitchAccent) {
          case 0:
            wordSpan.style.color = 'green';
            break;
          case 1:
            wordSpan.style.color = 'blue';
            break;
          case 2:
            wordSpan.style.color = 'yellow';
            break;
          case 3:
            wordSpan.style.color = 'orange';
            break;
          case 4:
            wordSpan.style.color = 'purple';
            break;
          case 5:
            wordSpan.style.color = 'pink';
            break;
          case 6:
            wordSpan.style.color = 'brown';
            break;
          case 7:
            wordSpan.style.color = 'grey';
            break;
          default:
            break;
        }

        // Check if the word has more than one pitch accent and add a light red background color
        if (pitchAccentData[word].accents.length > 1) {
          wordSpan.style.backgroundColor = 'lightcoral';
        }
        
        // Replace the original word with the new word span
        body = body.replaceAll(word, wordSpan.outerHTML);
      }
    }
    document.body.innerHTML = body
  });
