// main.js
window.addEventListener("DOMContentLoaded", init);

function init() {
	let recipes = getRecipesFromStorage();
	addRecipesToDocument(recipes);
	initFormHandler();
}

function getRecipesFromStorage() {
	return JSON.parse(localStorage.getItem('recipes')) || [];
}

function addRecipesToDocument(recipes) {
	let mainRef = document.querySelector('main');
	recipes.forEach((recipe) => {
		let element = document.createElement('recipe-card');
		element.data = recipe;
		mainRef.append(element);
	});
}

function saveRecipesToStorage(recipes) {
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

function initFormHandler() {
	let formRef = document.querySelector('form');
	let mainRef = document.querySelector('main');
	let submitButtonRef = document.querySelector('button[type = "submit"]');
	submitButtonRef.addEventListener('click', (e) => {
		e.preventDefault();
		let formData = new FormData(formRef);
		let recipeObject = {};
		for(let [key, value] of formData.entries()){
			recipeObject[key] = value;
		}
		let element = document.createElement('recipe-card');
		element.data = recipeObject;
		mainRef.append(element);
		let toUpdate = getRecipesFromStorage();
		toUpdate.push(recipeObject);
		localStorage.setItem('recipes', JSON.stringify(toUpdate));
	});
	let clearButtonRef = document.querySelector('button[type = "button"]');
	clearButtonRef.addEventListener('click', () => {
		localStorage.clear();
		mainRef.innerHTML = '';
		formRef.reset();
	});
}
