import React from 'react'
import ContentLoader from 'react-content-loader'

const CatalogMagic = ({
                          width = 887.750,
                          row = 2,
                          column = 3,
                          padding = 20,
                          borderRadius = 5,

                          ...props
                      }) => {
    const list = []

    let height

    for (let i = 1; i <= row; i++) {
        for (let j = 0; j < column; j++) {
            const itemWidth = (width - padding * (column + 1)) / column

            const x = padding + j * (itemWidth + padding)

            const height1 = 200

            const height2 = 20

            const height3 = 20

            const height4 = 30

            const space =
                 height1 + (padding / 2 + height2) + (padding / 2 + height3) + height4 + 80 + padding * 4

            const y1 =  (i > 1 ? padding * 2 : 0) + space * (i - 1)

            const y2 = y1 + padding + height1

            const y3 = y2 + padding / 2 + height2

            const y4 = y3 + padding / 2 + height3 + 80

            list.push(
                <React.Fragment key={`${i}${j}`}>
                    <rect
                        x={x}
                        y={y1}
                        rx={borderRadius}
                        ry={borderRadius}
                        width={itemWidth}
                        height={height1}
                    />
                    <rect x={x} y={y2} rx={0} ry={0} width={itemWidth} height={height2}/>
                    <rect
                        x={x}
                        y={y3}
                        rx={0}
                        ry={0}
                        width={itemWidth * 0.6}
                        height={height3}
                    />
                    <rect
                        x={x}
                        y={y4}
                        rx={0}
                        ry={0}
                        width={itemWidth * 0.6 - padding}
                        height={height4}
                    />
                    <rect
                        x={x + itemWidth * 0.6}
                        y={y4}
                        rx={0}
                        ry={0}
                        width={itemWidth * 0.4}
                        height={height4}
                    />
                </React.Fragment>
            )

            if (i === row) {
                height = y4 + height4
            }
        }
    }

    return (
        <ContentLoader
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            rtl={true}
            backgroundColor="#cbe2d9"
            foregroundColor="#edf3f2"
            {...props}
        >
            {list}
        </ContentLoader>
    )
}



export default CatalogMagic
