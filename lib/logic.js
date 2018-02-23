/**
 * Pred oddajo narocila, banka pregleda stanje kupca, pretekla placila, nato odobri ali zavrne narocilo
 * @param {org.feri.model.OddajaNarocila} oddajaNarocila - OddajaNarocila transaction
 * @transaction
 */
function oddajaNarocila(oddajaNarocila) {

    var narocilo = oddajaNarocila.narocilo;
    var kupec = narocilo.kupec;
    var banka = kupec.banka;
    var postnaEnota = oddajaNarocila.postnaEnota;
    var factory = getFactory();
    var NS = 'org.feri.model';

    var narociloEvent = factory.newEvent(NS, 'NarociloEvent');
    narociloEvent.narocilo = narocilo;

    // kupec so doda v bancno bazo kot uporabnik, ki uporablja placilo po povzetju 
    if (banka.komitenti) {
        if (!banka.komitenti.includes(kupec)) {
            banka.komitenti.push(kupec);
        }
    } else {
        banka.komitenti = [kupec];
    }

    // preveri ali je narocilo ze bilo obdelano
    if (narocilo.stanjeNarocila != 'ODOBRENO' && narocilo.stanjeNarocila != 'ZAVRNJENO') {
        // izracuna celoten znesek za placilo
        var i;
        var dolzina = narocilo.izdelki.length;
        narocilo.celotenZnesek = 0;
        for (i = 0; i < dolzina; i++) {
            narocilo.celotenZnesek += narocilo.izdelki[i].cena;
        }
        console.log('Znesek za placilo: ' + narocilo.celotenZnesek);
        
        // izracun procent neplacanih posiljk
        var skupaj = 0;
        var procentNeplacanih = 0;

        if (kupec.zgodovinaPlacil != undefined){
            console.log(kupec.zgodovinaPlacil.length);

            dolzina = kupec.zgodovinaPlacil.length;
            var stNeplacanih = 0;
            for (i = 0; i < dolzina; i++) {
                if (kupec.zgodovinaPlacil[i].stanjePosiljke == 'PLACANO') {
                    skupaj++;
                } else if (kupec.zgodovinaPlacil[i].stanjePosiljke == 'NEPLACANO'){
                    stNeplacanih++;
                    skupaj++;
                }
            }
    
            procentNeplacanih = (stNeplacanih/skupaj) * 100; 
        }

        // na podlagi preteklih placil/neplacil in zahtev banke se odobri/zavrne narocilo
        if (banka.dovoljenProcent > procentNeplacanih || skupaj < 5 || banka.odobrenZnesek > narocilo.celotenZnesek) {
            narocilo.stanjeNarocila = 'ODOBRENO';

            // event, ki sporoci kupcu, da je narocilo sprejeto
            narociloEvent.sporocilo = 'Narocilo ' + narocilo.$identifier + ' je sprejeto';
            console.log(narociloEvent.sporocilo);
            emit(narociloEvent);

            // ustvari posiljko in jo poslje na postno enoto
            var st = narocilo.$identifier.slice(9);
            var posiljka = factory.newResource(NS, 'Posiljka', 'POSILJKA_' + st);
            posiljka.narocilo = factory.newRelationship(NS, 'Narocilo', narocilo.$identifier);
            posiljka.stanjePosiljke = 'NA_POSTNI_ENOTI';
            posiljka.zadnjaSprememba = oddajaNarocila.timestamp;
            posiljka.postnaEnota = factory.newRelationship(NS, 'PostnaEnota', postnaEnota.$identifier);

            console.log('Prodajalec je odposlal posiljko ' + posiljka.$identifier + ' ');

            return getAssetRegistry(NS + '.Posiljka')
                .then(function (posiljkaRegistry) {
                    // doda posiljko
                    return posiljkaRegistry.addAll([posiljka]);
                })
                .then(function () {
                    return getParticipantRegistry(NS + '.Banka')
                })
                .then(function (bankaRegistry) {
                    // posodobi komitente
                    return bankaRegistry.update(banka);
                })
                .then(function () {
                    return getAssetRegistry(NS + '.Narocilo')
                })
                .then(function (narociloRegistry) {
                    // posodobi stanje narocila
                    return narociloRegistry.update(narocilo);
                });

        } else {
            narocilo.stanjeNarocila = 'ZAVRNJENO';

            // event, ki sporoci kupcu, da je narocilo zavrjeno
            narociloEvent.sporocilo = 'Narocilo ' + narocilo.$identifier + ' je zavrjeno';
            console.log(narociloEvent.sporocilo);
            emit(narociloEvent);

            return getAssetRegistry(NS + '.Narocilo')
                .then(function (narociloRegistry) {
                    // posodobi stanje narocila
                    return narociloRegistry.update(narocilo);
                })
                .then(function () {
                    return getParticipantRegistry(NS + '.Banka')
                })
                .then(function (bankaRegistry) {
                    // posodobi komitente
                    return bankaRegistry.update(banka);
                });

        }
    } else {
        narociloEvent.sporocilo = 'Narocilo ' + narocilo.$identifier + ' je ze bilo obdelano';
        console.log(narociloEvent.sporocilo);
        emit(narociloEvent);
    }

}

