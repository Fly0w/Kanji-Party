import React, { Component } from 'react';
import logoKanjiParty from "../Logos/logo_transparent_crop.png";

class Home extends Component {
  constructor(){
    super();
    this.state = {
        listKanji: [],
        kanjiLevel: [],
        number_players:'1',
        difficulty: '1'
    }
  }

  //function that gets the value of the input for number of players, and changes the state
  setNumberPlayers = () => {
    const input = document.querySelector("#players");
    input.addEventListener("input", (event) => {
      this.setState({number_players: event.target.value}, () =>{console.log("Number of players",this.state.number_players)});
      });
  }
  //function that gets the value of the input for difficulty, and changes the state
  setDifficulty = () => {
    const input = document.querySelector("#difficulty");
    input.addEventListener("input", (event) => {
      this.setState({difficulty: event.target.value}, () =>{console.log("Level",this.state.difficulty)});
      });
  }
  //function that creates the list of kanji according to the selected level, and send it to the state
  getKanjiLevel = () => {
    const level = this.state.difficulty;
    let list = [];

    if (level === "1"){
      list = list.concat(this.state.listKanji[0]);
    } else if (level === "2"){
      list = list.concat(this.state.listKanji[0],this.state.listKanji[1]);
    } else if (level === "3"){
      list = list.concat(this.state.listKanji[0],this.state.listKanji[1],this.state.listKanji[2]);
    } else if (level === "4"){
      list = list.concat(this.state.listKanji[1],this.state.listKanji[2]);
    } else if (level === "5"){
      list = list.concat(this.state.listKanji[1],this.state.listKanji[2],this.state.listKanji[3]);
    } else if (level === "6"){
      list = list.concat(this.state.listKanji[2],this.state.listKanji[3],this.state.listKanji[4]);
    } else if (level === "7"){
      list = list.concat(this.state.listKanji[3],this.state.listKanji[4]);
    } else if (level === "8"){
      list = list.concat(this.state.listKanji[3],this.state.listKanji[4],this.state.listKanji[5]);
    } else if (level === "9"){
      list = list.concat(this.state.listKanji[3],this.state.listKanji[4],this.state.listKanji[5], this.state.listKanji[6]);
    } else if (level === "10"){
      list = list.concat(this.state.listKanji[4],this.state.listKanji[5], this.state.listKanji[6]);
    }

    this.setState({ kanjiLevel : list }, () => {console.log("List of selected Kanji", this.state.kanjiLevel)}
    );
  }

//function that gets all the Kanjis from the API
  getListKanjiAll = () => {
      const listLinkApi = [
      "https://kanjiapi.dev/v1/kanji/grade-1",
      "https://kanjiapi.dev/v1/kanji/grade-2",
      "https://kanjiapi.dev/v1/kanji/grade-3",
      "https://kanjiapi.dev/v1/kanji/grade-4",
      "https://kanjiapi.dev/v1/kanji/grade-5",
      "https://kanjiapi.dev/v1/kanji/grade-6",
      "https://kanjiapi.dev/v1/kanji/grade-8",
    ];

    Promise.all(listLinkApi.map(url=>
      fetch(url)
      .then(response => response.json())))
    .then(data => this.setState({listKanji: data}, () => {
      console.log("List of all Kanji",this.state.listKanji)
    }
    ));
  }


  componentDidMount(){
    this.getListKanjiAll();
    this.getKanjiLevel();
    this.setNumberPlayers();
    this.setDifficulty();
  }

  render(){
    return(
    <div>
      <div className="top_page">
        <img className ="logo" src={logoKanjiParty} alt="Logo Kanji Party" />
        <h2>Test your Kanji knowledge and battle with your friends !</h2>
      </div>

      <div className='selectors'>
        <h3>Number of Players</h3>
        <input id="players" type="range" name="players" min="1" max="4" defaultValue={"1"} onChange={this.setNumberPlayers} />
        <h4 id="value_players">{`${this.state.number_players} Player(s)`} </h4>
        <h3>Difficulty</h3>
        <input id="difficulty" type="range" name="difficulty" min="1" max="10" defaultValue={"1"} onChange={this.setDifficulty} />
        <h4 id="value_difficulty">{this.state.difficulty}</h4>
        <input id="start" type="button" name="start" value="Start Game" onClick={this.getKanjiLevel}/>
      </div>
    </div>
  );
}
}


export default Home;