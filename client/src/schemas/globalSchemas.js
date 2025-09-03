import * as Yup from 'yup';

const BotCreateSchema = Yup.object({
        token: Yup.string().min(6, 'Geçerli bir token gir').required('Zorunlu'),
});

const BotPageSchema = Yup.object({
        token: Yup.string().test('len', 'Geçerli bir token gir', val => !val || val.length >= 6),
        prefix: Yup.string().test('len', 'Geçerli bir prefix gir', val => !val || val.length >= 1)
});

export {
     BotCreateSchema,
     BotPageSchema
}