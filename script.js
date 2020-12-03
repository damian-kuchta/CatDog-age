'use strict';
const animalPanel = document.querySelector('.start-page');
const animalChoice = document.querySelectorAll('.start-page__animal-choice');
const catPanel = document.querySelector('.panel-cat-wrap');
const dogPanel = document.querySelector('.panel-dog-wrap');
const backBtns = document.querySelectorAll('.btn--back');
const monthBtns = document.querySelectorAll('.btn--months');
const catForm = document.querySelector('.animal-age--cat');
const dogForm = document.querySelector('.animal-age--dog');
const ageInputs = document.querySelectorAll('.animal-age__input')
const result = document.querySelector('.result');
const closeResultBtn = document.querySelector('.result__close-icon');
const dogSizesContainer = document.querySelector('.dog-sizes__choose-size')
const dogSizes = [...document.querySelectorAll('.dog-sizes__container')];
let selectedAnimal;
let dogSize = "medium";
let monthsChecked = false;

function chooseAnimal() {
    animalPanel.classList.add('hidden');

    if(this.classList.contains('start-page__animal-choice--cat')) {
        catPanel.classList.remove('hidden');
        selectedAnimal = catPanel;
    }
    else if(this.classList.contains('start-page__animal-choice--dog')) {
        dogPanel.classList.remove('hidden');
        selectedAnimal = dogPanel;
    }
}

function goBack() {
    selectedAnimal.classList.add('hidden');
    animalPanel.classList.remove('hidden');
    monthBtns.forEach(btn=>btn.classList.remove('btn--months-active'));
    monthsChecked=false;
    selectedAnimal.querySelector('form').reset();
    
    (selectedAnimal === dogPanel) ? setDefaultSize() : '' ;
}

function calcCatAge(e) {
    e.preventDefault();
    monthsChecked ? this.querySelector(".animal-age__input--cat-age").max = "12" : this.querySelector(".animal-age__input--cat-age").max ="99";
    const nameInput = this.querySelector(".animal-age__input--cat-name").value;
    const ageInput = this.querySelector(".animal-age__input--cat-age").value;
    let finalAge;

    if(this.querySelector('.btn--months').classList.contains('btn--months-active')) {
        finalAge = calculateAge(catToHuman.months, ageInput);
    }
    else {
        finalAge = calculateAge(catToHuman.years, ageInput);
    }

    selectedAnimal.classList.add('hidden');
    displayAge(nameInput, finalAge);
    monthsChecked = false;
    monthBtns.forEach(btn=>btn.classList.remove('btn--months-active'));
}

function calcDogAge(e) {
    e.preventDefault();

    const nameInput = this.querySelector(".animal-age__input--dog-name").value;
    const ageInput = this.querySelector(".animal-age__input--dog-age").value;
    let finalAge;

    if(this.querySelector('.btn--months').classList.contains('btn--months-active')) {
        finalAge = calculateAge(dogToHuman[dogSize].months, ageInput);
    }
    else {
        finalAge = calculateAge(dogToHuman[dogSize].years, ageInput);
    }

    selectedAnimal.classList.add('hidden');
    displayAge(nameInput, finalAge);
    monthsChecked=false;
    setDefaultSize();
    monthBtns.forEach(btn=>btn.classList.remove('btn--months-active'));
}

function chooseDogSize() {
    dogSizes.forEach(size=>size.classList.remove('dog-sizes__container--active'));
    this.classList.add('dog-sizes__container--active');
    dogSize = this.dataset.size;
}

function chooseDogSizeKey(e) {
    if(e.keyCode===13) {
        dogSizes.forEach(size=>size.classList.remove('dog-sizes__container--active'));
        e.target.classList.add('dog-sizes__container--active');
        dogSize = e.target.dataset.size;
        }
}

function calculateAge(agesObj, ageInput) {  
    if(ageInput > 20) {return "jest nieśmiertelny/a!"}
    const age = agesObj[ageInput];
    return `ma ${age}`;
}

function displayAge(name, humanYears) {
   result.querySelector('.result__info').textContent = `${name} ${humanYears}!`;
   result.classList.remove('hidden');
}

function toggleMonths() {
    this.classList.toggle('btn--months-active');
    monthsChecked = !monthsChecked;
    console.log(monthsChecked);
}

function switchMaxAge() {
    ageInputs.forEach(input => (monthsChecked===true) ? input.max="12" : input.max = "99");
}

function closeResult() {
    result.classList.add('hidden');
    animalPanel.classList.remove('hidden');
    selectedAnimal.querySelector('form').reset();
}

function closeResultByEsc(e) {
    if(!result.classList.contains('hidden') && e.keyCode=== 27) {
        result.classList.add('hidden');
        animalPanel.classList.remove('hidden');
        selectedAnimal.querySelector('form').reset();
    } 
}

function setDefaultSize() {
    dogSize = "medium";
    dogSizes.forEach(size=>size.classList.remove('dog-sizes__container--active'));
    document.querySelector('[data-size="medium"]').classList.add('dog-sizes__container--active');
}

function chooseAnimalByKey(e) {
    if(e.keyCode===13) {
        if(e.target.classList.contains('start-page__animal-choice--cat')) {
            catPanel.classList.remove('hidden');
            animalPanel.classList.add('hidden')
            selectedAnimal = catPanel;
        }
        else if(e.target.classList.contains('start-page__animal-choice--dog')) {
                dogPanel.classList.remove('hidden');
                selectedAnimal = dogPanel;
                animalPanel.classList.add('hidden')
        }
}
}

animalChoice.forEach(animal=> animal.addEventListener('click', chooseAnimal));
monthBtns.forEach(btn => btn.addEventListener('click', toggleMonths));
monthBtns.forEach(btn=>btn.addEventListener('blur', switchMaxAge));
backBtns.forEach(btn => btn.addEventListener('click', goBack));
catForm.addEventListener('submit', calcCatAge);
dogForm.addEventListener('submit', calcDogAge);
dogSizesContainer.addEventListener('keydown', chooseDogSizeKey);
dogSizes.forEach(dogSize => dogSize.addEventListener('click', chooseDogSize));
closeResultBtn.addEventListener('click', closeResult);
window.addEventListener('keydown', closeResultByEsc);
window.addEventListener('keydown', chooseAnimalByKey);

