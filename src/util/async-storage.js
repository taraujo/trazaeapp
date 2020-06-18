import {AsyncStorage} from 'react-native'
const TAG = 'util-async-storage'

export const setData = (key,value)=>{
    try{
        AsyncStorage.setItem(key,value)
    }catch(e){
        console.log(TAG,'erro ao setar dados: ',e)
    }
}

export const getData = async(key,defaultValue=null)=>{
    try{
        let value = await AsyncStorage.getItem(key)
        return value
    }catch(e){
        console.log(TAG,'erro ao obter dados: ',e)
        return defaultValue
    }
}
