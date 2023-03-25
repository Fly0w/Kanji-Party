import React, { Component } from 'react';


class PreviewKanji extends Component {
  render(){
    return(
        <div className="previewKanji">
          <div className="kanjinow divcolcenter">
            <p>{this.props.kanji}</p>
          </div>
            
          <div className="listanswers">
            <p >List of answers</p>
            <p ></p>
          </div>         
        </div>
    );
  }
}


export default PreviewKanji;