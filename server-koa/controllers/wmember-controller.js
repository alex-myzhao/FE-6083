const wMemberModel = require('../models/wmember')
const cMemberModel = require('../models/cmember')
const { withAuth } = require('../util')
const ERRMSG = require('../util/errmsg')

let findmember = withAuth(
  async (ctx, next) => {
    try {
      const wid = ctx.params.wid
      let result = await wMemberModel.getmember(wid)
      if (result.length > 0) {
        ctx.ok({
          success: true,
          member: result
        })
      } else {
        // ctx.notFound({ success: false, error: ERRMSG['notFound'] })
        ctx.ok({ success: true, member: [] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let findallmember = withAuth(
  async (ctx, next) => {
    try {
      let result = await wMemberModel.getmember()
      if (result.length > 0) {
        ctx.ok({
          success: true,
          member: result
        })
      } else {
        // ctx.notFound({ success: false, error: ERRMSG['notFound'] })
        ctx.ok({ success: true, member: [] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let getwidthememberin = withAuth(
  async (ctx, next) => {
    try {
      const uemail = ctx.params.uemail
      let result = await wMemberModel.getwid(uemail)
      if (result.length > 0) {
        ctx.ok({
          success: true,
          workspace: result
        })
      } else {
        // ctx.notFound({ success: false, error: ERRMSG['notFound'] })
        ctx.ok({ success: true, workspace: [] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let addmember = withAuth(
  async (ctx, next) => {
    try {
      const { uemail, wid, wmtype } = ctx.request.body
      const res = await wMemberModel.addNewmember(uemail, wid, wmtype)
      if (res) {
        if (res.success) {
          ctx.created({ success: true, added: uemail })
        } else {
          ctx.ok(res)
        }
      } else {
        ctx.badRequest({
          success: false
        })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let updatetype = withAuth(
  async (ctx, next) => {
    try {
      const uemail = ctx.params.uemail
      const wid = ctx.params.wid
      const { wmtype } = ctx.request.body
      let result = await wMemberModel.update(uemail, wid, wmtype)
      if (result) {
        ctx.ok({ success: true, updated: uemail })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let deletewmember = withAuth(
  async (ctx, next) => {
    try {
      const { wid, uemail } = ctx.params
      let result1 = await wMemberModel.remove(uemail, wid)
      await cMemberModel.remove(uemail, wid)
      if (result1) {
        ctx.ok({ success: true, deleted: uemail })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

module.exports = {
  findmember,
  findallmember,
  getwidthememberin,
  addmember,
  updatetype,
  deletewmember
}
