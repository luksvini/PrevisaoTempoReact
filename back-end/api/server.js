// Middleware
import express, { request } from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()



const __dirname = path.resolve()

console.log(__dirname)

const app = express()
const PORT = 5000;

app.use(cors());
app.use(express.json())


const API_KEY = process.env.API_KEY;


    app.get('/api/clima', async (request, response) =>{
    const cidade = request.query.cidade;

        if(!cidade){
            return response.status(400).json({erro:"Informe o nome da cidade"});
        }

        try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&lang=pt_br&units=metric`
        const  resposta = await axios.get(url);
        response.json(resposta.data) 
        } catch(error){
            response.status(500).json({ erro: "Erro ao buscar dados da API", detalhe: error.message });

        }
            
       
            
        })

    app.get('/api/clima5dias', async (request, response) => {
            const cidade = request.query.cidade;
        
            if(!cidade){
                return response.status(400).json({erro:"Informe o nome da cidade"});
            }

            try{
                const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${API_KEY}&lang=pt_br&units=metric`
                const  resposta = await axios.get(url);
                
                response.json(resposta.data) 
                } catch (error){
                    response.status(500).json({ erro: "Erro ao buscar dados da API", detalhe: error.message});
        
                }
        
                
                

        })
 
    
app.use(express.static(path.join(__dirname,'../../front-end/dist/index.html')))

app.get("*", async (request, response) =>{
    response.sendFile(path.join(__dirname,'../../front-end/dist/index.html'))
});
    


app.listen(PORT, () =>{ 
    console.log(`Servidor está escutando na porta ${PORT}`)

})