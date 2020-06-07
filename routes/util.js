const secret = 'my name is eyes487'

const success =(data='')=> ({
    code: 200,
    data,
    message: '成功!!!!'
})

const fail =(data)=> ({
    code: 400,
    data,
    message: '失败!!!!'
})
const tokenUrl = [
    'deleteCart','addCart'
]

module.exports = {
    success,fail,secret
}