import { styled } from '@mui/material/styles'

export const Overlay = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.95);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ImageStyled = styled('img')`
    max-width: 95vw;
    max-height: 95vh;
    object-fit: contain;
`

export const NavButton = styled('button')`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.2);
    border: none;
    color: white;
    font-size: 40px;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
`

export const LeftButton = styled(NavButton)`
    left: 20px;
`

export const RightButton = styled(NavButton)`
    right: 20px;
`