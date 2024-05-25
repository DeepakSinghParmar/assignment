import { useSelector } from "react-redux"

// custom hooks for return data from redux
export const useAlldata = () => {
    return useSelector(state => state.AllData.data)
}