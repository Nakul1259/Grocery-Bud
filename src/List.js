import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function List({ items, editItem, removeItem }) {
  return (
    <>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="list-items" key={id}>
            <span className="text">{title}</span>
            <div className="btn-container">
              <button
                onClick={() => editItem(id)}
                className="edit-btn"
                type="button"
              >
                <FaEdit />
              </button>
              <button
                type="button"
                onClick={() => removeItem(id)}
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
}

export default List;
