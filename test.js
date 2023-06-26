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

    // Tokenize all the text on the webpage using wanakana.tokenize()
    const allText = document.body.textContent;
    const words = wanakana.tokenize(allText);

    // Iterate over each word
    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      // Check if the word is in the pitch accent data object
      if (pitchAccentData[word]) {
        const pitchAccent = pitchAccentData[word].accents[0];
        const wordSpans = Array.from(document.querySelectorAll("*:not(script):not(style)")).filter(element => element.textContent.includes(word));

        // Iterate over each word span
        for (let j = 0; j < wordSpans.length; j++) {
          const wordSpan = wordSpans[j];
          
          // Skip already colored word spans
          if (wordSpan.classList.contains('colored')) {
            continue;
          }

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

          // Add a class to mark the word span as colored
          wordSpan.classList.add('colored');
        }
      }
    }
  });
