export const required = value => {
    if(value) return undefined

    return 'Это обязательное поле'
}

export const maxLengthUser = (length) => {
    return (value) => {
        if(value.length > length) return `Максимальная длина ${length}`

        return undefined
    }
}

export const minLengthPassword = (length) => {
    return (value) => {
        if(value.length < length) return `Минимальная длина пароля ${length} символов`

        return undefined
    }
}

export const minLengthUser = (length) => {
    return (value) => {
        if(value.length < length) return `Минимальная длина ${length} символа`

        return undefined
    }
}

export const isMatch = (value, allValues) => {
    if(value !== allValues.password) return "Пароли не совпадают"
    return undefined
}