/**
 * restful api 子路由
 */

const router = require('koa-router')()
const XcentzList = require('./../controllers/xcentz-list')
const UserInfo = require('./../controllers/user-info')

const routers = router
	.post('/getList', XcentzList.getNewList)
	.post('/createUser', XcentzList.createUser)
	.post('/loginIn', UserInfo.loginIn)


module.exports = routers