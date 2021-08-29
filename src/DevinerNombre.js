import { html, css, LitElement } from 'lit';

export class DevinerNombre extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--deviner-nombre-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      max: { attribute: true },
      nombreDeVie: { attribute: true },
      nombreAlea: {type: Number},
      chaineInfo: {type: Text},

    };
  }

  constructor() {
    super();
    const nbInter = Math.random()*10;
    this.nombreAlea = Math.round(nbInter);
    this.chaineInfo = "";
  }


  __go() {


    const input = this.shadowRoot.getElementById('saisie');

    const saisie = input.value;


    if (saisie < this.nombreAlea) {

      this.nombreDeVie -= 1 ;
      this.chaineInfo = `${saisie  } est trop petit !`;

    }
    if (saisie > this.nombreAlea) {

      this.nombreDeVie -= 1 ;
      this.chaineInfo = `${saisie  } est trop grand !`;

    }

    if (saisie == this.nombreAlea){

      this.chaineInfo = `trouvé !le nombre était bien : ${  saisie}` ;
      const racine = this.shadowRoot;
      const buttonToDelete = racine.getElementById("goButton");
      const inputToDelete = racine.getElementById("saisie");
      buttonToDelete.remove();
      inputToDelete.remove();

      // demarche insertion bouton
      const btn = document.createElement("button");
      btn.innerHTML = "rejouer";
      btn.onclick = function redirect () {
        // le principe est redémarrer l'appli / component en rappelant l'url
        const url = window.location.href;
        window.location.replace(url);
      };
      racine.appendChild(btn);

    }
    if ((saisie < this.nombreAlea && this.nombreDeVie == 0) || (saisie > this.nombreAlea && this.nombreDeVie == 0) ){

      this.chaineInfo = `Perdu !le nombre était bien : ${  this.nombreAlea}` ;
      const racine = this.shadowRoot;
      const buttonToDelete = racine.getElementById("goButton");
      const inputToDelete = racine.getElementById("saisie");
      buttonToDelete.remove();
      inputToDelete.remove();

      // demarche insertion bouton
      const btn = document.createElement("button");
      btn.innerHTML = "rejouer";
      btn.onclick = function redirect () {
        // le principe est redémarrer l'appli / component en rappelant l'url
        const url = window.location.href;
        window.location.replace(url);
      };
      racine.appendChild(btn);

    }

  }



  render() {

    const {max} = this;
    const {nombreDeVie} = this;
    const nbAlea = this.nombreAlea;
    const indicationJeu = this.chaineInfo;
    return html`
      <h1>Deviner nombre entre 0 et ${max} </h1>${nbAlea}

      <h2>Nombre de vie : ${nombreDeVie}</h2>
      <br>
      <input id="saisie"  type="number" />
      <button id='goButton' @click="${this.__go}">OK</button>
      <br>
      <p>${indicationJeu}</p>


    `;
  }
}
