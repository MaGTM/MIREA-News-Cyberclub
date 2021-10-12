export const required = value => {
    if(value) return undefined

    return true
}

export const maxLength = (length) => {
    return (value) => {
        if(value.length > length) return `Максимальная длина ${length}`

        return undefined
    }
}

export const minLength = (length) => {
    return (value) => {
        if(value.length < length) return `Минимальная длина ${length}`

        return undefined
    }
}

export const isMatch = (value, allValues) => {
    if(value !== allValues.password) return "Пароли не совпадают"
    return undefined
}