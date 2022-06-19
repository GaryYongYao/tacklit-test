var fs = require('fs');

// Define route
module.exports = (app: any) => {
  app.get('/api/getPI', async (req: any, res: any) => {
    try {
      // const data = fs.readFileSync('pi.txt', 'utf8')
      const data = req.app.get('PI')
      const pi = data;
      return res.status(200).send(pi)
    } catch (err) {
      return res.status(500).send(err)
    }
  })
}
