import { useNavigate } from "react-router-dom";

import { ModalUI, InputAndTextUI } from "@ui"
import { showToast } from "@partials"
import { userAPI } from "@requests"
import { LoginSchema } from "@schemas"
import { useCookie } from "@cookies";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
export default function LoginModal({ clickRef }){

    const navigate = useNavigate()

    const { setToken } = useCookie()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(LoginSchema)
    });

    const handleLoginUser = async (data) => {
        try {
            const response = await userAPI.login(data)

            const userData = response?.data?.user
            const accessToken = response?.data?.accessToken
            if(response?.status & response?.data?.isUser){
                setToken(accessToken)
                showToast({
                    message: `${userData?.username} sisteme hoşgeldiniz.`,
                    type: 'success',
                    id: 'user-login-success',
                    duration: 3000
                });
                
                navigate('/dashboard')
                reset({})
            }

            if(response?.status && !response?.data?.isUser){
                showToast({
                    message: `${response?.data?.message}`,
                    type: 'error',
                    id: 'user-login-error',
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

    async function submitHandle(data){
        handleLoginUser(data)
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
					type="password"
                    {...register('password')}
                />
            </ModalUI>
        </>
    )
}