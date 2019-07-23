document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".input");

  input.addEventListener("keyup", e => {
    const histogram = {};

    const letters = e.target.textContent.toLowerCase().split("").filter(
        letter => /[a-z]/.test(letter)
    );

    letters.forEach(letter => {
      return (histogram[letter] ? histogram[letter] += 1 :
          histogram[letter] = 1)
    });

    console.log(histogram);
  });

  input.focus();
});
