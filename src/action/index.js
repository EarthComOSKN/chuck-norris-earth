// Action Creator

export const selectImage = Image => {
  return {
    type: 'IMAGE_SELECTED',
    payload: Image
  }
}

export const selectText = text => {
  return {
    type: 'TEXT_SELECTED',
    payload: text
  }
}


export const addMeme = meme => {
  console.log('add meme');
  return {
    type: 'MEME_ADD',
    payload: meme
  }
}