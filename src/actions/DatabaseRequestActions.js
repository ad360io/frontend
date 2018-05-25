const fetchPending = () => {
    return {
        type: 'FETCH_DATABASE_PENDING'
    }
}

const fetchFulfilled = (data) => {
    return {
        type: 'FETCH_DATABASE_FULFILLED',
        payload: data
    }
}

const fetchRejected = (err) => {
    return {
        type: 'FETCH_DATABASE_REJECTED',
        payload: err
    }
}


export { fetchPending, fetchFulfilled, fetchRejected } 