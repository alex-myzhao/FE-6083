const db = require('../db.js')

let getmember = async (uemail = undefined) => {
  try {
    let data = null
    if (uemail) {
      data = await db.query('SELECT uemail, wmtype FROM wMember WHERE wid = 1 AND uemail = ?', uemail)
    } else {
      data = await db.query('SELECT uemail, wmtype FROM wMember WHERE wid = 1')
    }
    return data
  } catch (error) {
    throw error
  }
}

let addNewmember = async (uemail, wid, wmtype) => {
  try {
    if (uemail && wid && wmtype) {
      let data1 = await db.query('SELECT uemail FROM User WHERE uemail = ?', uemail)
      let data2 = await db.query('SELECT uemail FROM wMember WHERE uemail = ? AND wid = ?', [uemail, wid])
      if (data1.length > 0) {
        if (data2.length > 0) {
          return false
        } else {
          await db.query(` INSERT INTO wMember (uemail, wid, wmtype) VALUES (?, ?, ?) `, [uemail, wid, wmtype])
          return true
        }
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}

let update = async (uemail, wmtype) => {
  try {
    let wid = 1 // this is for test
    if (uemail && wmtype) {
      let data = await db.query('SELECT uemail FROM wMember WHERE uemail = ? AND wid = ?', [uemail, wid])
      if (data.length > 0) {
        await db.query('UPDATE wMember SET wmtype = ? WHERE uemail = ? AND wid = ?', [wmtype, uemail, wid])
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}

let remove = async (uemail) => {
  try {
    let wid = 2
    let { affectedRows } = await db.query(` DELETE FROM wMember WHERE uemail = ? AND wid = ?`, [uemail, wid])
    return affectedRows > 0
  } catch (error) {
    throw error
  }
}

module.exports = {
  getmember,
  addNewmember,
  update,
  remove
}