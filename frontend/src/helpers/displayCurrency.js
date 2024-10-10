

const displayCurrency = (num) => {
    const formatter = new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 2
    })

    return formatter.format(num)
}

export default displayCurrency