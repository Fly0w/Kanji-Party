import React, { Component } from 'react';
import Button from './Button';
import PreviewKanji from './PreviewKanji';
import InputAnswer from './InputAnswer';
import "./game.css"

class Game extends Component {
  constructor(){
    super();
    this.state = {
        input: '',
        userAnswers:[],
        userAnswersDisplay:[],
        score:0,
        kanjiList: [],
        kanjiNow:"",
        kanjiNowAnswers:[],
        kanjiNext:"",
        kanjiNextAnswers:[],
        key:0,
    }
  }

// Function that checks if the answer given by the user is correct, by checking in all the possible answers in the answers list. If the answer exists, put it in the list of answers and gives 1 point
  sendAnswer = () => {
    const input = this.state.input;
    if(this.state.userAnswers.includes(input)===false){
      for (let answer of this.state.kanjiNowAnswers){
        if(answer.reading.includes(input)) {
          this.setState(prevState => ({userAnswers:[...prevState.userAnswers, input]}));
          this.setState({score: this.state.score + 1 });
          return
        } else {
        }
      }
    } else {
      console.log("Already in the list");
    }
  }

// Function that resets the text input 
  eraseAnswer = () => {
    document.getElementById("answer").value = "";
    console.log("Erase answer")
  }

// Function that skips the current kanji to go to the next one, updating the differents states
  pass = () => {
    this.changeStateKanjiWordNow(this.state.kanjiNext)
    this.changeStateKanjiWordNext(this.state.kanjiList[this.state.key])
    this.setState({userAnswers:[]});
    this.addKeyState(1);
  }


// Function that changes the key in the state (for list of kanji indentation)
  addKeyState = (value) => {
    this.setState({key : this.state.key + value});
  }


// Function setting the state for the input box
  onInputChange = (event) => {
  this.setState({input: event.target.value})
  }



// Function that takes a list of Kanji and shuffle it. Then call functions to initiate the state of first and second Kanjis
  updateKanjiLists = (ListOfKanji) =>{
    //Take the first 20 elements of the shuffled list
      for (let i = ListOfKanji.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ListOfKanji[i], ListOfKanji[j]] = [ListOfKanji[j], ListOfKanji[i]];
      }
      const first20Elements = ListOfKanji.slice(0, 20);
      this.setState({kanjiList : first20Elements}, () => console.log("first 20",this.state.kanjiList))

      this.changeStateKanjiWordNow(first20Elements[0])
      this.changeStateKanjiWordNext(first20Elements[1])
      this.addKeyState(2) //Have to update key since the 2 first kanji are already processed
  }


// Function that makes an API call for the Kanji in parameters, and updates the states of KanjiNow with processed data
  changeStateKanjiWordNow = async function(Kanji) { 
    const result = [];

  //Loops that re-arrange the data according to desired layout
    // const allWords = [];
    const promise = await fetch("https://kanjiapi.dev/v1/words/" + Kanji);
    const listOfWords = await promise.json();
    for await (let word of listOfWords){
      result.push(
        { writing : word.variants[0].written,
          reading : word.variants.map(elem => elem.pronounced),
          meaning : word.meanings[0].glosses })
    }

    this.setState({kanjiNow : Kanji}, () => console.log("KanjiNow",this.state.kanjiNow));
    this.setState({kanjiNowAnswers : result}, () => console.log("KanjiNowAnswers",this.state.kanjiNowAnswers));
  }


// Function that makes an API call for the Kanji in parameters, and updates the states of KanjiNext with processed data
  changeStateKanjiWordNext = async function(Kanji) { 
    const result = [];

  //Loops that re-arranges the data according to desired layout
    const promise = await fetch("https://kanjiapi.dev/v1/words/" + Kanji);
    const listOfWords = await promise.json();
    for await (let word of listOfWords){
      result.push(
        { writing : word.variants[0].written,
          reading : word.variants.map(elem => elem.pronounced),
          meaning : word.meanings[0].glosses })
    }
    this.setState({kanjiNext : Kanji}, () => console.log("KanjiNext",this.state.kanjiNext));
    this.setState({kanjiNextAnswers : result});
  }


  componentDidMount(){
    this.updateKanjiLists(this.props.listKanjiHome);
  }


  render(){
    return(
      <div>
        <div className="divcolcenter">
          <h1>Score : {this.state.score}</h1>
          <PreviewKanji kanji={this.state.kanjiNow} answers={this.state.userAnswers}/>
          <InputAnswer onInputChange={this.onInputChange}/>
          <div className="buttons">
            <Button id_but={"send"} name_but={"send"} value={"Send"} func={this.sendAnswer} route="game"/>
            <Button id_but={"erase"} name_but={"erase"} value={"Erase"} func={this.eraseAnswer} route="game"/>
            <Button id_but={"pass"} name_but={"pass"} value={"Next"} func={this.pass} route="game"/>
          </div>
        </div>
      </div>
    );
  }
}


export default Game;