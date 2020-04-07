const initialValues = {
    addValue : ' ',
    updateValue : ' '
};
const reducer = (state = initialValues, action) => {
  console.log(action.type)
    switch (action.type) {
        case 'ADD':
            return {
              ...state, 
              addValue: state.addValue +" "+ action.id
            };
        case 'UPDATE':
        return {
          ...state, 
          updateValue: state.updateValue +" "+ action.id
        }
        default:
            return state
    }
  }

export default reducer