import {getMatchingValues} from './utils.js';

export default class Tile{
  constructor(destination, data, output){
    this.destination = destination;
    this.data = data;
    this.output = output
    this.render();
  }

  getRatings(num){
    let starHTMLCode = '<span>&#9733;</span>';
    let result = '';
    for(let i = 0; i < num; ++i){ 
      result += starHTMLCode;
    }
    return result;
  }

  buildString(item){
    return `
      <div class='tile'>
        <img class='tileImage' src='./assets/images/${item.image}' alt='${item.place}'/>
        <div class='tileInfos'>
          <p class='tileCountry'>${item.country}</p>
          <p class='tileCity'>${item.place}</p>
          <div class='tileExtraInfos'>
            <p class='tileLabel'>${item.label}</p>
            <div class='tileRatings'>${this.getRatings(parseInt(item.rating))}</div>
          </div>
          <div class='tileTags'>
            <span class='premium tagSkin'>${item.tags[0].label}</span>
            <span class='option tagSkin'>${item.tags[1].label}</span>
          </div>
          <a class='moreLink' href='#' title="${item.redirect_label}"></a>
        </div>    
      </div>  
    `.replace(/(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g, "$1$3");
  }

  display(){
    this.output.innerHTML = '';
    let items = !this.destination ? this.data : getMatchingValues(this.data, 'country', this.destination)

    for(let item of items){
      this.output.innerHTML += this.buildString(item);
    }
  }

  render(){
    this.display();
  }
}