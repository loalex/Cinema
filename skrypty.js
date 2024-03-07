const baza = {
    host: 'localhost',
    user: 'root',
    pass: '',
    baza: 'kino',
    sql: ''
}

window.onload = () => {
    odliczanie();
    formularz();
    setTimeout(function () {
        dodajDoBazy();
    }, 1000);

    pobierzDane();
    checkboxy();
        zmienslajd();
    
}

const iloscbiletownormalnych = [
    { bilet: "zero normalnych", koszt: 0 },
    { bilet: "jeden normalny", koszt: 25 },
    { bilet: "dwa normalne", koszt: 50 },
    { bilet: "trzy normalne", koszt: 75 },
    { bilet: "grupowy do 10 osob", koszt: 200 },
];

const iloscbiletowulgowych = [
    { biletu: "zero ulgowych", koszt: 0 },
    { biletu: "jeden ulgowy", koszt: 20 },
    { biletu: "dwa ulgowe", koszt: 40 },
    { biletu: "trzy ulgowe", koszt: 60 },
    { biletu: "grupowy do 15 osob z legitymacja + 2 doroslych", koszt: 250 },
];

function odliczanie() {

    var dzisiaj = new Date();

    var dzien = dzisiaj.getDate();
    var miesiac = dzisiaj.getMonth() + 1;
    var rok = dzisiaj.getFullYear();

    var godzina = dzisiaj.getHours();
    if (godzina < 10) godzina = "0" + godzina;
    var minuta = dzisiaj.getMinutes();
    if (minuta < 10) minuta = "0" + minuta;
    var sekunda = dzisiaj.getSeconds();
    if (sekunda < 10) sekunda = "0" + sekunda;

    document.getElementById("pierwszy").innerHTML =
        dzien + "/" + miesiac + "/" + rok + "|" + godzina + ":" + minuta + ":"  + sekunda;
    setTimeout("odliczanie()", 1000);
}

async function pobierzDane() {
	const url = 'http://localhost/projekt/get.php';
    console.log("lol");
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //body: dataToSend
    })
    let result = await response.json();
	console.log('Pobrane dane:', result);
            document.getElementById("drugi").innerHTML = "<h2>Lista filmow</h2>";
            var table = "<table><tr><th>Nazwa</th><th>Rodzaj</th><th>Data dodania</th></tr>";
    for (var i = 0; i < result.length; i++) {
        table += "<tr><td>" + result[i].nazwa + "</td><td>" + result[i].rodzaj + "</td><td>" + result[i].data_dodania + "</td></tr>";
            }
            table += "</table>";
            document.getElementById("drugi").innerHTML = table;
            console.log(result);
}

