
const initialState = {
    editPackModal: {
        editId: '',
        editOpen: false,
        editTitle: '',
        editChecked: false
    } as editPackModalType
}
type editPackModalType  =  {
    editId: string,
    editOpen: boolean,
    editTitle?: string,
    editChecked?:  boolean
}
type initialStateType = typeof initialState

export const modalReducer = (state:initialStateType = initialState, action: ActionModalType) => {
    switch (action.type) {
        case "modal/EDIT-PACK":{
            const {editId, editOpen} = action.editPackModal
            return {...state, editPackModal: {editId, editOpen} }
        }
        default:
            return state
    }
}
export type editPackModalACType = ReturnType<typeof editPackModalAC>
export const editPackModalAC = (editPackModal: editPackModalType) => ({type: 'modal/EDIT-PACK', editPackModal} as const)



export type ActionModalType = editPackModalACType