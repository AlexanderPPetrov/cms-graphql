<template>

    <b-list-group-item href="#" class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ user.firstName }} {{ user.lastName }}</h5>
            <small class="text-muted">3 days ago</small>
        </div>

        <div class="mt-1 mb-3">
            {{ user.email }}
        </div>
        <div class="d-flex">
            <div class="d-flex align-items-center mr-2" v-for="role in user.roles" :key="role">
                <b-icon icon="file-earmark-person-fill" class="mr-1"></b-icon>
                <span class="text-muted">
                    {{ role }}
                </span>
            </div>
        </div>
    </b-list-group-item>
</template>

<script>

export default {
    name: 'user',
    props: {
        user: Object,
    },
};
</script>
