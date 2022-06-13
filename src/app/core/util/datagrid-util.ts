import { ClrDatagridStateInterface } from "@clr/angular";
import { _isDefined } from "./type-utils";

export function getFiltersFromDatagrid(state: ClrDatagridStateInterface): string {
    let result: any = `page=${state.page.current}&per_page=${state.page.size}`;
    if (_isDefined(state?.sort?.by) && state?.sort?.by !== '') {
        result = `${result}&by=${state.sort.by}&order=${state.sort.reverse ? 'desc' : 'asc'}`;
    }
    if (state?.filters?.length > 0) {
        state.filters.forEach(e => {
            result = `${result}&${e['property']}=${e['value']}`;
        })
    }
    return result;
}