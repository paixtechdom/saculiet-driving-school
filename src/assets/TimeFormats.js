const formatCountdown = (time) =>{
    let hours = Math.floor(time/3600) % 24
    let minutes = (Math.floor(time/60) % 60)
    let seconds = Math.floor(time % 60)
    if(minutes < 10) minutes = '0' + minutes
    if(seconds < 10) seconds = '0' + seconds
    return hours + ' : ' + minutes + ' : ' + seconds
}

const formatTime = (time) => {
    return new
    Date(time).toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    })
}


export { formatCountdown, formatTime }