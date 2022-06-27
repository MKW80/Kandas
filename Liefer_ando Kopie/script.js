
let speisekarte = [
    {
        'name': 'Pita1',
        'beschreibung': 'Pitamenü',
        'menge': 1,
        'preis': 11,
        'bewertungen': 0,
    },
    {
        'name': 'Pizza2',
        'beschreibung': 'Pizzamenü',
        'menge': 2,
        'preis': 22,
        'bewertungen': 0,
    },
    {
        'name': 'Burger3',
        'beschreibung': 'Burgemenü',
        'menge': 3,
        'preis': 33,
        'bewertungen': 0,
    },
    {
        'name': 'Spaghettie4',
        'beschreibung': 'Spaghettiemenü',
        'menge': 4,
        'preis': 44,
        'bewertungen': 0,
    },
    {
        'name': 'Auflauf5',
        'beschreibung': 'Auflaufmenü',
        'menge': 5,
        'preis': 55,
        'bewertungen': 0,
    },
    {
        'name': 'Nachtisch6',
        'beschreibung': 'Nachtischmenü',
        'menge': 6,
        'preis': 66,
        'bewertungen': 0,
    }
]
 
let warenkorb = [];
let WarenkorbZaehlen = [];


function zusammenfassung() {

    let checkout = document.getElementById('checkout');

    checkout.innerHTML = '';

    for (let i = 0; i < warenkorb.length; i++) {

        const checkin = warenkorb[i];

        checkout.innerHTML += `
        <div class="checkoutBox"> 
        <span>${checkin['name']} <span> 
        <span>${checkin['beschreibung']}</span><br>
        <span>Menge: ${checkin['menge']}</span> <br> 
        <span>Preis: ${checkin['preis']} €</span> <br> 

        </<div>
        <img src="/img/minus.png"  id="zaeler" onclick="warenkorbMinus(${i})">
        <img src="/img/plus.png" id="zaeler" onclick="warenkorbPlus(${i})">
        <img src="/img/delete.png" id="loeschenBtn" onclick="warenkorbLeeren(${i})">

        `;
    }
}

//              Warenkorb zusammen zählen           //


function warenkorbMinus(i) {
    if (speisekarte[i].menge > 1){
        speisekarte[i].menge-- ;
    }else{  

    }
    zusammenfassung();
}

function warenkorbPlus(i) {
    speisekarte[i].menge++ ;
    zusammenfassung();
    }

//            zum Warenkorb hinzufügen       //
function hinzufuegen(i) {

    if (warenkorb.includes(speisekarte[i])) {
    } else {
        warenkorb.push(speisekarte[i]);

    } zusammenfassung();
}
// warenkorb leeren komplett entfernen
function warenkorbLeeren(i) {
    warenkorb.splice(i, 1);
    
    render();
}

function render() {

    let gerichte = document.getElementById('gerichte');
    gerichte.innerHTML = '';

    for (let i = 0; i < speisekarte.length; i++) {

        const speisen = speisekarte[i];

        gerichte.innerHTML +=
            `
                <div class="card">
                    <h2>${speisen['name']}  <img src="/img/plusButton.png" onclick="hinzufuegen(${[i]})" > </h2><br>
                        <span>Beschreibung: ${speisen['beschreibung']}</span><br>
                            <span>Menge: ${speisen['menge']}</span> <br>
                                <span>Preis: ${speisen['preis']} €</span> <br>
                                    <span>Bewertungen: ${speisen['bewertungen']} noch keine</span>
                                </div>
                                `;

    }

}