import { useEffect, useState } from "react";
import { ModalUI, InputAndTextUI } from "@ui"
import { showToast } from "@partials"
import { userAPI } from "@requests"
import { RegisterSchema } from "@schemas"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function RegisterModal({ clickRef }){

    

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(RegisterSchema)
    });

    const handleCreateUser = async (data) => {
        try {
            const response = await userAPI.register(data)
            if(response.success){
                showToast({
                    message: `Kaydınız tamamlandı.`,
                    type: 'success',
                    id: 'user-create-success',
                    duration: 3000
                });
            }
        } catch (error) {
            showToast({
                message: 'Kaydınız oluşturulamadı.',
                type: 'error',
                id: 'user-create-error',
                duration: 3000
            });
            console.error('Error creating user:', error);
        }
    };

    function submitHandle(data){
        console.log(data)
    }

    return (
        <>
            <ModalUI
                clickName="Tamamla"
                modalTitle="Kayıt Ol"
                content={<p></p>}
                clickRef={clickRef}
                onClick={handleSubmit(submitHandle)}
            >
                <InputAndTextUI 
                    label="Kullanıcı Adı" 
                    placeholder="Kullanıcı adınızı giriniz.." 
                    required={false} 
                    errorText={errors?.username?.message} 
                    {...register('username')}
                />
                <InputAndTextUI 
                    label="Email" 
                    placeholder="Emailinizi giriniz.." 
                    required={false} 
                    errorText={errors?.email?.message} 
                    {...register('email')}
                />
                <InputAndTextUI 
                    label="Şifre" 
                    placeholder="Şifrenizi giriniz.." 
                    required={false} 
                    errorText={errors?.password?.message} 
                    {...register('password')}
                />
            </ModalUI>
        </>
    )
}