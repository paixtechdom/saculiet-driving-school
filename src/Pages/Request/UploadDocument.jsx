import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../../assets/Contexts/AppContext"
import { ClipLoader } from "react-spinners"


export const UploadDocument = ({organizationName, organizationEmail, requestId, requestSuccessful}) => {
    const [ file, setFile ] = useState('')
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const { dbLocation } = useContext(AppContext)
    const [ fileInputDisplay, setFileInputDisplay ] = useState('')

    const selectFile = () =>{
        document.querySelector('#file').click()
    }

    const getFile = (e) =>{
        const inputedFile = e.target.files[0]
        if(inputedFile.name.endsWith('.pdf')){
            setFile(inputedFile)
            setError('')
        } else{
            e.target.value = null
            setError('Only PDF files are supported')
        }
    }

    useEffect(() =>{
        setValue('file', file)
        if(file == ''){
            setFileInputDisplay('none')
        }
        else{
            setFileInputDisplay('block')
        }
    } , [file])


    const schema = yup.object().shape({

    })
    
    const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm({
        resolver: yupResolver(schema)
    })


    const addProject = async (data) =>{
        setValue('email', organizationEmail)
        setValue('name', organizationName)
        setValue('documentType', file.type)
        if (data.file !== ''){
            setLoading(true)
            const response = await axios.post(`${dbLocation}/organizations.php`, data, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
            if(response.data.success){
                axios.post(`${dbLocation}/requests.php/pending/${requestId}`)
                requestSuccessful()
                setLoading(false)
            }

        }else{
            
        }
    }






    return(
        <div className="flex flex-col flex items-center justify-  min-h-screen mt-9 mx-3">
        <div className="flex flex-col my-9 gap-3 items-center">
            <h3 className="text-center text-xl">Upload A Legal Document to Verify the Indentity of Your Organization</h3>
            <p className="flex gap-3 text-sm text-center">
                <i className="bi bi-exclamation-circle-fill text-blue"></i>
                Only PDF files are supported
            </p>
        </div>
        <button
            className ='flex gap-4 shadow-lg text-sm p-3 rounded-xl bg-gray-100 my-9'
            onClick={selectFile}
        >   <i className="bi bi-file-pdf-fill"></i>
            CLICK TO BROWSE FILE 
        </button>
        {
            file == '' ? '' : 
            <p className="flex gap-4 bg-blue-100 shadow-xl p-3 rounded-xl">
                <i className="bi bi-file-pdf-fill"></i>
                {file.name}
            </p>

        }
        <p>{file.fileName}</p>
        <input type="file" className="mb-9 hidden " id="file" onChange={getFile}
            style={{
            }}
        required/>
        {
            error == '' ? '' :
            <p className="flex gap-3 text-sm text-center text-red-800 mb-9">
                <i className="bi bi-exclamation-circle-fill"></i>
                {error}
            </p>
        }

        {
            file == '' ?  '' : 
            <button onClick={handleSubmit(addProject)} className='flex bg-blue p-3 rounded-xl text-white text-sm gap-4 w-9/12 items-center justify-center mt-9'> 
                {
                    loading ? 
                    <>
                        <ClipLoader color={'rgb(225, 225, 225)'} size={15} loading={true} speedMultiplier={0.5}/> 
                        UPLOADING
                    </>
                    :
                    <>
                    <i className="bi bi-upload"></i>
                        UPLOAD 
                    </>
                }
            </button>
        }

    
    </div>
    )
}