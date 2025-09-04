import * as Yup from 'yup';

const RegisterSchema = Yup.object({
        username: Yup.string().min(4, 'Kullanıcı adı kısa olamaz').required('Zorunlu'),
        email: Yup.string().email("Geçerli bir email gir").min(4, 'Kullanıcı adı kısa olamaz').required('Zorunlu'),
        password: Yup.string().min(8, "Şifre en az 8 karakter olmalı").required('Zorunlu')
});

const LoginSchema = Yup.object({
        username: Yup.string().min(4, 'Kullanıcı adı kısa olamaz').required('Zorunlu'),
        password: Yup.string().min(8, "Şifre en az 8 karakter olmalı").required('Zorunlu')
});



export {
     RegisterSchema,
     LoginSchema
}