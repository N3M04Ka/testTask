import img1 from '@/assets/images/openFreeCard.png';
import img2 from '@/assets/images/EsimWithoutSuprises.png';
import img3 from '@/assets/images/HachedAcc.png';
import {type ImageSourcePropType} from 'react-native';
type SuggestionType={
    id:number,
    text:string,
    image:ImageSourcePropType,
    color:string,
}
export const suggestionsArray:SuggestionType[]=[
    {
        id:1,
        text:'Открой беслплатну карту',
        image:img1,
        color:'text-white',
    },
    {
        id:2,
        text:'eSim без сюрпризов',
        image:img2,
        color:'text-black',
    },
    {
        id:3,
        text:'Аккаунт взломали',
        image:img3,
        color:'text-white',
    },
    {
        id:4,
        text:'eSim без сюрпризов',
        image:img2,
        color:'text-black',
    },
    {
        id:5,
        text:'Открой беслплатну карту',
        image:img1,
        color:'text-white',
    },
]
