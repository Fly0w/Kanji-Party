import React, { Component } from 'react';


class PreviewKanji extends Component {
  render(){
    return(
        <div className="previewKanji">
          <div className="kanjinow">
            <p>快</p>
          </div>
            
          <div className="listanswers">
            <p >List of answers</p>
            <p >算算算算算</p>
          </div>         
        </div>
    );
  }
}


export default PreviewKanji;