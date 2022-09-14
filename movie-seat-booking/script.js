// Grab Elements
const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

let ticketPrice = +movieSelect.value // using +sign to convert value to Number type

const updateSelectedCount = () => {
  const selectedSeatsCount = document.querySelectorAll('.row .seat.selected').length
  
  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}

movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value
  updateSelectedCount()
});

container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') 
    && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
    updateSelectedCount()
  }
});
