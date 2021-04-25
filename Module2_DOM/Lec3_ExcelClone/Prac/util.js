function solveFormula(formula){
    let formComps = formula.split(" ");

    for(let i=0;i<formComps.length;i++){
        let formComp = formComps[i];

        if(formComp[0] >= 'A' && formComp[0] <= 'Z'){
            let {rowId , colId} = getRowIdColIdFromAddress(formComp);
            let cellObject = db[rowId][colId];

            let value = cellObject.value;
            formula = formula.replace(formComp , value);
        }
    }

    let computedValue = eval(formula);
    return computedValue;
}

function getRowIdColIdFromAddress(address){
    let rowId = address.substring(1)-1;
    let colId = address.charCodeAt(0)-65;

    return{
         rowId , colId
    }
}