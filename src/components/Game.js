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
        kanjiList: [],
        singleKanji: {},
    }
  }
  sendAnswer = () => {
    console.log("Send answer")
  }

  eraseAnswer = () => {
    document.getElementById("answer").value = "";
    console.log("Erase answer")
  }

  pass = () => {
    console.log("Pass")
  }

  // Function setting the state for the input box
  onInputChange = (event) => {
  this.setState({input: event.target.value}, () => console.log(this.state.input))
  }

// Function that take random Kanji in the list in parameters, and make API calls to get the information of all the Kanjis selected. For a given Kanji, and for every word composed of that Kanji, extracts : 1.Kanji Writing 2.Reading(s) 3.Meaning(s). These Triplets will be put in objects
      // Desired Output : 
      // result = [
      //    "七", 
      //        {writing : '七十', 
      //         pronounciation : ['しちじゅう', 'ななじゅう', 'ななそ'], 
      //         meaning : ['seventy']},
      //        {writing : '七面倒', 
      //         pronounciation : ['しちめんどう'], 
      //         meaning : ['great trouble', 'difficulty']},
      //         ..........
      //         ]
  updateKanjiList(ListOfKanji){
    const result = [];

//Take the first 50 elements of the shuffled list
    for (let i = ListOfKanji.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ListOfKanji[i], ListOfKanji[j]] = [ListOfKanji[j], ListOfKanji[i]];
    }
    const first50Elements = ListOfKanji.slice(0, 50);
  

//For every element, make an API call, get the response, and transform the object into the desired format (triplets). Create one list for every kanji
    for (let kanji of first50Elements){
      let allversionsKanji = [kanji];
      fetch("https://kanjiapi.dev/v1/words/" + kanji)
        .then(response => response.json())
        .then(response => {
          for (let element of response){
            allversionsKanji.push(
              {writing : element.variants[0].written,
                reading : element.variants.map(elem => elem.pronounced) ,
                meaning : element.meanings[0].glosses }) 
          };
          result.push(allversionsKanji)
        })
        .then(response => this.setState({kanjiList: result}, () => {console.log(this.state.kanjiList)}))
    }
  }

  componentDidMount(){
    this.updateKanjiList(this.props.listKanji);
  }


  render(){
    // const { listKanji } = this.props;
    return(
      <div>
        
        <div className="divcolcenter">
          <PreviewKanji />
          <InputAnswer onInputChange={this.onInputChange}/>
          <div className="buttons">
            <Button id_but={"send"} name_but={"send"} value={"Send"} func={this.sendAnswer} route="game"/>
            <Button id_but={"erase"} name_but={"erase"} value={"Erase"} func={this.eraseAnswer} route="game"/>
            <Button id_but={"pass"} name_but={"pass"} value={"Pass"} func={this.pass} route="game"/>
          </div>
          {/* <p>{listKanji}</p> */}
        </div>
      </div>
    );
  }
}


export default Game;