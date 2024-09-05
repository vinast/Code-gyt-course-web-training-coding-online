import {ref, computed, } from "vue"
export function usePagination({
    listData,
}){
const pageSize = ref(5)
const currentPage = ref(1)
let convertData;
// fungsi smalList 

const smallList = computed(()=>{
  convertData = listData.value

  return convertData.slice((currentPage.value - 1)* pageSize.value, currentPage.value * pageSize.value)
});

const maxPage = computed(()=>{
  return currentPage.value >= lastPageSize.value
})

const lastPageSize = computed(()=>{
  convertData = listData.value
    return Math.ceil(convertData.length / pageSize.value)
})

const nextPage = () =>{
  currentPage.value++
  
}
const prevPage = ()=>{
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
return{
    pageSize, currentPage, convertData, smallList, maxPage, lastPageSize, nextPage, prevPage,listData,
}
}