/**
 * Prihod posiljke na postno enoto in nadaljnje posredovanje
 * @param {org.feri.model.PrihodNaPostnoEnoto} prihod - PrihodNaPostnoEnoto transaction
 * @transaction
 */
function prihodNaPostnoEnoto(prihod) {

    var posiljka = prihod.posiljka;
    var postar = prihod.postar;
    var zadnjaSprememba = posiljka.zadnjaSprememba

    var factory = getFactory();
    var NS = 'org.feri.model';

    var prihodEvent = factory.newEvent(NS, 'PrihodPosiljkeEvent');
    prihodEvent.posiljka = posiljka;
    // če je kupec izbral dostavo na postno enoto, ga obvestimo
    if (posiljka.narocilo.lokacijaPrevzema == 'POSTNA_ENOTA') {
        
        posiljka.stanjePosiljke = 'NA_POSTNI_ENOTI';
        zadnjaSprememba = prihod.timestamp;

        prihodEvent.sporocilo = 'Posiljka ' + posiljka.$identifier + ' je prispela na postno enoto ' + posiljka.postnaEnota.$identifier;
        console.log(prihodEvent.sporocilo);
        emit(prihodEvent);

    }
    //posiljko predamo postarju, ki jo dostavi kupcu 
    else if (posiljka.narocilo.lokacijaPrevzema == 'DOSTAVA_NA_DOM') {
        posiljka.stanjePosiljke = 'POTEKA';
        posiljka.postar = postar;
        zadnjaSprememba = prihod.timestamp;

    }

    return getAssetRegistry(NS + '.Posiljka')
    .then(function (narociloRegistry) {
        // posodobi stanje posiljke
        return narociloRegistry.update(posiljka);
    });

}

/**
 * Postar dostavi posiljko, nato kupec placa, zavrne posiljko ali pa ne placa, ker nima denarja
 * @param {org.feri.model.PlaciloNaDomu} placilo - PlaciloNaDomu transaction
 * @transaction
 */
function placiloNaDomu(placilo) {

    var posiljka = placilo.posiljka;

    var factory = getFactory();
    var NS = 'org.feri.model';

    var placiloEvent = factory.newEvent(NS, 'PlaciloEvent');
    placiloEvent.posiljka = posiljka;

    // preveri vrsto dostave
    if (posiljka.narocilo.lokacijaPrevzema == 'DOSTAVA_NA_DOM') {
        // posiljka je lahko obdelana samo enkrat
        if (posiljka.stanjePosiljke == 'POTEKA') {

            var kupec = posiljka.narocilo.kupec;
            var prodajalec = posiljka.narocilo.izdelki[0].prodajalec;
            var znesekZaPlacilo = posiljka.narocilo.celotenZnesek;
            var postar = placilo.postar;
            var zakljucek = placilo.namenStranke;

            console.log('Znesek za placilo: ' + znesekZaPlacilo);
            console.log('Kupec: ' + kupec.$identifier + ' - trenutno stanje: ' + kupec.stanje);

            // kupec ima dovolj denarja
            if (kupec.stanje >= znesekZaPlacilo) {
                // kupec placa ali zavrne posiljko
                if (zakljucek == 'PLACILO') {
                    kupec.stanje -= znesekZaPlacilo;

                    console.log('Kupec: ' + kupec.$identifier + ' - novo stanje: ' + kupec.stanje);

                    prodajalec.stanje += znesekZaPlacilo;

                    posiljka.stanjePosiljke = 'PLACANO';
                    posiljka.zadnjaSprememba = placilo.timestamp;

                    // event, ki sporoci uspesno placilo
                    placiloEvent.sporocilo = 'Placilo uspesno izvedeno';
                    console.log(placiloEvent.sporocilo);
                    emit(placiloEvent);
                }
                // kupec ima denar, vendar ni zadovoljen z posiljko
                else if (zakljucek == 'ZAVRNITEV') {
                    posiljka.stanjePosiljke = 'ZAVRNJENO';
                    posiljka.zadnjaSprememba = placilo.timestamp;

                    // event, ki sporoci zavrnitev posiljke pred placilom
                    placiloEvent.sporocilo = 'Kupec je zavrnil posiljko ' + posiljka.$identifier + ', ki se bo vrnila prodajalcu';
                    console.log(placiloEvent.sporocilo);
                    emit(placiloEvent);
                }
            }
            // kupec nima dovolj denarja za placilo, posiljka se vrne na postno enoto za doloceno stevilo dni pred vrnitvijo prodajalcu
            else {
                posiljka.stanjePosiljke = 'NA_POSTNI_ENOTI';
                posiljka.zadnjaSprememba = placilo.timestamp;

                // event, ki sporoci, da kupec nima dovolj denarja na racunu
                placiloEvent.sporocilo = 'Kupec nima dovolj sredstev na racunu, na voljo ima 7 dni, da poravna obveznosti na postni enoti';
                emit(placiloEvent);

            }
            // posiljki se doda postar, da vemo kdo je dostavil posiljko
            posiljka.postar = postar;

            // placilo/neplacilo, zavrnitev posiljke se zabelezi
            if (kupec.zgodovinaPlacil) {
                kupec.zgodovinaPlacil.push(posiljka);
            } else {
                kupec.zgodovinaPlacil = [posiljka];
            }

            return getParticipantRegistry(NS + '.Kupec')
                .then(function (kupecRegistry) {
                    // posodobi stanje kupca
                    return kupecRegistry.update(kupec);
                })
                .then(function () {
                    return getParticipantRegistry(NS + '.Prodajalec');
                })
                .then(function (prodajalecRegistry) {
                    // posodobi stanje prodajalca
                    return prodajalecRegistry.update(prodajalec);
                })
                .then(function () {
                    return getAssetRegistry(NS + '.Posiljka');
                })
                .then(function (posiljkaRegistry) {
                    // posodobi stanje posiljke
                    return posiljkaRegistry.update(posiljka);
                });
        } else {
            // event, ce je posiljka ze bila obdelana
            placiloEvent.sporocilo = 'Posiljka je ze bila obdelana';
            console.log(placiloEvent.sporocilo);
            emit(placiloEvent);
        }
    }

}

