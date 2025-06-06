import React, { useContext } from "react"
import { AppContext } from "../assets/Contexts/AppContext"

export const Alert = () => {
    const {showAlert, setShowAlert, setAlertType, alertType, setAlertMessage, alertMessage} = useContext(AppContext)
    if(showAlert) {
        return( 
            <div className={`flex items-center justify-center fixed top-0 w-full h-screen z-[502] bg-white bg-opacity-60`}>
                <div className={`w-11/12 md:w-9/12 xl:w-6/12  min-h-64 bg-gray-50 shadow-xl rounded-3xl flex items-center justify-center flex-col gap-4 py-7 px-6 alert`}>
                    <i className={`bi bi-${
                        alertType == 'success' ? 'check' :
                        alertType == 'cancelled' ? 'x-lg' :
                        alertType == 'error' ? 'x-lg' :
                        alertType == 'Oops' ? 'exclamation-circle-fill' :
                        alertType == 'expired' ? 'clock-fill' :
                        alertType == 'pending' ? 'exclamation-octagon-fill' : ''
                    } text-5xl ${alertType} rounded-full p-2 px-2`}></i> 
    
                    <h3 className="text-xl">{alertType?.toUpperCase()}</h3>
                    <div className="flex flex-col text-center text-sm line-25 gap-1">
                        {
                            React.Children.toArray(
                            alertMessage.map(message => 
                                <p>{message}</p>
                                )
                            ) 
                        }
                    </div>
                    <button className={`border- bg-gray-900 w-6/12 rounded-lg p-2 text-gray-200 text-small`} onClick={() => setShowAlert(false)}>CLOSE</button>
                </div>
            </div>
        )
    }
}