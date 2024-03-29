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
    // define a getter method to return the histogram values alphabetically
    get frequencies() {
      const pairedValues = [];
      let totalLetters = 0;

      alphabet.forEach(letter => totalLetters += this[letter]);

      alphabet.forEach(letter => {
        const datum = {};

        datum.letter = letter;
        datum.frequency =
            totalLetters > 0 ? 100 * (this[letter] / totalLetters) : 0;

        pairedValues.push(datum);
      });

      return pairedValues;
    }
  };

  // initialize data object with alphabet as keys and each value set to 0
  alphabet.forEach(letter => {
    data[letter] = 0;
  });

  const input = document.querySelector("#input");

  // d3 code for the histogram
  const barWidth = 25;
  const height = 200;
  const width = 26 * barWidth;

  const x = d3.scaleLinear()
      .domain([0, 26])
      .range([0, width])
  const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

  const yAxis = d3.axisLeft(y)
      .ticks(5);

  const display = d3.select("#display");

  const chart = display.append("svg")
      .attr("height", height + 50)
      .attr("width", width + 25)
      .attr("transform", "translate(30, 10)");

  const bar = chart.selectAll("g")
      .data(data.frequencies, d => d)
      .enter().append("g")
      .attr("transform", (d, i) => `translate(${i * barWidth + 25}, 11)`);

  bar.append("text")
    .attr("x", (barWidth / 2) - 5)
    .attr("y", 215)
    .text(d => d.letter);

  bar.append("rect")
    .attr("y", d => y(d.frequency))
    .attr("height", d => height - y(d.frequency))
    .attr("width", barWidth)
    .attr("id", d => d.letter);
  /*
  const svg = d3.select("svg")
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(25, 10)")
      .call(yAxis);
  */
  // define functions for event listenter
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
    const keysOfHistogram = Object.keys(data);

    keysOfHistogram.forEach(key => {
      if (!frequencyHistogram[key]) {
        data[key] = 0;
      } else if (data[key] !== frequencyHistogram[key]) {
        data[key] = frequencyHistogram[key];
      }
    })

    console.log(data.frequencies); // test
    // identify each rect matching the id with the value of d.letter
    // then update it with the new y and height values from d.frequency
    d3.selectAll("rect").data(data.frequencies, d => d.letter)
      .attr("y", d => y(d.frequency))
      .attr("height", d => height - y(d.frequency))
  });


  input.focus();
  console.log("running all"); // test
});
