const search = document.getElementById('search')
const submit = document.getElementById('submit')
const random = document.getElementById('random')
const mealsEl = document.getElementById('meals')
const resultHeading = document.getElementById('result-heading')
const single_mealEl = document.getElementById('single-meal')

// Functions
const searchMeal = (e) => {
  e.preventDefault()

  // Clear single meal
  single_mealEl.innerHTML = ``

  // Get search term
  const term = search.value

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(dat => {
        resultHeading.innerHTML = `<h1>Search results for '${term}'</h1>`

        if (dat.meals === null) {
          resultHeading.innerHTML = `<p>There si no search results for '${term}'</p>`
        } else {
          mealsEl.innerHTML = dat.meals.map(meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `)
          .join('')
        }
      })
  } else {
    alert('Please enter a search term')
  }

  // Clear Search Text
  search.value = ''
}

// Event Listeners
submit.addEventListener('submit', searchMeal)
