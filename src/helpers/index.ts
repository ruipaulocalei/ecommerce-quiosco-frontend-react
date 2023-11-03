export const formatCurrency = (quantity: number) => {
    return (quantity * 1.0).toLocaleString('pt-AO', {
        style: 'currency',
        currency: 'AOA'
    })
}