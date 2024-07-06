

import apple from '../images/apple.png'
import banana from '../images/banana.png';
import bread from '../images/bread.png';
import cabbage from '../images/cabbage.png';
import chicken from '../images/chicken.png';
import corn from '../images/corn.png';
import fish from '../images/fish.png';
import lettuce from '../images/lettuce.png';
import noodle from '../images/noodle.png';
import rice from '../images/rice.png';
import vege from '../images/vege.png';
import watermelon from '../images/watermelon.png';
import fries from '../images/fries.png';
import icecream from '../images/icecream.png';
import donut from '../images/donut.png';
import coke from '../images/coke.png';
import oil from '../images/oil.png';
import cake from '../images/cake.png';
// categories eat_most eat_more eat_moderate eat_less 

export const foodList = [
    { id: 1, name: 'apple', src: apple, category: 'eat_most' },
    { id: 2, name: 'banana', src: banana, category: 'eat_most' },
    { id: 3, name: 'bread', src: bread, category: 'eat_more' },
    { id: 4, name: 'cabbage', src: cabbage, category: 'eat_most' },
    { id: 5, name: 'chicken', src: chicken, category: 'eat_moderate' },
    { id: 6, name: 'corn', src: corn, category: 'eat_most' },
    { id: 7, name: 'fish', src: fish, category: 'eat_moderate' },
    { id: 8, name: 'lettuce', src: lettuce, category: 'eat_most' },
    { id: 9, name: 'noodle', src: noodle, category: 'eat_more' },
    { id: 10, name: 'rice', src: rice, category: 'eat_more' },
    { id: 11, name: 'vege', src: vege, category: 'eat_most' },
    { id: 12, name: 'watermelon', src: watermelon, category: 'eat_most' },
    { id: 13, name: 'fries', src: fries, category: 'eat_less' },
    { id: 14, name: 'icecream', src: icecream, category: 'eat_less' },
    { id: 15, name: 'donut', src: donut, category: 'eat_less' },
    { id: 16, name: 'coke', src: coke, category: 'eat_less' },
    { id: 17, name: 'oil', src: oil, category: 'eat_less' },
    { id: 18, name: 'cake', src: cake, category: 'eat_less' },
  ];

  export default foodList;