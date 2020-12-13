module.exports = {
    name: 'users',
    columns: {
        user_id: {
            primary: true,
            type: 'int',
            generated: true
        },
        username: {
            type:'varchar',
            uniquye: true
        },
        mailaddress: {
            type:'varchar'
        },
        password: {
            type: 'varchar',
            uniquye: true
        },
    } ,
};