/**
 * kupec je ze placal posiljko, vendar kasneje vrne posiljko v dogovorjenem roku
 * @param {org.feri.model.VraciloPosiljke} vrnitev - VraciloPosiljke transaction
 * @transaction
 */
function vraciloPosiljke(vrnitev) {

    var posiljka = vrnitev.posiljka;
    var kupec = posiljka.narocilo.kupec;
    var prodajalec = posiljka.narocilo.izdelki[0].prodajalec;
    var datumPlacila = posiljka.zadnjaSprememba;
    var stDniZaVracilo = prodajalec.vraciloDnevi;

    console.log(stDniZaVracilo);

    var rokVracila = datumPlacila;
    rokVracila.setDate(rokVracila.getDate() + stDniZaVracilo);

    console.log(rokVracila);

    var factory = getFactory();
    var NS = 'org.feri.model';

    var vraciloEvent = factory.newEvent(NS, 'VraciloEvent');
    vraciloEvent.posiljka = posiljka;

    // za to moznost vracilo, mora kupec ze placati prodajalcu
    if (posiljka.stanjePosiljke == 'PLACANO') {
        // preverimo ali je vracilo pravocasno
        if (vrnitev.timestamp < rokVracila) {

            posiljka.stanjePosiljke = 'ZAVRNJENO';
            posiljka.zadnjaSprememba = vrnitev.timestamp;

            kupec.stanje += posiljka.narocilo.celotenZnesek;

            prodajalec.stanje -= posiljka.narocilo.celotenZnesek;

            vraciloEvent.sporocilo = 'Posiljka je bila uspesno vrnjena';
            console.log(vraciloEvent.sporocilo);
            emit(vraciloEvent);

            return getParticipantRegistry(NS + '.Kupec')
                .then(function (kupecRegistry) {
                    // posodobi stanje kupca
                    return kupecRegistry.update(kupec);
                })
                .then(function () {
                    return getParticipantRegistry(NS + '.Prodajalec');
                })
                .then(function (prodajalecRegistry) {
                    // posodobi stanje prodajalca
                    return prodajalecRegistry.update(prodajalec);
                })
                .then(function () {
                    return getAssetRegistry(NS + '.Posiljka');
                })
                .then(function (posiljkaRegistry) {
                    // posodobi stanje posiljke
                    return posiljkaRegistry.update(posiljka);
                });

        } else {
            // event, ce je rok za vracilo ze potekel
            vraciloEvent.sporocilo = 'Rok za vracilo posiljke je ze potekel';
            console.log(vraciloEvent.sporocilo);
            emit(vraciloEvent);
        }
    }

}

/**
 * kupec zaradi razlicnih razlogov prevzame posiljko na postni enoti
 * @param {org.feri.model.PrevzemNaPostniEnoti} prevzem - PrevzemNaPostniEnoti transaction
 * @transaction
 */
