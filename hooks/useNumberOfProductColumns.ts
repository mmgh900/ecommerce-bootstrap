import {useEffect, useState} from "react";
import useWindowDimensions, {BootstrapBreakpoints} from "./useWindowDimensions";

export default function useNumberOfProductColumns() {
    const {height, width} = useWindowDimensions();
    const [numberOfColumns, setNumberOfColumns] = useState<number>(2)

    /**
     * Change number of columns and content loader width based on
     * document width
     */
    useEffect(() => {
        if (width < 400) {
            setNumberOfColumns(1)
        } else if (width < BootstrapBreakpoints.sm) {
            setNumberOfColumns(2)
        }else if (width < BootstrapBreakpoints.xl) {
            setNumberOfColumns(3)
        } else  {
            setNumberOfColumns(4)
        }

    }, [width])

    return numberOfColumns;
}