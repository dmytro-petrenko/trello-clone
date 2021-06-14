import React from "react";
import {ColumnContainer, ColumnTitle} from "../styles";
import AddNewItem from "./AddNewItem";
import { useAppState } from "../context/AppStateContext";
import Card from "./Card";

type ColumnProps = {
    text: string,
    index: number,
    id: string
};


const Column = ({ text, index, id }: ColumnProps) => {
    const { state, dispatch } = useAppState();

    return(
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {
                state.lists[index].tasks.map( (task, i) => (
                    <Card text={task.text} key={task.id} index={i} />
                ))
            }
            <AddNewItem
                toggleButtonText="+ Add another text"
                onAdd={ text => dispatch({ type: "ADD_TASK", payload: { text, listId: id } })}
                dark
            />
        </ColumnContainer>
        
    )
};
export default Column;