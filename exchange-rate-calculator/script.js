const currencyEl_src = document.getElementById('currency-src')
const amountEl_src = document.getElementById('amount-src')
const currencyEl_out = document.getElementById('currency-out')
const amountEl_out = document.getElementById('amount-out')

const rateEl = document.getElementById('rate')
const swap = document.getElementById('swap')

// Fetch exchange rates and update the DOM
const calculate = () => {
  const currency_src = currencyEl_src.value
  const currency_out = currencyEl_out.value

  fetch(`https://v6.exchangerate-api.com/v6/4a1d4a4e0dbe2894ecf893b9/latest/${currency_src}`)
    .then(res => res.json())
    .then(data => {
      if ('conversion_rates' in data) {
        if (currency_out in data['conversion_rates']) {
          const conversion_rate = +data['conversion_rates'][currency_out]

          // update html
          rateEl.innerText = conversion_rate
          amountEl_out.value = +amountEl_src.value * conversion_rate
          console.log(conversion_rate)
        }
      }
    })
}

const swapCurrency = () => {
  const temp = currencyEl_src.value
  currencyEl_src.value = currencyEl_out.value
  currencyEl_out.value = temp
  calculate()
}

// Event Listeners
currencyEl_src.addEventListener('change', calculate)
currencyEl_out.addEventListener('change', calculate)
amountEl_src.addEventListener('input', calculate)
swap.addEventListener('click', swapCurrency)

window.addEventListener('load', calculate)
