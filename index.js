const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const mysql = require('mysql')
const app = express()

const path = require('path');
const hbs = require('hbs');

// const middlewares = require('./auth/middlewares');
// const auth = require('./auth');
// const notes = require('./api/notes');

// app.use(volleyball);
// app.use(express.json());
// app.use(middlewares.checkTokenSetUser);

const port = 3000

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'nadi',
    password: 'Nadi1234;',
    database: 'crud_db'
});

conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
});

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//////////////////
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));
/////////////////

//apache under /api
app.get('/', (req, res) => {
    res.send('Success! The product.nadi3docms.com server block is working!');
})

app.get('/colddata', (req, res) => {
    fs.readFile('./data/SensorColdData 2.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    })
})

app.get('/hotdata', (req, res) => {
    fs.readFile('./data/SensorHotData.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    })
})

app.get('/account/info', (req, res) => {
    fs.readFile('./data/AccountInfoData.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});


app.get('/:companyId/:projectId', function(req, res) {
    var data = {
        "company": {
            "companyId": req.params.companyId,
            "projectId": req.params.projectId
        }
    }
    fs.readFile('./data/ProjectInfo.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});

app.get('/:companyId/:projectId/Module/buttombar/attribute',(req, res) => {
  fs.readFile('./data/module/BottomBarAttribute.json', (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  })
})

app.get('/:companyId/:projectId/Module/buttombar/device',(req, res) => {
  fs.readFile('./data/module/BottomBarDevice.json', (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  })
})

app.get('/:companyId/:projectId/Module/buttombar/sensor',(req, res) => {
  fs.readFile('./data/module/BottomBarSensor.json', (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  })
})

app.get('/:companyId/:projectId/Module/buttombar/system',(req, res) => {
  fs.readFile('./data/module/BottomBarSystem.json', (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  })
})

app.get('/:companyId/:projectId/Module/buttombar/system/web',(req, res) => {
    let sql = "SELECT * FROM buttombar_system";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.render('product_view',{
        results: results
      });
    });
});

// app.get('/:companyId/:projectId/Module/buttombar/system',(req, res) => {
//     let sql = "SELECT * FROM buttombar_system";
//     let query = conn.query(sql, (err, results) => {
//       if(err) throw err;
//       res.json(results)
//     });
//   });
  
  //route for insert data
  app.post('/:companyId/:projectId/Module/buttombar/system/save',(req, res) => {
    let data = {name: req.body.name, value: req.body.value};
    let sql = "INSERT INTO buttombar_system SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect(`/${req.params.companyId}/${req.params.projectId}/Module/buttombar/system/web`);
    });
  });
  
  //route for update data
  app.post('/:companyId/:projectId/Module/buttombar/system/update',(req, res) => {
    let sql = "UPDATE buttombar_system SET name='"+req.body.name+"', value='"+req.body.value+"' WHERE id="+req.body.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.redirect(`/${req.params.companyId}/${req.params.projectId}/Module/buttombar/system/web`);
    });
  });
  
  //route for delete data
  app.post('/:companyId/:projectId/Module/buttombar/system/delete',(req, res) => {
    let sql = "DELETE FROM buttombar_system WHERE id="+req.body.product_id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.redirect(`/${req.params.companyId}/${req.params.projectId}/Module/buttombar/system/web`);
    });
  });

// app.use('/auth', auth);
// app.use('/api/v1/notes', middlewares.isLoggedIn, notes);

// function notFound(req, res, next) {
//     res.status(404);
//     const error = new Error('Not Found - ' + req.originalUrl);
//     next(error);
//   }
  
//   function errorHandler(err, req, res, next) {
//     res.status(res.statusCode || 500);
//     res.json({
//       message: err.message,
//       stack: err.stack
//     });
//   }
  
//   app.use(notFound);
//   app.use(errorHandler);

// app.post('/todb', (req, res) => {
    
// })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
