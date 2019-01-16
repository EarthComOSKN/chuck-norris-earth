import { combineReducers } from "redux";


const imageReducer = () => {
  return [
    'https://i.kym-cdn.com/photos/images/newsfeed/001/248/399/430.png',
    'https://nerdist.com/wp-content/uploads/2018/10/Confused-Nick-Young.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR-_aFHO0XqtxZr5nfb3lQ_swZXXZnu1a1mWs5jcHysR3-APfwhw',
    '/image/c1.jpg',
    '/image/c3.jpg',
    '/image/c4.png',
    '/image/c5.jpg',
    '/image/c6.jpg',
    '/image/c7.png'
  ]
}

const selectImageReducer = (selectedImage = null, action) => {
  if (action.type === 'IMAGE_SELECTED') {
    return action.payload
  }

  return selectedImage
}

const selectTextReducer = (selectText = '', action) => {
  if (action.type === 'TEXT_SELECTED') {
    return action.payload
  }

  return selectText 
}

const MemeReducer = (MemeList = [],action) => {
  console.log('meme reducer');
  if (action.type === 'MEME_ADD') {
    console.log('memmm',action.payload);
    MemeList.push(action.payload)
    return MemeList
  }
  return MemeList
}
export default combineReducers({
  images : imageReducer,
  selectedImage : selectImageReducer,
  selectText : selectTextReducer,
  allMeme : MemeReducer
})