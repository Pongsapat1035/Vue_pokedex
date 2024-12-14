<script setup>
const dropdownList = [
    {
        name: 'Type',
        data: ['a', 'b', 'c']
    },
    {
        name: 'Weaknesses',
        data: ['a', 'b', 'c']
    },
    {
        name: 'Ability',
        data: ['a', 'b', 'c']
    },
    {
        name: 'Height',
        data: ['a', 'b', 'c']
    },
    {
        name: 'Weight',
        data: ['a', 'b', 'c']
    }
]
</script>

<template>
    <div class="flex p-5 gap-5 flex-wrap">
        <div class="bg-white px-3 py-2 rounded-lg shadow-sm" v-for="item in dropdownList">
            <select class="text-sm font-bold text-gray-500 rounded-lg outline-none ">
                <option class="text-sm font-bold" selected disabled value="asc">{{ item.name }}</option>
                <option class="text-sm font-bold" value="asc" v-for="listData in item.data">{{ listData }}
                </option>
            </select>
        </div>
        <div class="flex items-center">
            <button class="bg-slate-500	rounded-lg p-2">
                <img src="../component/icons/resetIcon.svg" alt="">
            </button>
        </div>
    </div>
</template>