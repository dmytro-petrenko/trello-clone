import React from "react";
import {ColumnContainer, ColumnTitle} from "../styles";
import AddNewItem from "./AddNewItem";

type ColumnProps = {
    text: string
}


const Column = ({
    text,
    children
}: React.PropsWithChildren<ColumnProps>) => {

    return(
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {children}
            <AddNewItem
                toggleButtonText="+ Add another text"
                onAdd={console.log}
                dark
            />
        </ColumnContainer>
        
    )
};
export default Column;