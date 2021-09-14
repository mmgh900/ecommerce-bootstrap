import * as React from "react";
import {ProductGroupLevel} from "../../types/ICategory";
import styles from './products.module.scss'
import {Button} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";


function AppliedFilterBadge(
    {
        label,
        handler,
        id,
        type
    }: {
        label: string,
        handler: (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLButtonElement>, type: ProductGroupLevel) => void,
        id: number,
        type: ProductGroupLevel
    }
) {
    return (

        <Button id={id.toString()}
                variant={'outline-secondary'}
                className={styles.listFilterBadge}
                onClick={(e) => {
                    handler(e, type)
                }}>
            {label}
            <FaTimes className={'ps-2'}/>
        </Button>

    )
}

export default AppliedFilterBadge