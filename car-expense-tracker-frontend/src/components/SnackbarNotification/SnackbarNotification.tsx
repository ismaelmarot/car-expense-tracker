import React from 'react';
import { SnackBarNotificationInterface } from '../../interfaces/SnackBarNotificationInterface';
import { AlertStyled, BackdropStyled, SnackbarStyled } from './SnackbarNotificationStlyes';

const SnackbarNotification: React.FC<SnackBarNotificationInterface> = ({ open, message, severity, onClose }) => {
    return (
        <>
            <BackdropStyled
                open={open} 
                onClick={onClose}
            />
            <SnackbarStyled
                open={open}
                autoHideDuration={3000}
                onClose={onClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <AlertStyled
                    onClose={onClose} 
                    severity={severity} 
                   
                >
                    {message}
                </AlertStyled>
            </SnackbarStyled>
        </>
    );
};

export default SnackbarNotification;
