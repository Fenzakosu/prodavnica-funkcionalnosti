"use strict"

class Artikal {
    constructor(naziv, cena, opis) {
        this.naziv = naziv
        this.cena = cena
        this.opis = opis
    }
}




let artikli = []

function kreirajRedoveArtikala() {
    let table = document.querySelector("#artikli-body")
    table.innerHTML = ''
    for (let i = 0; i < artikli.length; i++) {
        let tr = document.createElement("tr")

        let rb = document.createElement("td")
        let naziv = document.createElement("td")
        let cena = document.createElement("td")
        rb.textContent = i + 1
        naziv.textContent = artikli[i].naziv
        cena.textContent = artikli[i].cena

        tr.appendChild(rb)
        tr.appendChild(naziv)
        tr.appendChild(cena)

        tr.addEventListener('click', function () {
            prikaziDetaljeArtikla(artikli[i])
        })
        table.appendChild(tr)
    }
}

function prikaziDetaljeArtikla(artikal) {
    let p = document.createElement("p")


    p.innerHTML = "Naziv: " + artikal.naziv + "<br>" + "Cena: " + artikal.cena +
        "<br>" + "Opis: " + artikal.opis

    let detalji = document.querySelector("#artikliDetails")

    if (detalji.firstChild) {
        detalji.firstChild.remove()
    }

    detalji.appendChild(p)
}

function inicijalizujArtikle() {
    if (localStorage.getItem('artikli') === undefined || localStorage.getItem('artikli') === null) {
        artikli = [
            new Artikal("Monitor", 165, "Zakrivljeni gejming monitor, dizajniran da zadovolji potrebe profesionalnih gejmera i ljubitelja multimedijalnog sadržaja."),
            new Artikal("TV", 650, "Televizor 27 inča"),
            new Artikal("Miš", 20, "Bežični miš")
        ]
    } else {
        artikli = JSON.parse(localStorage.getItem('artikli'));
    }

    kreirajRedoveArtikala()
    submisijaForme()
}

document.addEventListener('DOMContentLoaded', inicijalizujArtikle)

function submisijaForme() {
    let submitBtn = document.querySelector('#submitBtn')
    submitBtn.addEventListener('click', function () { // Dodavanje reakcije na klik
        const forma = document.querySelector('#forma')
        const formData = new FormData(forma) // Neophodno da izvučemo podatke iz forme

        const naziv = formData.get('naziv')
        const cena = formData.get('cena')
        const opis = formData.get('opis')

        const noviArtikal = new Artikal(naziv, cena, opis)
        artikli.push(noviArtikal)
        localStorage.setItem('artikli', JSON.stringify(artikli));


        kreirajRedoveArtikala()
    })
}