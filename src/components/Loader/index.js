import * as React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';

function Loader({ title, color }) {
    return (
        <div style={{ margin: '0 auto' }}>
            <CircularProgress color={color} />
            {title && <p style={{ margin: '0 auto' }}>{title}</p>}
        </div>
    );
}

Loader.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string
};

export default Loader;
