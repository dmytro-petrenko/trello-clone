import React, { useState} from "react";
import { AddItemButton } from "../styles";
import AddNewItemForm from "./NewItemForm"

type AddNewItemProps = {
    onAdd(text: string): void
    toggleButtonText: string
    dark?: boolean
};

const AddNewItem = (props: AddNewItemProps) => {
    const [showForm, setShowForm] = useState(false);
    const {onAdd, toggleButtonText, dark} = props;

    if(showForm) {
        //We show item creation from here
        return (
            <AddNewItemForm 
            onAdd={ text => {
                    onAdd(text)
                    setShowForm(false)
                }
            }
        />
        )
        
    };

    return(
        <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
            {toggleButtonText}
        </AddItemButton>
    )
};

export default AddNewItem;