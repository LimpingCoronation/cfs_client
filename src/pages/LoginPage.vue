<template>
    <CenterComponent>
        <h1 class="text-4xl font-medium">Авторизация</h1>
        <div v-if="errors" class="mt-4">
            <div v-for="error in errors" :key="error">
                <p class="text-lg text-red-700">{{ error }}</p>
            </div>
        </div>
        <InputUI 
            :placeHolder="'Логин'" 
            v-model="user.username"
            :inputType="'text'"
            class="mt-8"
        />
        <InputUI 
            :placeHolder="'Пароль'" 
            v-model="user.password"
            :inputType="'password'"
            class="mt-4"
        />
        <button class="mt-8 px-4 py-2 bg-green-400 outline-none rounded-lg" @click="loginButtonClicked">Войти</button>
    </CenterComponent>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import CenterComponent from '@/components/CenterComponent.vue';
    import InputUI from '@/components/InputUI.vue';

    export default {
        components: {
            CenterComponent,
            InputUI,
        },
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                }
            }
        },
        methods: {
            loginButtonClicked() {
                this.login(this.user);
            },
            ...mapActions({
                login: 'login'
            }),
        },
        computed: {
            ...mapState({
                errors: state => state.errors,
            }),
        }
    }
</script>

<style lang="scss" scoped>

</style>