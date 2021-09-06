import {ReactNode} from "react";
import styles from "./products.module.scss";
import * as React from "react";
import {Accordion, Card} from "react-bootstrap";

function ProductsFilterAccordion(
    {
        title,
        name,
        parentId,
        children,
        initiallyOpen,
        isCollapsable,

    }:
        {
            title: string,
            name: string,
            children: ReactNode,
            parentId?: string,
            initiallyOpen?: boolean,
            isCollapsable: boolean,
        }
) {
    if (isCollapsable)
        return (
            <Accordion.Item eventKey={name} className={["my-3 shadow-sm"].join(" ")}>
                <Accordion.Header>
                    {title}
                </Accordion.Header>
                <Accordion.Body
                    className={`${styles.productFilterAccordion} p-0`}>
                    <div className="list-group list-group-flush">
                        {children}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        )
    else
        return (
            <Card className={["my-3 shadow-sm"].join(" ")}>
                <Card.Header className={'py-3 px-4'}>
                    {title}
                </Card.Header>
                <Card.Body className={'p-0'}>
                    {children}
                </Card.Body>
            </Card>
        )
}

export default ProductsFilterAccordion