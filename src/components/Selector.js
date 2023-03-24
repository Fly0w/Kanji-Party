import React, { Component } from 'react';


class Selector extends Component {
  render(){
    let {title, id_sel, name_sel, min, max, defaultValue, func, text} = this.props;
    return(
        <div className="divcolcenter">
            <h3>{title}</h3>
            <input id={id_sel} type="range" name={name_sel} min={min} max={max} defaultValue={defaultValue} onChange={func} />
            <h4>{text}</h4>
        </div>
    );
  }
}


export default Selector;