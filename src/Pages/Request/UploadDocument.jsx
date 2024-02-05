import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../../assets/Contexts/AppContext"


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
        if(inputedFile.type === 'text/plain' || inputedFile.name.endsWith('.doc') || inputedFile.name.endsWith('.docx') || inputedFile.name.endsWith('.pdf')){
            setFile(inputedFile)
            console.log(inputedFile)
            setError('')
        } else{
            e.target.value = null
            setError('Only files with .doc, .docx, .pdf are supported')
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
        <div className="flex flex-col" >
                
        <input type="file" className="" id="file" onChange={getFile}
            style={{
                display: fileInputDisplay,
            }}
        required/>
        <p className="text-red-700">{error}</p>

        <button

            style={{
                color: 'black'
            }}
            onClick={selectFile}
        >
            Click to add file 
        </button>

        <button onClick={handleSubmit(addProject)} className='action'> 
            ADD PROJECT <i className="fa fa-upload"></i>
        </button>

    
    </div>
    )
}