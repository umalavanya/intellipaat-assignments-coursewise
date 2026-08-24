export const formatDate = (dateStr) => {
    if(!dateStr) return "N/A" ;

    const date = new Date(dateStr) ;

    return isNaN(date.getTime())
        ? dateStr
        : date.toLacaleString() ;
} ;

export const getBadgeClass = (status) => {
    switch (status?.toLowerCase()){
        case "completed" :
            return "badge-completed" ;
        case "cancelled" :
            return "badge-cancelled" ;
        default:
            return "badge-upcoming" ;
    }
} ;