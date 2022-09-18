import React from 'react';
import Preview from './Preview'

// Previews gets passed player.tetrominoes (Array of random tetrominoes) 
const Previews = ({tetrominoes}) => {

    // Fancy way of slicing off first tetromino and reversing list
    // [1, 2, 3, 4, 5] -> [5, 4, 3, 2]
    const previewTetrominoes = tetrominoes.slice(1-tetrominoes.length).reverse()

    return (
        <>
            {previewTetrominoes.map((tetromino, index) => (
                <Preview tetromino={tetromino} index={index} key={index} />
            ))
            
            }    
        </>
    )
}

export default React.memo(Previews);