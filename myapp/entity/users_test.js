module.exports = {
    name: 'users_test',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        username: {
            type:'varchar',
            uniquye: true
        },
        password: {
            type: 'varchar'
        },
    } ,
};