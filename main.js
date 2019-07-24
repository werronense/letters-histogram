document.addEventListener("DOMContentLoaded", () => {
  function makeAlphabet() {
    const series = [];

    for (i = 97; i <= 122; i++) {
      const letter = String.fromCharCode(i);
      series.push(letter);
    }

    return series;
  }

  const alphabet = makeAlphabet();

  // create data object
  const data = {
    // define a getter method to return the histogram values in
    // alphabetical order
    get frequencies() {
      const orderedValues = [];

      alphabet.forEach(letter => {
        orderedValues.push(this[letter]);
      });

      return orderedValues;
    }
  };

  // initialize data object with alphabet as keys and each value set to 0
  alphabet.forEach(letter => {
    data[letter] = 0;
  });

  const input = document.querySelector("#input");

  // d3 code for the histogram
  const display = d3.select("#display");
  const chart = display.append("svg");
  const bar = chart.selectAll("g")
      .data(data.frequencies)
      .enter().append("g");

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
    const keysOfHistogram = Object.keys(frequencyHistogram);

    keysOfHistogram.forEach(key => {
      if (data[key] !== frequencyHistogram[key]) {
        data[key] = frequencyHistogram[key];
      }
    })
    console.log(data.frequencies);
  });


  input.focus();
  console.log("running all"); // test
  //console.log(data.frequencies); // test
});
