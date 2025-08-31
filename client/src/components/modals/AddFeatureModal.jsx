import { ModalUI, SelectUI, TextUI } from "../ui/index"

export default function AddFeatureModal({
    clickRef,
    data
}){
    return (
        <>
            <ModalUI
                clickName="Ekle"
                modalTitle="Özellik Ekle"
                content={<h1>Add Feature</h1>}
                clickRef={clickRef}
                onClick={() => alert("Modal action triggered")}
            >
                <TextUI>Özellikleri kaldırmak ve güncellemek için botlar kısmından bota gidin.</TextUI>
                <SelectUI 
                    title="Özellik ekleyeceğiniz botu seçin:"
                />
                {JSON.stringify(data)}
            </ModalUI>
        </>
    )
}