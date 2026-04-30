import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const PhotosWrapper = styled(Box)`
    display: 'flex';
    flex-wrap: 'wrap';
    margin-top: '16px';
    gap: '8px';
`

export const PhotoItem = styled(Box)`
    width: 64;
    height: 64;
    border-radius: '12px';
    background-size: 'cover';
    background-position: 'center';
    position: 'relative';
`

export const RemoveButton = styled(Box)`
    position: 'absolute';
    top: -6;
    right: -6;
    width: 20;
    height: 20;
    border-radius: '50%';
    background: 'rgba(0,0,0,0.6)';
    display: 'flex';
    align-items: 'center';
    justify-content: 'center';
    cursor: 'pointer';

    &:hover {
        background: '#ff3b30';
    }
`

export const AddPhotoButton = styled(Box)`
    width: 64;
    height: 64;
    border-radius: '12px';
    border: '1.5px dashed #c7c7cc';
    display: 'flex';
    align-items: 'center';
    justify-content: 'center';
    cursor: 'pointer';

    &:hover {
        border-color: '#0071e3';
        background: 'rgba(0,113,227,0.05)';
    }
`