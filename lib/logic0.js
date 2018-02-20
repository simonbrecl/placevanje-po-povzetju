/**
 * Ustvari osnovne podatke za testiranje
 * @param {org.feri.model.TestniPodatki} podatki - TestniPodatki transaction
 * @transaction
 */
function testniPodatki(podatki) {

    var factory = getFactory();
    var NS = 'org.feri.model';

    // ustvari kupca1
    var kupec = factory.newResource(NS, 'Kupec', 'KUPEC_001');
    kupec.ime = 'Janez';
    kupec.priimek = 'Novak';
    kupec.email = 'janeznovak@gmail.com';
    var kupecNaslov = factory.newConcept(NS, 'Naslov');
    kupecNaslov.kraj = 'Maribor';
    kupecNaslov.postnaSt = 2000;
    kupecNaslov.ulica = 'Glavni trg';
    kupecNaslov.hisnaSt = '1';
    kupec.naslov = kupecNaslov;
    kupec.stanje = 1000;
    kupec.banka = factory.newRelationship(NS, 'Banka', 'BANKA_001');

    // ustvari kupca2
    var kupec2 = factory.newResource(NS, 'Kupec', 'KUPEC_002');
    kupec2.ime = 'Nik';
    kupec2.priimek = 'Novak';
    kupec2.email = 'niknovak@gmail.com';
    var kupecNaslov2 = factory.newConcept(NS, 'Naslov');
    kupecNaslov2.kraj = 'Ljubljana';
    kupecNaslov2.postnaSt = 1000;
    kupecNaslov2.ulica = 'Glavni trg';
    kupecNaslov2.hisnaSt = '1';
    kupec2.naslov = kupecNaslov2;
    kupec2.stanje = 0;
    kupec2.banka = factory.newRelationship(NS, 'Banka', 'BANKA_001');

    // ustvari prodajalca
    var prodajalec = factory.newResource(NS, 'Prodajalec', 'PRODAJALEC_001');
    prodajalec.naziv = 'Trgovina A';
    var prodajalecNaslov = factory.newConcept(NS, 'Naslov');
    prodajalecNaslov.kraj = 'Celje';
    prodajalecNaslov.postnaSt = 3000;
    prodajalecNaslov.ulica = 'Mariborska';
    prodajalecNaslov.hisnaSt = '1';
    prodajalec.naslov = prodajalecNaslov;
    prodajalec.stanje = 0;
    prodajalec.vraciloDnevi = 30;

    // ustvari banko
    var banka = factory.newResource(NS, 'Banka', 'BANKA_001');
    banka.naziv = 'Banka A';
    var bankaNaslov = factory.newConcept(NS, 'Naslov');
    bankaNaslov.kraj = 'Maribor';
    bankaNaslov.postnaSt = 2000;
    bankaNaslov.ulica = 'Smetanova';
    bankaNaslov.hisnaSt = '1';
    banka.naslov = bankaNaslov;
    banka.dovoljenProcent = 50;
    banka.odobrenZnesekDo = 50;

    // ustvari postarja
    var postar = factory.newResource(NS, 'Postar', 'POSTAR_001');
    postar.ime = 'Miha';
    postar.priimek = 'Novak';

    // ustvari postno enoto
    var postnaEnota = factory.newResource(NS, 'PostnaEnota', 'POSTA_001');
    postnaEnota.naziv = 'Posta enota Maribor';
    var postnaEnotaNaslov = factory.newConcept(NS, 'Naslov');
    postnaEnotaNaslov.kraj = 'Maribor';
    postnaEnotaNaslov.postnaSt = 2000;
    postnaEnotaNaslov.ulica = 'Smetanova';
    postnaEnotaNaslov.hisnaSt = '1';
    postnaEnota.naslov = postnaEnotaNaslov;
    postnaEnota.hranjenjePosiljke = 7;
     if (postnaEnota.postarji) {
        postnaEnota.postarji.push(postar);
    } else {
        postnaEnota.postarji = [postar];
    }

    // ustvari izdelek
    var izdelek = factory.newResource(NS, 'Izdelek', 'IZDELEK_001');
    izdelek.naziv = 'Stol';
    izdelek.kolicina = 2;
    izdelek.cena = 19.99;
    izdelek.prodajalec = factory.newRelationship(NS, 'Prodajalec', 'PRODAJALEC_001');

    // ustvari narocilo
    var narocilo = factory.newResource(NS, 'Narocilo', 'NAROCILO_001');
    for(var i = 0; i < 2; i++){
        if (narocilo.izdelki) {
            narocilo.izdelki.push(izdelek);
        } else {
            narocilo.izdelki = [izdelek];
        }
    }  
    narocilo.kupec = factory.newRelationship(NS, 'Kupec', 'KUPEC_001');
    narocilo.casUstvarjeno = podatki.timestamp;
    narocilo.lokacijaPrevzema = 'POSTNA_ENOTA';

    // ustvari narocilo2
    var narocilo2 = factory.newResource(NS, 'Narocilo', 'NAROCILO_002');
    if (narocilo2.izdelki) {
        narocilo2.izdelki.push(izdelek);
    } else {
        narocilo2.izdelki = [izdelek];
    }
    narocilo2.kupec = factory.newRelationship(NS, 'Kupec', 'KUPEC_002');
    narocilo2.casUstvarjeno = podatki.timestamp;
    narocilo2.lokacijaPrevzema = 'DOSTAVA_NA_DOM';

    

    return getParticipantRegistry(NS + '.Kupec')
        .then(function (kupecRegistry) {
            // doda kupca
            return kupecRegistry.addAll([kupec, kupec2]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Prodajalec');
        })
        .then(function(prodajalecRegistry) {
            // doda prodajalca
            return prodajalecRegistry.addAll([prodajalec]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Banka');
        })
        .then(function(bankaRegistry) {
            // doda banko
            return bankaRegistry.addAll([banka]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Postar');
        })
        .then(function(postarRegistry) {
            // doda postarja
            return postarRegistry.addAll([postar]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.PostnaEnota');
        })
        .then(function(postnaEnotaRegistry) {
            // doda postno enoto
            return postnaEnotaRegistry.addAll([postnaEnota]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.Izdelek');
        })
        .then(function(izdelekRegistry) {
            // doda izdelek
            return izdelekRegistry.addAll([izdelek]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.Narocilo');
        })
        .then(function(narociloRegistry) {
            // doda narocilo
            return narociloRegistry.addAll([narocilo, narocilo2]);
        });

}