function prevzemNaPostniEnoti(prevzem) {

    var posiljka = prevzem.posiljka;
    var kupec = posiljka.narocilo.kupec;
    var postnaEnota = prevzem.posiljka.postnaEnota;

    var factory = getFactory();
    var NS = 'org.feri.model';

    var placiloEvent = factory.newEvent(NS, 'PlaciloEvent');
    placiloEvent.posiljka = posiljka;

    var rokPlacila = posiljka.zadnjaSprememba;
    rokPlacila.setDate(rokPlacila.getDate() + postnaEnota.hranjenjePosiljke);

    console.log(rokPlacila);

    if (prevzem.timestamp < rokPlacila) {

        // posiljka je lahko obdelana samo ce je na postni enoti
        if (posiljka.stanjePosiljke == 'NA_POSTNI_ENOTI' || posiljka.narocilo.lokacijaPrevzema == 'POSTNA_ENOTA') {

            var prodajalec = posiljka.narocilo.izdelki[0].prodajalec;
            var zakljucek = prevzem.namenStranke;
            var znesekZaPlacilo = posiljka.narocilo.celotenZnesek;

            console.log('Znesek za placilo: ' + znesekZaPlacilo);
            console.log('Kupec: ' + kupec.$identifier + ' - trenutno stanje: ' + kupec.stanje);

            // kupec ima dovolj denarja
            if (kupec.stanje >= znesekZaPlacilo) {
                // kupec placa ali zavrne posiljko
                if (zakljucek == 'PLACILO') {
                    kupec.stanje -= znesekZaPlacilo;

                    console.log('Kupec: ' + kupec.$identifier + ' - novo stanje: ' + kupec.stanje);

                    prodajalec.stanje += znesekZaPlacilo;

                    posiljka.stanjePosiljke = 'PLACANO';
                    posiljka.zadnjaSprememba = prevzem.timestamp;

                    // event, ki sporoci uspesno placilo
                    placiloEvent.sporocilo = 'Placilo uspesno izvedeno';
                    console.log(placiloEvent.sporocilo);
                    emit(placiloEvent);
                }
                // kupec ima denar, vendar ni zadovoljen z posiljko
                else if (zakljucek == 'ZAVRNITEV') {
                    posiljka.stanjePosiljke = 'ZAVRNJENO';
                    posiljka.zadnjaSprememba = prevzem.timestamp;

                    // event, ki sporoci zavrnitev posiljke pred placilom
                    placiloEvent.sporocilo = 'Kupec je zavrnil posiljko ' + posiljka.$identifier + ', ki se bo vrnila prodajalcu';
                    console.log(placiloEvent.sporocilo);
                    emit(placiloEvent);
                }
            }

            // placilo, zavrnitev posiljke se zabelezi
            if (kupec.zgodovinaPlacil) {
                kupec.zgodovinaPlacil.push(posiljka);
            } else {
                kupec.zgodovinaPlacil = [posiljka];
            }

            return getParticipantRegistry(NS + '.Kupec')
                .then(function (kupecRegistry) {
                    // posodobi stanje kupca
                    return kupecRegistry.update(kupec);
                })
                .then(function () {
                    return getParticipantRegistry(NS + '.Prodajalec');
                })
                .then(function (prodajalecRegistry) {
                    // posodobi stanje prodajalca
                    return prodajalecRegistry.update(prodajalec);
                })
                .then(function () {
                    return getAssetRegistry(NS + '.Posiljka');
                })
                .then(function (posiljkaRegistry) {
                    // posodobi stanje posiljke
                    return posiljkaRegistry.update(posiljka);
                });
        } else {
            // event, ce je posiljka ze bila obdelana
            placiloEvent.sporocilo = 'Posiljka je ze bila obdelana';
            console.log(placiloEvent.sporocilo);
            emit(placiloEvent);
        }
    } else {
        posiljka.stanjePosiljke = 'NEPLACANO';
        posiljka.zadnjaSprememba = prevzem.timestamp;

        // neplacilo posiljke se zabelezi
        if (kupec.zgodovinaPlacil) {
            kupec.zgodovinaPlacil.push(posiljka);
        } else {
            kupec.zgodovinaPlacil = [posiljka];
        }

        placiloEvent.sporocilo = 'Posiljka ni bila placana v predvidenem roku in je bila vrnjena prodajalcu';
        console.log(placiloEvent.sporocilo);
        emit(vraciloEvent);

        return getParticipantRegistry(NS + '.Kupec')
            .then(function (kupecRegistry) {
                // posodobi stanje kupca
                return kupecRegistry.update(kupec);
            })
            .then(function () {
                return getAssetRegistry(NS + '.Posiljka');
            })
            .then(function (posiljkaRegistry) {
                // posodobi stanje posiljke
                return posiljkaRegistry.update(posiljka);
            });
    }

}
