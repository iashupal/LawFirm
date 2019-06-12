import React from 'react';
import PropTypes from 'prop-types';

function Grid({ contents }) {
    return (
        <div className="tab1-form tab2-form task-table-form">
            <table className="table">
                <tbody>
                    {contents.map(content => (
                        <tr>
                            <td>{content.title}</td>
                            <td>
                                <div className="form-group">
                                    {content.child}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Grid.propTypes = {
    contents: PropTypes.array.isRequired
};

Grid.defaultProps = {
    contents: []
};

export default Grid;
