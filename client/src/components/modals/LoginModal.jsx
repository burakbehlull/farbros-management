import { useEffect, useState } from "react";
import { ModalUI, InputAndTextUI } from "@ui"
import { showToast } from "@partials"
import { userAPI } from "@requests"
import { RegisterSchema } from "@schemas"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function LoginModal({ clickRef }){

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(RegisterSchema)
    });

    const handleLoginUser = async (data) => {
        try {
            const response = await userAPI.login(data)
            if(response.success){
                showToast({
                    message: `Sisteme hoşgeldiniz.`,
                    type: 'success',
                    id: 'user-login-success',
                    duration: 3000
                });
            }
        } catch (error) {
            showToast({
                message: 'Giriş yapılamadı',
                type: 'error',
                id: 'user-login-error',
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
                clickName="Giriş"
                modalTitle="Giriş Yap"
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