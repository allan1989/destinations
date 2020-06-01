import Select from './js/select.js';
import Tile from './js/tile.js';
import {destinations} from './data/destinations.js';

let dropdown = document.getElementById('select');
let output = document.getElementById('content');

new Select('select', destinations);

new Tile('', destinations, output);

dropdown.addEventListener('change', (e) => {
  new Tile(e.target.value, destinations, output)
});