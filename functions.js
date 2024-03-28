document.addEventListener('DOMContentLoaded', function() {
    // Get all dropdown items
    const enOption = document.getElementById('en-option')
    const esOption = document.getElementById('es-option');
    

    enOption.addEventListener('click', function() {
        translateToLanguage('en');
    });
    // Add click event listeners to each dropdown item
    esOption.addEventListener('click', function() {
        translateToLanguage('es');
    });

   

    function translateToLanguage(targetLanguage) {
        // Get all <p> elements
        const paragraphs = document.querySelectorAll('p, h2, h3, h1');

        // Google Translate API URL
        const translateUrl = 'https://translation.googleapis.com/language/translate/v2';

        // Your Google Translate API key
        const apiKey = 'AIzaSyBjHt76VTRJ76PlS8G9W1cnJJkB6emPcPw';

        // Array to store promises for translation requests
        const translationPromises = [];

        // Iterate over each <p> element and create a translation request for its text content
        paragraphs.forEach(paragraph => {
            const textToTranslate = paragraph.innerText;
            const apiUrl = `${translateUrl}?key=${apiKey}&target=${targetLanguage}&q=${encodeURIComponent(textToTranslate)}`;
            const translationPromise = fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Extract the translated text
                    const translatedText = data.data.translations[0].translatedText;
                    // Update the text content of the <p> element with the translated text
                    paragraph.innerText = translatedText;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            translationPromises.push(translationPromise);
        });

        // Wait for all translation promises to resolve
        Promise.all(translationPromises)
            .then(() => {
                console.log('All translations complete.');
            })
            .catch(error => {
                console.error('Error during translations:', error);
            });
    }
});
//const apiKey = 'AIzaSyBjHt76VTRJ76PlS8G9W1cnJJkB6emPcPw';