import {useEffect, useState} from "react";
import useWindowDimensions from "./useWindowDimensions";

export default function useNumberOfProductColumns() {
    enum ColumnBreakpoints {
        TWO_THREE = 768,
        THREE_FOUR = 1600,

    }
    const {height, width} = useWindowDimensions();
    const [numberOfColumns, setNumberOfColumns] = useState<number>(2)

    /**
     * Change number of columns and content loader width based on
     * document width
     */
    useEffect(() => {
        if (width < ColumnBreakpoints.TWO_THREE) {
            setNumberOfColumns(2)
        } else if (width >= ColumnBreakpoints.TWO_THREE && width < ColumnBreakpoints.THREE_FOUR) {
            setNumberOfColumns(3)
        } else if (width >= ColumnBreakpoints.THREE_FOUR) {
            setNumberOfColumns(4)
        }

    }, [width])

    return numberOfColumns;
}