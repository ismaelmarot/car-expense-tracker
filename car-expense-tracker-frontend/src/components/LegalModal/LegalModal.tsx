import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ButtonStyled, TextStyled } from './LegalModalStyles';

interface LegalModalProps {
    open: boolean;
    onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Términos Legales</DialogTitle>
      <DialogContent>
        <TextStyled>
          Este software est&aacute; licenciado bajo la Licencia MIT. Esto significa que puede usar, copiar, modificar, 
          fusionar, publicar, distribuir, sublicenciar y/o vender copias del software, siempre que se incluya el 
          aviso de derechos de autor original.
        </TextStyled>
        <TextStyled>
          **Exenci&oacute;n de responsabilidad:** El software se proporciona "tal cual", sin garant&iacute;a de ning&uacute;n tipo, 
          expresa o impl&iacute;cita, incluyendo pero no limit&aacute;ndose a garant&iacute;as de comerciabilidad, idoneidad para un 
          prop&oacute;sito particular o no infracci&oacute;n. En ning&uacute;n caso los autores o titulares del copyright ser&aacute;n 
          responsables de ning&uacute;n reclamo, daño u otra responsabilidad, ya sea en una acci&oacute;n de contrato, agravio 
          o de otro tipo, que surja del uso del software o su distribuci&oacute;n.
        </TextStyled>
      </DialogContent>
      <DialogActions>
        <ButtonStyled onClick={onClose} color='primary' variant='contained'>
          Cerrar
        </ButtonStyled>
      </DialogActions>
    </Dialog>
  );
};

export default LegalModal;
