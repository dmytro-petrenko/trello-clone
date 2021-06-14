import React, {createContext, useContext} from "react";
import { useReducer } from "react";
import {nanoid} from "nanoid";
import { overrideItemAtIndex, findItemIndexById, moveItem } from "../utils/arrayUtils";


type Task = {
    id: string,
    text: string
};
type List = {
    id: string,
    text: string,
    tasks: Task[]
};
export type AppState = {
    lists: List[]
}
type AppStateContextProps = {
    state: AppState,
    dispatch: React.Dispatch<Action>
};
type Action = 
    | {
        type: "ADD_LIST",
        payload: string
      }
    | {
        type: "ADD_TASK",
        payload: { text: string; listId: string }
      }
    | {
        type: "MOVE_LIST",
        payload: {
            dragIndex: number,
            hoverIndex: number
        }
      };


const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [ {id: "c0", text: "Generate app scaffold"} ]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [ {id: "c2", text: "Learn Typescript"} ]
        },
        {
            id: "2",
            text: "Done",
            tasks: [ {id: "c3", text: "Begin to use static typing"} ]
        }
    ]
};
const appStateReducer = (state: AppState, action: Action): AppState => {
    switch(action.type) {
        case "ADD_LIST": {
            return {
                ...state,
                lists: [
                    ...state.lists,
                    { id: nanoid(), text: action.payload, tasks: [] }
                ]
            }
        }
        case "ADD_TASK": {
            const targetListIndex = findItemIndexById(
                state.lists,
                action.payload.listId
            );
            const targetList = state.lists[targetListIndex];

            const updatedTargetList = {
                ...targetList,
                tasks: [
                    ...targetList.tasks,
                    {
                        id: nanoid(),
                        text: action.payload.text
                    }
                ]
            }
            return {
                ...state,
                lists: overrideItemAtIndex(
                    state.lists,
                    updatedTargetList,
                    targetListIndex
                )
            }
        }
        case 'MOVE_LIST': {
            const { dragIndex, hoverIndex} = action.payload;
            return {
                ...state,
                lists: moveItem( state.lists, dragIndex, hoverIndex)
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export  const AppStateProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appData)

    return (
        <AppStateContext.Provider value={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    )
};

export const useAppState = () => {
    return useContext(AppStateContext)
}
