<script setup>


const dropdownList = [
    {
        name: 'Type',
        data: ['a','b','c']
    },
    {
        name: 'Weaknesses',
        data: ['a','b','c']
    },
    {
        name: 'Ability',
        data: ['a','b','c']
    },
    {
        name: 'Height',
        data: ['a','b','c']
    },
    {
        name: 'Weight',
        data: ['a','b','c']
    }
]

</script>
<template>
    <div class="container mx-auto h-screen py-10 ">
        <div class="px-5 py-3 bg-white w-2/4 rounded-lg shadow-lg flex gap-5 mx-20">
            <input class="flex-1 text-l px-2  outline-none" type="text" placeholder="Search your pokemon">
            <button class="bg-[#ff5251] rounded-lg p-2 shadow-3xl shadow-[#ff5251]">
                <div class="w-9 h-9 border-8 border-white rounded-full flex justify-center items-center">
                    <div class="w-3 h-3 bg-white rounded-full">
                    </div>
                </div>
            </button>
        </div>
        <div class="flex justify-between items-end w-2/4 mx-20 my-5 p-5">
            <div>
                <select class="bg-transparent text-base font-bold">
                    <option class="text-base font-bold" value="asc">Accending</option>
                    <option class="text-base font-bold" value="desc">Descending</option>
                </select>
            </div>
            <div class="flex gap-5 items-center">
                <span class="text-base font-bold">from</span>
                <input class="text-sm font-bold  w-24 p-3 text-center bg-transparent border rounded-lg" type="number">
                <span class="text-base font-bold">to</span>
                <input class="text-sm font-bold w-24 p-3 text-center bg-transparent border rounded-lg" type="number">
            </div>
        </div>
        <div class="flex w-2/4 mx-20 p-5 gap-5" >
            <div class="bg-white px-3 py-2 rounded-lg shadow-sm" v-for="item in dropdownList">
                <select class="text-sm font-bold text-gray-500 rounded-lg outline-none ">
                    <option class="text-sm font-bold" selected disabled value="asc">{{ item.name }}</option>
                    <option class="text-sm font-bold" value="asc" v-for="listData in item.data">{{ listData }}</option>
                </select>
            </div>
            <div class="flex items-center">
                <button class="bg-slate-500	rounded-lg p-2">
                    <img src="../component/icons/resetIcon.svg" alt="">
                </button>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-x-10 gap-y-20 w-2/4 mx-20 py-14">
            <div class="bg-white shadow-md rounded-2xl flex justify-center items-center flex-col gap-2 relative py-6" v-for="i in 5">
                <img class="absolute -top-14" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png">
                <p class="font-bold text-slate-500 text-sm">#0001</p>
                <h1 class="font-bold text-xl text-[#001130]">Turtwing</h1>
                <div id="type-container">
                    <div class="px-3 py-2 bg-green-500 rounded-lg text-[#2e681b] font-bold text-xs">
                        GRASS
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>