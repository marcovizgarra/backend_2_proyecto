import bcrypt from 'bcrypt';

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(11)); 
    // getSaltSync recibe como parámetro la cantidad de veces que va a iterar la contraseña para generar caractéres random
    // retorna la contraseña hasheada, se utiliza para el registro, para la creación de la contraseña

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);
    // extrae la contraseña hasheada guardada en la base de datos y la compara con la contraseña que viene del formulario de login del cliente