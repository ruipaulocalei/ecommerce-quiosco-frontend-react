export const formatCurrency = (quantity: number) => {
    return quantity.toLocaleString('pt-AO', {
        style: 'currency',
        currency: 'AOA'
    })
}