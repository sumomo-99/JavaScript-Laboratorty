import React from "react";

function Contents(props) {
  console.log(props);
  return (
    <div className="w3-cell w3-padding">
      <h3>Contents</h3>
      {props.data.map((item, id) => (
        <div key={id} className="w3-cell">
        <div className="w3-card w3-margin">
          <div className="w3-blue w3-padding">{item.name}</div>
          <div className="w3-padding"><a href={item.url}>{item.url}</a></div>
          <div className="w3-padding">{item.description}</div>
          </div>
          </div>
      ))}
    </div>
  );
}

export default Contents;