import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Card from '../../Components/Card/Card';
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";
import "./Board.css";

function Board(props) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();
        const cardData = JSON.parse(event.dataTransfer.getData("text/plain"));
        // Check if the card belongs to another board
        if (cardData.boardId !== props.board.id) {
            // Call the dragEnded function to move the card to this board
            props.dragEnded(cardData.boardId, cardData.id);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Prevent default to allow drop
    };

    return (
        <div
            className="board"
            onDragOver={handleDragOver} // Allow cards to be dragged over this board
            onDrop={handleDrop} // Handle the drop event
        >
            <div className="board_header">
                {props.board.image && (
                    <img
                        src={props.board.image}
                        alt={props.board.title}
                        style={{ width: '50px', height: '50px', borderRadius: '8px', marginRight: '10px' }} // Adjust the style as needed
                    />
                )}
                <p className="board_header_title">
                    {props.board?.title}
                    <span>{props.board?.cards?.length || 0}</span>
                </p>
                <div
                    className="board_header_title_more"
                    onClick={() => setShowDropdown(true)}
                >
                    <MoreHorizontal />
                    {showDropdown && (
                        <Dropdown
                            class="board_dropdown"
                            onClose={() => setShowDropdown(false)}
                        >
                            <p onClick={() => props.removeBoard()}>Delete Board</p>
                        </Dropdown>
                    )}
                </div>
            </div>
            <div className="board_cards custom-scroll">
                {props.board?.cards?.map((item) => (
                    <Card
                        key={item.id}
                        card={item}
                        boardId={props.board.id}
                        removeCard={props.removeCard}
                        dragEntered={props.dragEntered}
                        dragEnded={props.dragEnded}
                        updateCard={props.updateCard}
                    />
                ))}
                <Editable
                    text="+ Add Card"
                    placeholder="Enter Card Title"
                    displayClass="board_add-card"
                    editClass="board_add-card_edit"
                    onSubmit={(value) => props.addCard(props.board?.id, value)}
                />
            </div>
        </div>
    );
}

export default Board;
