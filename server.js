const express = require('express')
const app = express()
const database = require('./database')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('.'))

app.get('/', (req, res) => {
    res.sendfile(__dirname +'/index.html')
})

app.post('/compromisso', (req, res) => {

   let {compromisso, dia, hora} = req.body

   if(compromisso != undefined){

    if(dia != undefined || hora != undefined){
        let dado = {
            nome: compromisso,
            dia: dia,
            hora: hora
        }
        database.insert(dado).into('compromissos').then(response => {
            res.redirect('/')
        }).catch(err => {
            console.log(err)
        })
    }
   }
})

app.get('/dados', (req, res) => {
    database.select('*').table('compromissos').then(data => {
        res.send({data: data})
    }).catch(err => {
        console.log(err)
    })
})

app.get('/dados/delete/:id', (req, res) => {
  let data = req.params.id
  
  database.where({id: data}).delete().table('compromissos').then(dado => {
      
    res.redirect('/')
  }).catch(err => {
      console.log(err)
  })
})



app.listen(3000, exe => {
    console.log('Rodando em: http://localhost:3000')
})