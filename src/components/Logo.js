import React, { Component } from 'react';
import logoKanjiParty from "../Logos/logo_transparent_crop.png";


class Logo extends Component {
  render(){
    return(
        <div className="top_page">
            <img className ="logo" src={logoKanjiParty} alt="Logo Kanji Party" />
            <h2>Test your Kanji knowledge and battle with your friends !</h2>
        </div>
    );
  }
}


export default Logo;