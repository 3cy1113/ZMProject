/**
 *@desc
 *@author
 *@date
 */

const state = {
  param1:'',
};
const getters = {
  getParam1:state=>{
    return state.param1
  }
};
const actions = {
  testAction(){
    commit('testMoutation', info)
  },
};
const mutations = {
  testMoutation(state,payload){
    state.param1=payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
