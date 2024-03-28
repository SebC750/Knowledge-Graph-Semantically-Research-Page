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
        
        const paragraphs = document.querySelectorAll('p, h2, h3, h1');

        
        const translateUrl = 'https://translation.googleapis.com/language/translate/v2';

        
        const apiKey = 'AIzaSyBjHt76VTRJ76PlS8G9W1cnJJkB6emPcPw';

        
        const translationPromises = [];

        
        paragraphs.forEach(paragraph => {
            const textToTranslate = paragraph.innerText;
            const apiUrl = `${translateUrl}?key=${apiKey}&target=${targetLanguage}&q=${encodeURIComponent(textToTranslate)}`;
            const translationPromise = fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    
                    const translatedText = data.data.translations[0].translatedText;
                    
                    paragraph.innerText = translatedText;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            translationPromises.push(translationPromise);
        });

        
        Promise.all(translationPromises)
            .then(() => {
                console.log('All translations complete.');
            })
            .catch(error => {
                console.error('Error during translations:', error);
            });
    }
});
