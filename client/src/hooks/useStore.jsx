import { useDispatch, useSelector } from 'react-redux';
import { setStoreData, clearStoreData } from '../store/slices/userSlice';

const useStore = () => {
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user)
	
    const getUser = () => {
		return user?.data
	}
    const setUser = (data) => dispatch(setStoreData(data));
    const clearUser = () => dispatch(clearStoreData());

    return { getUser, setUser, clearUser };
};

export default useStore;