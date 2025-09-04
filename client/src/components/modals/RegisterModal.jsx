import { useEffect, useState } from "react";
import { ModalUI, InputAndTextUI } from "@ui"
import { showToast } from "@partials"

export default function RegisterModal({ clickRef }){

    const handleSubmit = ()=> null

    return (
        <>
            <ModalUI
                clickName="Giriş"
                modalTitle="Giriş Yap"
                content={<p></p>}
                clickRef={clickRef}
                onClick={handleSubmit}
            >
                <InputAndTextUI 
                    label="Kullanıcı Adı" 
                    placeholder="Kullanıcı adınızı giriniz.." 
                    required={false} 
                />
                <InputAndTextUI 
                    label="Email" 
                    placeholder="Emailinizi giriniz.." 
                    required={false} 
                />
                <InputAndTextUI 
                    label="Şifre" 
                    placeholder="Şifrenizi giriniz.." 
                    required={false} 
                />
            </ModalUI>
        </>
    )
}