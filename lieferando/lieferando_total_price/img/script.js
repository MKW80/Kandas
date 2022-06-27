let names = ['Small Cup', 'Small Cheese', 'Big Slurpy', 'Big Bacon', 'Big Cup', 'Ice Bomb'];
let descriptions = ['mit frischen Beeren', 'Beef mit Käse', 'mit saftigem Beef', 'extra Schicht Bacon on Top', 'mit frischen Beeren und Cremefüllung', 'Eis, Eis und nochmal Eis'];
let pricings = [3.80, 4.80, 6.90, 7.90, 4.50, 3.40];

let addedAmount = [];
let addedNames = [];
let addedDescriptions = [];
let addedPricings = [];


/* ***** Render Funktionen für die Menüseite ***** */

function onload() {
    loadBasket();
    dishesRender();
    renderEmptyBasket();
    renderFullBasket();
}


// Gerichte
function dishesRender() {
    let dishes = document.getElementById('dishes');
    for (let i = 0; i < names.length; i++) {
        dishes.innerHTML += templateDishes(i);
    }
}


// Übergabe Beliebte Gerichte an den Warenkorb
function addDish(i) {
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

// Basket Switch

function basketSwitch() {
    let index = addedNames.indexOf(names[i]); // neu
    let renderFullBasket = document.getElementById('basket');
    let renderBasketCalc = document.getElementById('basket-calc-cmpl'); 
    let renderEmptyBasket = document.getElementById('empty-basket');

    if (index == -1) {
        
        renderEmptyBasket();
    } else {
        renderFullBasket();
        renderBasketCalc();
    }

}

// Basket

function renderFullBasket() {
    let fullBasket = document.getElementById('basket');

    fullBasket.innerHTML = '';
    for (let i = 0; i < addedNames.length; i++) {
        fullBasket.innerHTML += templateFullBasket(i);

        renderBasketCalc();
    }
}

function renderBasketCalc() {
    let renderBasketCalc = document.getElementById('basket-calc-cmpl');
    renderBasketCalc.innerHTML = '';
    renderBasketCalc.innerHTML += templateBasketCalc();
}

function renderEmptyBasket() {
    let renderEmptyBasket = document.getElementById('empty-basket');
    renderEmptyBasket.innerHTML = '';
    renderEmptyBasket.innerHTML += templateEmptyBasket();
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


// NOCH NICHT GANZ FERTIG!!!!! Basket CALC bleibt stehen!!!    
function removeDishCmpl(i) {
    addedNames.splice(i, 1);
    addedDescriptions.splice(i, 1);
    addedPricings.splice(i, 1);
    addedAmount.splice(i, 1);

    saveBasket();
    renderFullBasket();
}

function dishesCalc(i) {
    let amount = addedAmount[i];
    let price = addedPricings[i];
    let sum = amount * price;

    sum = addedSum[i, 1];
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
    <div class="checkbox-dishes" onclick="addDish(${i})">
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
                <div class="basket-pricing font">${addedPricings[i].toFixed(2)}<span> €</span></div>
            </div>

            <div class="basket-change-amount">
                <img class="delete-dish cursor" src="img/delete.png" onclick="removeDishCmpl(${i})">
                <img class="basket-minus cursor" src="img/minus2.png">
                <img class="basket-plus cursor" src="img/plus2.png">
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
            <span id="subtotal">12.50</span> €<br><br>
            <span>0,00</span> €<br>
            <h4><span>4,50</span> €</h4>
        </div>
    </div>
    <div class="paybutton"><h4>Bezahlen <span>(4,50 €)</span></h4></div>
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