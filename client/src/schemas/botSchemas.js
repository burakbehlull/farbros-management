import * as Yup from 'yup';

const BotCreateSchema = Yup.object({
        token: Yup.string().min(6, 'Geçerli bir token gir').required('Zorunlu'),
});

const BotPageSchema = Yup.object({
        token: Yup.string().test('len', 'Geçerli bir token gir', val => !val || val.length >= 6),
        prefix: Yup.string().test('len', 'Geçerli bir prefix gir', val => !val || val.length >= 1)
});
/*
const BotPanelSchema = Yup.object({
  presenceName: Yup.string()
    .required("Presence adı seçilmelidir")
    .min(1, "Geçerli bir presence adı giriniz"),

  presenceType: Yup.number()
    .required("Presence türü seçilmelidir")
    .typeError("Geçerli bir presence türü seçiniz"),

  status: Yup.string()
    .required("Durum seçilmelidir")
    .oneOf(["online", "idle", "dnd", "invisible"], "Geçerli bir durum seçiniz"),
});*/


export {
     BotCreateSchema,
     BotPageSchema,
	 // BotPanelSchema
}