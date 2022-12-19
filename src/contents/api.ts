import axios from 'axios';


const backend='http://localhost:8000'


export const speechRecognize=async(base64data,size)=>{

    const response = await axios.post(backend+'/speech', {
            speech: base64data,
            file_len: size
    },{
        maxContentLength: Infinity
    });

    return response.data
}
