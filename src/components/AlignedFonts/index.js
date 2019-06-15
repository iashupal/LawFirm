import React from 'react';

function AlignedFonts({children}) {
        return(
            <div className="font-div">
                <p>Fonts</p>
                <div className="font-wrapper">
                    {children}
                   
                </div>
            </div>
        )
    // }
}


export default AlignedFonts;