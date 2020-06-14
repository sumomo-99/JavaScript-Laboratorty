import React from "react";

function Categories(props) {
  console.log(props);
  console.log(props.categories);
  return (
    <div className="w3-cell w3-padding">
      <h3>Categories</h3>
      <ul className="w3-ul">
        {props.categories.map((category, id) => (
          <li key={id}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;