import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.feri.model{
   export class Naslov {
      kraj: string;
      postnaSt: number;
      ulica: string;
      hisnaSt: string;
   }
   export class Kupec extends Participant {
      kupecID: string;
      ime: string;
      priimek: string;
      email: string;
      naslov: Naslov;
      stanje: number;
      banka: Banka;
      zgodovinaPlacil: Posiljka[];
   }
   export class Prodajalec extends Participant {
      prodajalecID: string;
      naziv: string;
      naslov: Naslov;
      stanje: number;
      vraciloDnevi: number;
   }
   export class Banka extends Participant {
      bankaID: string;
      naziv: string;
      naslov: Naslov;
      komitenti: Kupec[];
      dovoljenProcent: number;
      odobrenZnesekDo: number;
   }
   export class PostnaEnota extends Participant {
      postnaEnotaID: string;
      naziv: string;
      naslov: Naslov;
      hranjenjePosiljke: number;
      postarji: Postar[];
   }
   export class Postar extends Participant {
      postarID: string;
      ime: string;
      priimek: string;
   }
   export class Izdelek extends Asset {
      izdelekID: string;
      naziv: string;
      kolicina: number;
      cena: number;
      prodajalec: Prodajalec;
   }
   export class Narocilo extends Asset {
      narociloID: string;
      izdelki: Izdelek[];
      kupec: Kupec;
      celotenZnesek: number;
      stanjeNarocila: StanjeNarocila;
      casUstvarjeno: Date;
      lokacijaPrevzema: LokacijaPrevzema;
   }
   export enum LokacijaPrevzema {
      DOSTAVA_NA_DOM,
      POSTNA_ENOTA,
   }
   export enum StanjeNarocila {
      NEODLOCENO,
      ODOBRENO,
      ZAVRNJENO,
   }
   export class Posiljka extends Asset {
      posiljkaID: string;
      narocilo: Narocilo;
      postar: Postar;
      stanjePosiljke: StanjePosiljke;
      zadnjaSprememba: Date;
      postnaEnota: PostnaEnota;
   }
   export enum StanjePosiljke {
      POTEKA,
      NEPLACANO,
      PLACANO,
      ZAVRNJENO,
      NA_POSTNI_ENOTI,
   }
   export enum OdlocitevKupca {
      PLACILO,
      NEPLACILO,
      ZAVRNITEV,
   }
   export class OddajaNarocila extends Transaction {
      narocilo: Narocilo;
      postnaEnota: PostnaEnota;
   }
   export class PlaciloNaDomu extends Transaction {
      posiljka: Posiljka;
      postar: Postar;
      namenStranke: OdlocitevKupca;
   }
   export class VraciloPosiljke extends Transaction {
      posiljka: Posiljka;
   }
   export class PrihodNaPostnoEnoto extends Transaction {
      posiljka: Posiljka;
      postar: Postar;
   }
   export class PrevzemNaPostniEnoti extends Transaction {
      posiljka: Posiljka;
      namenStranke: OdlocitevKupca;
   }
   export class TestniPodatki extends Transaction {
   }
   export class NarociloEvent extends Event {
      sporocilo: string;
      narocilo: Narocilo;
   }
   export class PlaciloEvent extends Event {
      sporocilo: string;
      posiljka: Posiljka;
   }
   export class VraciloEvent extends Event {
      sporocilo: string;
      posiljka: Posiljka;
   }
   export class PrihodPosiljkeEvent extends Event {
      sporocilo: string;
      posiljka: Posiljka;
   }
// }
