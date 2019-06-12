import React from 'react';
import { Dialog as MaterialDialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

function Dialog({ title, children, actions, onClose, open }) {
    return (
        <MaterialDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
        >
            {title && (
                <DialogTitle id="customized-dialog-title" onClose={onClose}>
                    {title}
                </DialogTitle>
            )}

            <DialogContent dividers>{children}</DialogContent>
            {actions && <DialogActions>{actions}</DialogActions>}
        </MaterialDialog>
    );
}

Dialog.propTypes = {
    title: PropTypes.string
};

export default Dialog;
