export default function ({ app, redirect, route }) {
    const hasToken = !!app.$apolloHelpers.getToken();
    if (!hasToken) {
        return redirect('/login')
    }
    if(hasToken && route.name.indexOf('login') !== -1){
        return redirect('/')
    }
}
