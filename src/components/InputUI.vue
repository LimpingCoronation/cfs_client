<template>
    <div>
        <input class="w-full p-2 outline-none" 
            :placeholder="placeHolder" 
            :value="modelValue"
            :type="inputType"
            @input="updateModelValue"
        >
    </div>
</template>

<script>
    export default {
        props: {
            modelValue: [String, Number],
            placeHolder: [String],
            inputType: [String]
        },
        methods: {
            updateModelValue(event) {
                this.$emit("update:modelValue", event.target.value)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>