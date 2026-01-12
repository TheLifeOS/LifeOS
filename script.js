function calculateTax() {
    const goal = document.getElementById('goal').value;
    const months = parseFloat(document.getElementById('months').value);
    const potential = parseFloat(document.getElementById('potentialIncome').value);
    const hours = parseFloat(document.getElementById('hours').value);
    
    if (!goal || !months || !potential || !hours) {
        alert('Fill all fields.');
        return;
    }
    
    const lostRevenue = months * potential;
    const overthinkingHours = months * 4 * hours;
    const opportunityCost = overthinkingHours * 20; // $20/hr
    const totalTax = lostRevenue + opportunityCost;
    
    document.getElementById('taxAmount').innerText = `$${totalTax.toLocaleString()}`;
    document.getElementById('breakdown').innerText = 
        `Lost Revenue: $${lostRevenue.toLocaleString()} + Time Cost: $${opportunityCost.toLocaleString()}`;
    document.getElementById('result').style.display = 'block';
}

function shareResult() {
    const tax = document.getElementById('taxAmount').innerText;
    const text = `My overthinking cost me ${tax} in 2024. Calculate yours before 2025: ${window.location.href}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
}
