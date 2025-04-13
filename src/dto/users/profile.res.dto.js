export default class ProfileDTO {
    constructor(user){
        this.firstName = user.f_name;
        this.lastName = user.l_name;
        this.email = user.email;
        this.age = user.age;
        if(user.role == 'admin')
            return this.role = 'Administrador'
            else this.role = 'Usuario'
    }
}