async function dodajDoBazy() {
    console.log('Funkcja dodajDoBazy zostala wywolana');
    //const idfilmu = document.getElementById('idfilmu').value.trim();
    const nazwa = document.getElementById('nazwa').value.trim();
    const rodzaj = document.getElementById('rodzaj').value.trim();
	console.log(rodzaj);
    const dlugosc = document.getElementById('dlugosc').value.trim();
    const data_dodania = document.getElementById('data_dodania').value.trim();

    if (!nazwa || !rodzaj || !dlugosc || !data_dodania) {
        const wynikDiv = document.getElementById('wynik');
        wynikDiv.innerHTML = '<p style="color: white;">Wypelnij wszystkie pola przed zapisaniem</p>';
        return;
    }
	baza.sql = `INSERT INTO filmy (nazwa, rodzaj, dlugosc, data_dodania) VALUES ('${nazwa}', '${rodzaj}', '${dlugosc}', '${data_dodania}');`;
    const dataToSend = JSON.stringify(baza);
	const url = 'http://localhost/projekt/post2.php';
    console.log('Dane do wys³ania:', dataToSend);

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: dataToSend
    })
    let result = await response.json();
    console.log('Pobrane dane:', result);
    pobierzDane();
}
function formularz() {
    document.getElementById("trzeci").innerHTML = `
        <form id="kartaForm" style="margin: 0 auto; width: 80%; text-align: left;">
            <h2 style="text-align: center;">Dodaj do listy</h2>
            

            <div style="margin-bottom: 10px;">
                <label for="nazwa">Podaj nazwe:</label>
                <input type="text" id="nazwa" name="nazwa" required>
            </div>

            <div style="margin-bottom: 10px;">
                <label for="rodzaj">Podaj rodzaj:</label>
                <input type="text" id="rodzaj" name="rodzaj" required>
            </div>

            <div style="margin-bottom: 10px;">
                <label for="data_dodania">Data dodania:</label>
                <input type="date" id="data_dodania" name="data_dodania" required>
            </div>

            <input type="hidden" id="id" name="id">

            <div style="margin-bottom: 10px; display: flex; align-items: center;">
                <label for="dlugosc">Dlugosc:</label>
                <input type="number" id="dlugosc" name="dlugosc" required>
                <div style="display: flex; flex-direction: column; align-items: center; margin-left: 10px;">
                </div>
            </div>

            <div style="margin-top: 20px;">
                <button type="button" onclick="dodajDoBazy()">Zapisz</button>
                <button type="button" onclick="czyscFormularz()">Czysc</button>
            </div>
            
            <div id='wynik'></div> 
        </form>
    `;
}
function checkboxy() {
    document.getElementById("prawy").innerHTML =
        `<div style='margin-left: 10px;'>
            <h4 style='font-size: 18px;'>Oblicz koszt swoich biletow</h4>
            <div style='width: 80%; margin: 0 auto;'>
                <div class='border-text form-section' style='text-align: left;  width: 110%; display: inline-block; margin-left: 2%;'>
                    Wybierz ilosc biletow normalnych
                    <form name='form1'>` +
    iloscbiletownormalnych.map(bilet =>
            `<label class='radio-label'>
                                <input type='radio' name='${bilet.bilet}' id='${bilet.bilet}' value='${bilet.koszt}'>
                                ${bilet.bilet} ${bilet.koszt}zl
                            </label>`
        ).join('') +
        `</form>
                </div>
                <div class='border-text form-section' style='text-align: left;  width: 110%; display: inline-block; margin-left: 2%;'>
                    Wybierz ilosc biletow ulgowych
                    <form name='form3'>` +
    iloscbiletowulgowych.map(biletu =>
        `<label class='radio-label'>
                                <input type='radio' name='${biletu.biletu}' id='${biletu.biletu}' value='${biletu.koszt}'>
                                ${biletu.biletu} ${biletu.koszt}zl
                            </label>`
        ).join('') +
        `</form>
                </div>
            </div>
            <div class='border-text' style='width: 80%; margin: 0 auto; text-align: center;'>
                <button type='button' id='calculate-btn' onclick='biletKoszt()'>OBLICZ</button>
            </div>
            <div id='wynik2'></div>
        </div>`;
}


function biletKoszt() {
    let price = 0;

    iloscbiletownormalnych.forEach(bilet => {
        const radio = document.getElementById(bilet.bilet);
        if (radio.checked) {
            price += bilet.koszt;
        }
    });

    iloscbiletowulgowych.forEach(biletu => {
        const radio = document.getElementById(biletu.biletu);
        if (radio.checked) {
            price += biletu.koszt;
        }
    });

    document.getElementById("wynik2").innerHTML = `<p>Koszt twoich biletow: ${price.toFixed(2)} zl</p>`;
}

var numer = Math.floor(Math.random() * 4) + 1;

function zmienslajd() {

    
    numer++;

    if (numer > 4) numer = 1;

    var plik = "<img src=\"slajdy/slajd" + numer + ".jpg\"/>";

    document.getElementById("lewy").innerHTML = plik;

    setTimeout("zmienslajd()", 5000);
}