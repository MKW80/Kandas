let names = ['Small Cup', 'Small Cheese', 'Big Slurpy', 'Big Bacon', 'Big Cup', 'Ice Bomb'];
let descriptions = ['mit frischen Beeren', 'Beef mit Käse', 'mit saftigem Beef', 'extra Schicht Bacon on Top', 'mit frischen Beeren und Cremefüllung', 'Eis, Eis und nochmal Eis'];
let pricings = [3.80, 4.80, 6.90, 7.90, 4.50, 3.40];

let addedAmount = [];
let addedNames = [];
let addedDescriptions = [];
let addedPricings = [];
let extraCost = 4.90;


/* ***** Render Funktionen für die Menüseite ***** */

function onload() {
    loadBasket();
    dishesRender();
    templateEmptyBasket();
    renderFullBasket();
}


// Gerichte
function dishesRender() {
    let dishes = document.getElementById('dishes'); // id "dishes" wird mit Variable verknüpft
    for (let i = 0; i < names.length; i++) { // for schleife lädt array "names" Gerichte ins HTML
        dishes.innerHTML += templateDishes(i); //  HTML wird mit Funktion verknüpft 
    }
}


// Übergabe Beliebte Gerichte an den Warenkorb
function addDish(i) { // 
    let index = addedNames.indexOf(names[i]);

    if (index == -1) {
    addedNames.push(names[i]); 
    addedDescriptions.push(descriptions[i]);
    addedPricings.push(pricings[i]);
    addedAmount.push(1);

    } else {
        addedAmount[index]++; //erfragen den Sinn der Funktion
    }
    saveBasket();
    renderFullBasket();
}


// Basket

function renderFullBasket() { 
    // Funktion warenkorb rendern

    let basketContent = document.getElementById('basket');
    // HTML id wird mit variable verknüpft


    basketContent.innerHTML = '';
    // Alle alten dten werden aus dem HTML inhalt gelöscht

    if (addedAmount.length <= 0) {
        // Wenn addedAmount des gesamten array kleiner oder gleich 0 ist daaaann... 

        basketContent.innerHTML = templateEmptyBasket();
        // HTML inhalt verknüpt mit Funktion templateEmptyBasket
    } else {
        //Ansonsten.... 
        for (let i = 0; i < addedNames.length; i++) {
            // erhöhe addedNames aus dem array um 1 
        basketContent.innerHTML += templateFullBasket(i);
        }
        basketContent.innerHTML += templateBasketCalc();
}
}


function calcPrice(a, b) {
    let price = a * b;
    return price.toFixed(2);
}


function subTotal() {
    let sum = 0;
    for (let i = 0; i < addedPricings.length; i++) {
        sum += addedAmount[i] * addedPricings[i];
    }
    if (sum <= 10){
        extraCost = 4.90;
    } else {
        extraCost = 0;
    }
    return sum.toFixed(2);   
}


function total(c, d) {
    let endSum = c + d;

    return endSum ; 
}

/*
function increase(i) {

}
*/

function decrease(i) {
    let index = addedAmount.indexOf(addedNames[i])
    if (index >= 0){
        addedAmount.splice(i, 1);
    } else {
        removeDishCmpl(i);
    }
}


/* ***** Local Storage ***** */

function saveBasket() {
    let addedNamesAsText = JSON.stringify(addedNames);
    let addedDescriptionsAsText = JSON.stringify(addedDescriptions);
    let addedPricingsAsText = JSON.stringify(addedPricings);
    let addedAmountAsText = JSON.stringify(addedAmount);
    

    localStorage.setItem('addedNames', addedNamesAsText);
    localStorage.setItem('addedDescriptions', addedDescriptionsAsText);
    localStorage.setItem('addedPricings', addedPricingsAsText);
    localStorage.setItem('addedAmount', addedAmountAsText);
  
}


function loadBasket() {
    let addedNamesAsText = localStorage.getItem('addedNames');
    if (addedNamesAsText)
        {addedNames = JSON.parse(addedNamesAsText);}

    let addedDescriptionsAsText = localStorage.getItem('addedDescriptions');
    if (addedDescriptionsAsText)
        {addedDescriptions = JSON.parse(addedDescriptionsAsText);}    

    let addedPricingsAsText = localStorage.getItem('addedPricings');
    if (addedPricingsAsText)
        {addedPricings = JSON.parse(addedPricingsAsText);}    
    
    let addedAmountAsText = localStorage.getItem('addedAmount');
    if (addedAmountAsText)
        {addedAmount = JSON.parse(addedAmountAsText)}    
    }


// Dish komplett entfernen
function removeDishCmpl(i) {
    addedNames.splice(i, 1);
    addedDescriptions.splice(i, 1);
    addedPricings.splice(i, 1);
    addedAmount.splice(i, 1);

    saveBasket();
    renderFullBasket();
}


/* ***** Templates ***** */

// Template Dishes 
function templateDishes(i) {
    return /*html*/ `

<div class="dishes">
    <div class="dish-container">
        <span class="dish-name" id="name">${names[i]}</span>
        <span class="dish-description" id="description">${descriptions[i]}</span>
        <div class="pricing"><span id="price">${pricings[i].toFixed(2)}</span>€</div>
    </div>
    <div class="checkbox-dishes" onclick="addDish(${i})"> <!--, dishesCalc(${i})"> -->
        <img src="img/plus.png">
    </div>
</div> `
}


// Template Basket 

// Render gefüllter Warenkorb / Gerichte
function templateFullBasket(i) {
    return /*html*/ `
    <div class="full-basket">
        <div class="basket-upper">
            <div class="basket-left">
                <span class="basket-amount font"><b>${addedAmount[i]}</b></span>
                <span class="basket-description">
                    <span class="basket-dish font"><b>${addedNames[i]}</b></span>
                    <span class="basket-dish-description font">${addedDescriptions[i]}</span>
                </span>
            </div>
            <div class="basket-right">
                <div class="basket-pricing font" id="subtotal-amount">${calcPrice(addedAmount[i], addedPricings[i])}<span> €</span></div>
            </div>

            <div class="basket-change-amount">
            <img class="delete-dish cursor" src="img/delete.png" onclick="removeDishCmpl(${i})">
                <img class="basket-minus cursor" src="img/minus2.png" onclick="decrease(${i})">
                <img class="basket-plus cursor" src="img/plus2.png" onclick="increase(${i})">
            </div>
        </div>
    </div>
`
}

// Render untere Berechnung Warenkorb
function templateBasketCalc() {
    return /*html*/ `
    <div class="basket-calc">
        <div class="basket-calc-left font">
            Zwischensumme:<br><br>
            Lieferkosten:<br>
            <h4>Gesamt:</h4>
        </div>
        <div class="basket-calc-right font">
            <span></span>${subTotal()} €<br><br> <!--Zwischensumme-->
            <span>${extraCost.toFixed(2)}</span> €<br> <!--Lieferkosten-->
            <h4><span>${total(subTotal(), extraCost)}</span> €</h4> <!--Summe Total-->
        </div>
    </div>
    <div class="paybutton"><h4>Jetzt Bezahlen <span>${total(subTotal(), extraCost)} €</span></h4></div><!--Summe Bezahlen-->
    `
}

// Render leerer Warenkorb
function templateEmptyBasket() {
    return /*html*/ `
    <div class="empty-basket">
        <img class="empty-basket-logo" src="img/bag.png">
        <h3 class="empty-basket-headline">Fülle deinen Warenkorb</h3>
        <span class="empty-basket-txt">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span>
    </div>
    `
}