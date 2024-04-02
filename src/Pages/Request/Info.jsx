

export const Info = ({setShowInfo}) => {

    const notice = [
        "Sending a request without using an email connected to the organization entered will not be granted. (E.g email@companyname.com)",
        "A request with a personal email will not be granted.",
        "Saculiet Driving School does not grant requests to individual but only to established organizations (Private, Government and Non-Govt. Organizations.",
        "A legal document will be requested to validate the establishment of the organization.",
        "If a legal document has beeen requested from you on your previous request  make sure to enter the same Organization's name to prevent a re-upload of the document."
        
    ]



    return(
        <div className="flex justify-center  bg-white min-h-screen w-full mb-5 " >

        <div className="flex-col flex w-11/12 xl:w-9/12 transition-all duration-500 md:mt-9">

            <div className="flex flex-co mt-3 justify-between items-center">
                <h2 className="text-red-700 font-bold bg-white md:text-xl">Important Notice !</h2>

                <i className="bi bi-x-lg text-2xl rounded-full px-1 text-black cursor-pointer" onClick={() => {
                    setShowInfo(false)
                }}></i>
            </div>
            <div className="flex flex-col gap-2 mt-3 lg:gap-5 text-sm">
                {
                    notice.map((not, key) => (
                        <div key={key} className="height text-gray-700" style={{
                            lineHeight: 30+'px'
                        }}>
                            {key + 1}. {not}
                        </div>
                    ))
                }
                  <div className="height " style={{
                            lineHeight: 30+'px'
                        }}>
                            6. <a className="text-blue font-bold" href="mailto:studentverification@saculietdrivingschool.com">Click here </a> 
                            to Contact us in case of any challenges or complaints
                </div>
            </div>


        </div>



        </div>
    )
}