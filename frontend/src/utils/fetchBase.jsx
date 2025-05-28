import { toast } from "react-toastify"

const USE_LOCAL_API = true
const BASE_URL = 'http://localhost:8080'
// const BASE_URL = 'http://25.40.36.163:8080'
export const fetchBase = async (data) => {
    const { controller, endpoint, body, method, authorize } = data
    const token = localStorage.getItem('token')
    const defaultHeaders = {
        "Content-type": "application/json; charset=UTF-8",
    };

    const headersWithAuth = {
        ...defaultHeaders,
        Authorization: 'Bearer ' + token
    }

    try {
        const res = await fetch(
            `${BASE_URL}/api/${controller != undefined ? `${controller}/${endpoint}` : endpoint}`,
            {
                method: method ?? "POST",
                headers: authorize ? headersWithAuth : defaultHeaders,
                body: method !== 'GET' ? JSON.stringify({
                    ...body
                }) : undefined
            }
        )
        const jsonResult = await res.json()

        if (!res.ok) {
            const resultMessage = jsonResult.errorMsg ?? "Error!";
            toast.error(resultMessage)
            return 
        }
        
        return jsonResult
    } catch (err) {
        toast.error(err)
        throw new Error(err)
    }

}