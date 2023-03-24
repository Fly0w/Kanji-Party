import React, { Component } from 'react';


class InputAnswer extends Component {
  render(){
    let { onInputChange } = this.props;
    return(
        <div className=''>
            <input id="answer"className='' type="text" onChange={onInputChange}/>
        </div>
    );
  }
}


export default InputAnswer;