export const FormError = ({message}) => {
    return(
        <p className="formerror text-red-700 text-sm mt-2">
            <i className="bi bi-exclamation-circle-fill mx-2"></i>
            
            {message}
        </p>
    )
}