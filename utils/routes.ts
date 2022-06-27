var fs = require("fs");

// Define route
module.exports = (app: any) => {
  app.post('/api/checkIn', async (req: any, res: any) => {
    try {
      const newData = app.get('data')
      // @ts-ignore
      newData.push(req.body)
      app.set('data', newData)
      
      return res.status(200).send(app.get('data'))
    } catch (err) {
      return res.status(500).send(err)
    }
  })


  app.get('/api/getData', async (req: any, res: any) => {
    try {
      return res.status(200).send(app.get('data'));
    } catch (err) {
      return res.status(500).send(err);
    }
  })
}
