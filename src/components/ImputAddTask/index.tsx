import {Feather} from '@expo/vector-icons'
import {InputContainer, Input, InputButton} from './styles'


type Props = {

    onPress: () => void;
    onChangeText: (text: string) => void;
    onBlur: (e: any) =>void;
    value: string;

}

export function InputAddTask({onPress, onChangeText,onBlur, value} : Props){

    return(

        <InputContainer>

            <Input 
        
                placeholder='Digite a tarefa'
                placeholderTextColor="white"
                keyboardType='default'
                value= {value}
                onChangeText={onChangeText}
                onBlur= {onBlur}

            />

            <InputButton onPress={onPress}>
        
                <Feather name= "plus-square" size= {24} color="white"/>

            </InputButton>
        
        </InputContainer>

    );
}
