export default {
    methods: {
        getActiveCategory(index){
            if(this.$route.path === '/'){
                if(index === 1){
                    return 'dashboard';
                }
                return '';
            }
            const itemsInRoute = this.$route.path.split('/');
            if(itemsInRoute[index]){
                return itemsInRoute[index]
            }
            return '';
        },
    }
};
