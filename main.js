document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".input");


  // define functions
  function makeLettersArray(string) {
    return string.toLowerCase().split("").filter(
        letter => /[a-z]/.test(letter)
    );
  }

  function convertArrayToHistogram(array) {
    const histogram = {}

    array.forEach(letter => {
      return (histogram[letter] ? histogram[letter] += 1 :
          histogram[letter] = 1)
    });

    return histogram;
  }


  // add event listener to input field
  input.addEventListener("keyup", e => {
    const letters = makeLettersArray(e.target.textContent);
    const frequencyHistogram = convertArrayToHistogram(letters);

    console.log(frequencyHistogram);
  });

  
  input.focus();
});
