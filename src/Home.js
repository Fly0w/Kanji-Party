import React, { Component } from 'react';
import Selector from './components/Selector';
import Logo from './components/Logo';
import Button from './components/Button';
import Game from './components/Game'

class Home extends Component {
  constructor(){
    super();
    this.state = {
        listKanji: [],
        kanjiLevel: [],
        number_players:'1',
        difficulty: '1',
        route: 'home'
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
    this.onRouteChangeGame();
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

  onRouteChangeGame = () => {
    this.setState({route:'game'})
  }

  onRouteChangeHome = () => {
    this.setState({route:'home'})
  }

  onRouteChangeEnd = () => {
    this.setState({route:'end'})
  }

  componentDidMount(){
    this.getListKanjiAll();
    this.setNumberPlayers();
    this.setDifficulty();
  }

  render(){
    return(
    <div>
      <Logo />
    
    {this.state.route === 'home' 
    ?
    <div>
      <div className='selectors'>
        <Selector title = {"Number of Players"} id_sel={"players"} name_sel={"players"} min={"1"} max={"4"} defaultValue={"1"} func={this.setNumberPlayers} text={`${this.state.number_players} Player(s)`} />
        <Selector title = {"Difficulty"} id_sel={"difficulty"} name_sel={"difficulty"} min={"1"} max={"10"} defaultValue={"1"} func={this.setDifficulty} text={`Level ${this.state.difficulty}`} />
        <Button id_but={"start"} name_but={"start"} value={"Start Game"} func={this.getKanjiLevel}/>
      </div>
    </div>
    : this.state.route === 'game'
      ? <div>
        <Button id_but={"home"} name_but={"home"} value={"Home"} func={this.onRouteChangeHome}/>
        <Game listKanji = {this.state.kanjiLevel}/>
        </div>
      : <div>
        <Button id_but={"playagain"} name_but={"playagain"} value={"Play again"} func={this.sendAnswer} route="home"/>
        </div>
    }
    
    </div>
  );
}
}


export default Home;