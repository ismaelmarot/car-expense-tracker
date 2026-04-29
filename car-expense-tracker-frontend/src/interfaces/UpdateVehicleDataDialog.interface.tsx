export interface UpdateVehicleDateDialogProps {
    open: boolean
    category: 'vtv_itv' | 'extintor'
    date: string
    onConfirm: () => void
    onCancel: () => void
}