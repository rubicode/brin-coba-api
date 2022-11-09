var express = require('express');
var router = express.Router();

module.exports = function (db) {
  router.get('/', async function (req, res, next) {
    try {
      //searching
      const queries = []
      const params = []

      if (req.query.name) {
        params.push(req.query.name)
        queries.push(`name ilike '%' || $${params.length} || '%'`)
      }

      if (req.query.startdate && req.query.todate) {
        queries.push(`birthdate between $${params.length + 1} and $${params.length + 2}`)
        params.push(req.query.startdate)
        params.push(req.query.todate)
      }

      const page = req.query.page || 1

      const limit = req.query.limit || 3
      const offset = (page - 1) * limit

      let sql = 'SELECT COUNT(*) as total FROM users'
      if (queries.length > 0)
        sql += ` where ${queries.join(' AND ')}`

      const { rows } = await db.query(sql, [...params])
      const total = rows[0].total
      const pages = Math.ceil(total / limit)

      sql = 'SELECT * FROM users'
      if (queries.length > 0)
        sql += ` where ${queries.join(' AND ')}`

      sql += ` limit $${params.length + 1} offset $${params.length + 2}`

      db.query(sql, [...params, limit, offset], (err, { rows }) => {
        if (err) {
          console.log(err)
          return res.send(err)
        }
        res.json({
          rows,
          pages,
          page
        })
      })
    } catch (e) {
      console.log(e)
      res.send(e)
    }
  });

  return router;
}
