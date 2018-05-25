const setBudget = (budget) => {
    return {
        type: 'SET_BUDGET_VALUE',
        value: budget
    }
}

const drawerRequest = (open) => {
    return {
        type: 'SET_DRAWER',
        value: open
    }
}

const openDrawer = () => {
    return {
        type: 'OPEN_DRAWER'
    }
}

const closeDrawer = () => {
    return {
        type: 'CLOSE_DRAWER'
    }
}

const setContentGenre = (contentGenre) => {
    return {
        type: 'SET_CONTENT_GENRE',
        value: contentGenre
    }
}

export { setBudget, drawerRequest, openDrawer, closeDrawer, setContentGenre }