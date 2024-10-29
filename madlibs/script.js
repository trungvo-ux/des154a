(function() {
    "use strict";
    console.log('reading js');

    const myform = document.querySelector('#myform');
    const madlib = document.querySelector('#madlib');
    const overlay = document.querySelector('#overlay'); 
    const closeOverlay = document.querySelector('#close-overlay');

    myform.addEventListener('submit', function(event) {
        event.preventDefault();

        const verb1 = document.querySelector('#verb1').value;
        const noun1 = document.querySelector('#noun1').value;
        const noun2 = document.querySelector('#noun2').value;
        const adverb1 = document.querySelector('#adverb1').value;
        const adj1 = document.querySelector('#adj1').value;

        let mytext;


        if (!noun1) {
            mytext = "Please provide a noun!";
            document.querySelector("#noun1").focus();
        } else if (!noun2) {
            mytext = "Please provide a second noun!";
            document.querySelector("#noun2").focus();
        } else if (!verb1) {
            mytext = "Please provide a verb!";
            document.querySelector("#verb1").focus();
        } else if (!adverb1) {
            mytext = "Please provide an adverb!";
            document.querySelector("#adverb1").focus();
        } else if (!adj1) {
            mytext = "Please provide an adjective!";
            document.querySelector("#adj1").focus();
        } else {

            mytext = `“MegaMan had faced many challenges before, but none like this. He was on a mission to save the ${adj1} ${noun1}, which had been overtaken by Dr. Wily’s latest robotic creations. As he ventured through the dark, mechanical city, he had to ${verb1} past countless traps set to stop him.

            Suddenly, MegaMan spotted the infamous ${noun2} hidden among the shadows. He approached it ${adverb1}, carefully avoiding Dr. Wily’s sensors. Just as he reached for the control panel, the floor beneath him shook, revealing a massive robot designed to keep intruders away. With his courage and skill, MegaMan powered up, ready for the ultimate showdown to rescue the ${noun1} and bring peace back to the land.”`;


            document.querySelector('#noun1').value = '';
            document.querySelector('#noun2').value = '';
            document.querySelector('#verb1').value = '';
            document.querySelector('#adverb1').value = '';
            document.querySelector('#adj1').value = '';


            madlib.innerHTML = mytext;
            overlay.classList.remove('hidden');
        }
    });


    closeOverlay.addEventListener('click', function() {
        overlay.classList.add('hidden');
    });
})();