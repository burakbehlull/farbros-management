import * as Yup from 'yup';

const BotCreateSchema = Yup.object({
        token: Yup.string().min(6, 'Geçerli bir token gir').required('Zorunlu'),
});

export {
     BotCreateSchema
}