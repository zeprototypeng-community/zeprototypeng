
export function bindDataRelation(inputData: any, relation: string, key: any): any {
    let data = [];
    inputData?.[key].forEach((element: any) => {
        let objElement = {};
        objElement[key] = element;
        data.push(objElement);
    });
    let obj = {};
    obj[relation] = data;

    return Object.assign(inputData, obj);
}

export function unBindDataRelation(inputData: any, relation: string, key: any): any {
    let data = [];
    inputData?.[relation].forEach((element: any) => {
        data.push(element[key]);
    });
    let obj = {};
    obj[key] = data;

    return Object.assign(inputData, obj);
}

export function bindUpdateDataRelation(singleData: any, inputData: any, relation: string, key: any): any {
    let data = [];
    inputData?.[relation].forEach((element: any) => {
        data.push(element[key]);
    });
    let obj = {};
    obj[key] = data;

    return Object.assign(inputData, obj);
}