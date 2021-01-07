import usersActions from './users/action-types';

export const actions = {
    async nuxtServerInit ({ dispatch }) {
       const userToken = this.$apolloHelpers.getToken();
       if(userToken) {
           const currentUser = await dispatch(`users/${usersActions.GET_CURRENT_USER}`);
           if(!currentUser){
               // If there is a token but it's not valid for some reason
               await this.$apolloHelpers.onLogout();
               await this.$router.push(this.localePath({name: "login"}));
           }
       }
    }
}
