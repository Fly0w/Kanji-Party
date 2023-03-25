import React, { Component } from 'react';


class PreviewKanji extends Component {
  render(){
    return(
        <div className="previewKanji">
          <div className="kanjinow divcolcenter">
            <p>{this.props.kanji}</p>
          </div>
          <div className="listanswers">
            <p>List of answers</p>
            {
            this.props.answers.map(answer => 
              {return(<p>{answer}</p>);})
            }     
          </div>
        </div>
    )
  }
}


export default PreviewKanji;