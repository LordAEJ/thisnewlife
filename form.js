const form = document.getElementById('pairing-form');
const resultsDiv = document.getElementById('results');

let participants = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const generation = document.getElementById('generation').value;
  const gender = document.getElementById('gender').value;
  const subgroup = document.getElementById('subgroup').value;
  const email = document.getElementById('email').value;

  participants.push({
    name,
    generation,
    gender,
    subgroup,
    email,
  });

  if (participants.length % 2 === 0) {
    const pair1 = participants.shift();
    const pair2 = participants.shift();

    if (pair1.subgroup !== "Welfare" && pair2.subgroup !== "Welfare" && pair1.generation !== pair2.generation && pair1.gender !== pair2.gender) {
      const pairText = `Pair: ${pair1.name} (${pair1.generation}, ${pair1.gender}) - ${pair2.name} (${pair2.generation}, ${pair2.gender})`;
      resultsDiv.textContent = pairText;

      // Send pair data to email (replace with your actual email sending logic)
      sendEmail(pairText, 'ebukajefferson16@gmail.com'); // Replace with actual email address
    } else {
      // If either participant selects "Welfare", re-add them to the pool
      if (pair1.subgroup === "Welfare") {
        participants.unshift(pair1);
      }
      if (pair2.subgroup === "Welfare") {
        participants.unshift(pair2);
      }
      resultsDiv.textContent = 'Incompatible pair (Welfare). Please try again.';
    }
  } else {
    resultsDiv.textContent = 'Waiting for another participant.';
  }
});
