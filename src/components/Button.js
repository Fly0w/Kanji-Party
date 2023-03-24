import React, { Component } from 'react';


class Button extends Component {
  render(){
    let { id_but, name_but, value, func } = this.props;
    return(
        <input className="button" id={id_but} type="button" name={name_but} value={value} onClick={func} />
    );
  }
}


export default Button;