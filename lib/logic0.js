/**
 * Ustvari osnovne podatke za testiranje
 * @param {org.feri.model.TestniPodatki} podatki - TestniPodatki transaction
 * @transaction
 */
function testniPodatki(podatki) {

    var factory = getFactory();
    var NS = 'org.feri.model';

    // ustvari kupca1
    var kupec = factory.newResource(NS, 'Kupec', 'janeznovak@gmail.com');
    kupec.ime = 'Janez';
    kupec.priimek = 'Novak';
    kupec.kraj = 'Maribor';
    kupec.postnaSt = 2000;
    kupec.ulica = 'Glavni trg';
    kupec.hisnaSt = '1';
    kupec.stanje = 1000;
    kupec.banka = factory.newRelationship(NS, 'Banka', 'NKBM');

    // ustvari kupca2
    var kupec2 = factory.newResource(NS, 'Kupec', 'niknovak@gmail.com');
    kupec2.ime = 'Nik';
    kupec2.priimek = 'Novak';
    kupec2.kraj = 'Ljubljana';
    kupec2.postnaSt = 1000;
    kupec2.ulica = 'Glavni trg';
    kupec2.hisnaSt = '1';
    kupec2.stanje = 0;
    kupec2.banka = factory.newRelationship(NS, 'Banka', 'BANKA_001');

    // ustvari prodajalca
    var prodajalec = factory.newResource(NS, 'Prodajalec', 'Trgovina A');
    prodajalec.kraj = 'Celje';
    prodajalec.postnaSt = 3000;
    prodajalec.ulica = 'Mariborska';
    prodajalec.hisnaSt = '1';
    prodajalec.stanje = 0;
    prodajalec.vraciloDnevi = 30;

    // ustvari banko
    var banka = factory.newResource(NS, 'Banka', 'NKBM');
    banka.kraj = 'Maribor';
    banka.postnaSt = 2000;
    banka.ulica = 'Smetanova';
    banka.hisnaSt = '1';
    banka.dovoljenProcent = 50;
    banka.odobrenZnesekDo = 50;

    // ustvari postarja
    var postar = factory.newResource(NS, 'Postar', 'POSTAR_001');
    postar.ime = 'Miha';
    postar.priimek = 'Novak';

    // ustvari postno enoto
    var postnaEnota = factory.newResource(NS, 'PostnaEnota', 'Posta enota Maribor');
    postnaEnota.kraj = 'Maribor';
    postnaEnota.postnaSt = 2000;
    postnaEnota.ulica = 'Smetanova';
    postnaEnota.hisnaSt = '1';
    postnaEnota.hranjenjePosiljke = 7;
     if (postnaEnota.postarji) {
        postnaEnota.postarji.push(postar);
    } else {
        postnaEnota.postarji = [postar];
    }

    // ustvari izdelek
    var izdelek = factory.newResource(NS, 'Izdelek', 'IZDELEK_001');
    izdelek.naziv = 'Stol';
    izdelek.cena = 19.99;
    izdelek.prodajalec = factory.newRelationship(NS, 'Prodajalec', 'Trgovina A');

    // ustvari narocilo
    var narocilo = factory.newResource(NS, 'Narocilo', 'NAROCILO_001');
    for(var i = 0; i < 2; i++){
        if (narocilo.izdelki) {
            narocilo.izdelki.push(izdelek);
        } else {
            narocilo.izdelki = [izdelek];
        }
    }  
    narocilo.kupec = factory.newRelationship(NS, 'Kupec', 'janeznovak@gmail.com');
    narocilo.casUstvarjeno = podatki.timestamp;
    narocilo.lokacijaPrevzema = 'POSTNA_ENOTA';

    // ustvari narocilo2
    var narocilo2 = factory.newResource(NS, 'Narocilo', 'NAROCILO_002');
    if (narocilo2.izdelki) {
        narocilo2.izdelki.push(izdelek);
    } else {
        narocilo2.izdelki = [izdelek];
    }
    narocilo2.kupec = factory.newRelationship(NS, 'Kupec', 'niknovak@gmail.com');
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
