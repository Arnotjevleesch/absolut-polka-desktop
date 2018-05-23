const state = {
  numberOfNotes: 4,
  stave: {
    frequencies:[]
  },
  player: {
    notes:[]
  }
}

const mutations = {
  setNumberOfNotes (state, value) {
    state.numberOfNotes = parseInt(value, 0)
  },
  setStave (state, value) {
    state.stave = value
  },
  setPlayer (state, value) {
    state.player = value
  }
}

export default {
  state,
  mutations
}
