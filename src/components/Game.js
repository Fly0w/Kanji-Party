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
        singleKanji: '',
        singleKanjiAnswers: [],
    }
  }
  sendAnswer = () => {
    console.log("Send answer");
    document.getElementById("answer").value = "";
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
  updateKanjiList = (ListOfKanji) =>{
  //Take the first 20 elements of the shuffled list
    for (let i = ListOfKanji.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ListOfKanji[i], ListOfKanji[j]] = [ListOfKanji[j], ListOfKanji[i]];
    }
    const first20Elements = ListOfKanji.slice(0, 20);
    console.log("first 50", first20Elements);

    this.dataProcessKanjiWords(first20Elements);
  }


// Function that takes a list of Kanji in parameters. For each Kanji, returns a list starting with the kanji itself, and every triplet of information (writing, reading, meaning) for every word that exists with that Kanji
dataProcessKanjiWords = async function(listKanji) { 
  const result = [];
  for await (let kanji of listKanji){
    const allversionsKanji = [kanji];
    const promise = await fetch("https://kanjiapi.dev/v1/words/" + kanji);
    const listOfWords = await promise.json();
    for await (let word of listOfWords){
      allversionsKanji.push(
        { writing : word.variants[0].written,
          reading : word.variants.map(elem => elem.pronounced),
          meaning : word.meanings[0].glosses })
    }
    result.push(allversionsKanji);
  }
  console.log("result", result)
  return result
}








// Function that takes as a parameter a list of items with the first item being a Kanji character.Then, displays the kanji in the game interface, change the singleKanji states with the current Kanji
  displayKanjiAndPrepareAnswers = (kanji) => {
    // const carac = kanji[0];
    // const answer = kanji.slice(1, -1);
    console.log("first Kanji", kanji[0]);

    this.setState({singleKanji : kanji}, () => console.log("Current Kanji", this.state.singleKanji));
    this.setState({singleKanjiList : kanji.slice(1, -1)}, () => console.log("Current Kanji Answers", this.state.singleKanjiAnswers));
  }



  componentDidMount(){
    this.updateKanjiList(this.props.listKanji)
    
  }


  render(){
    
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
        </div>
      </div>
    );
  }
}


export default Game;