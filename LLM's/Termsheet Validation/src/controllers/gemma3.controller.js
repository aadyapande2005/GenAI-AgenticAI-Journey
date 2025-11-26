import axios from 'axios';

async function validateTermsheet(prompt)
{
    try {
        const response = await axios.post("http://127.0.0.1:11434/api/generate", {
            model: "gemma3:1b",
            prompt: "Validate this term sheet in a small paragraph, only inform about any issues\n"+prompt,
            stream: false
        }) 
        console.log(response.data.response);
        
        return response.data.response
        
    } catch (error) {
        console.log("Something went wrong with Gemma3", error)  
        return error    
    }
}

export default validateTermsheet

