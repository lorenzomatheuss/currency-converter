document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertedAmountInput = document.getElementById('convertedAmount');
    const convertButton = document.getElementById('convertButton');
    const clearButton = document.getElementById('clearButton');

    const apiKey = 'ea3a18168d66d94e0cde3e3b';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    // Fetch currency data and populate selects
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency;
                option.text = currency;
                fromCurrencySelect.add(option);
                toCurrencySelect.add(option.cloneNode(true));
            });
        })
        .catch(error => console.error('Error fetching currency data:', error));

    // Convert currency
    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value.replace(/\./g, '').replace(/,/g, '.')); // Removes thousands separators and replaces commas with periods
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || fromCurrency === '' || toCurrency === '') {
            alert('Please fill in all fields with valid values.');
            return;
        }

        const convertUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

        fetch(convertUrl)
            .then(response => response.json())
            .then(data => {
                convertedAmountInput.value = data.conversion_result.toFixed(2).toLocaleString('de-DE');
            })
            .catch(error => console.error('Error converting currency:', error));
    });

    // Clear all fields
    clearButton.addEventListener('click', () => {
        amountInput.value = '';
        convertedAmountInput.value = '';
        fromCurrencySelect.selectedIndex = 0;
        toCurrencySelect.selectedIndex = 0;
    });

    // Format the amount input with dots as thousand separators
    amountInput.addEventListener('input', function() {
        let value = amountInput.value.replace(/\D/g, ''); // Removes all non-numeric characters
        if (value.length > 0) {
            value = parseInt(value).toLocaleString('pt-BR');
            amountInput.value = value;
        }
    });
});
