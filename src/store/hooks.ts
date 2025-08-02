import { useAppDispatch, useAppSelector } from "."
import { filterAdverts } from "./actions"
import { filtersRedux } from "./selectors"


export const useResetFilter = () => {
    const filters = useAppSelector(filtersRedux)
    const dispatch = useAppDispatch()
    const [start,end] = filters.range
    const temp = { ...filters,name:'',price:[start,end] as [number,number],tags:[] }
    delete temp.sale
    return function () {
        dispatch(filterAdverts(temp))
    }
}