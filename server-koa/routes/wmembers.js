const Router = require('koa-router')
const router = new Router()
const wMemberController = require('../controllers/wMember-controller')

router.get('/:wid', wMemberController.findmember)
router.get('/', wMemberController.findallmember)
router.post('/', wMemberController.addmember)
router.put('/:uemail', wMemberController.updatetype)
router.delete('/:uemail', wMemberController.deletewmember)

module.exports = router.routes()