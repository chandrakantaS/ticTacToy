module.exports = {
   deleteArrEle: (arr, ele) => {
      let newArr = arr;
      arr = [];
      newArr.forEach(item => {
         if (Array.isArray(ele)) {
            if (ele.indexOf(item) === -1) {
               arr.push(item)
            }
         } else if (item !== ele) {
            arr.push(item)
         }
      });
      return arr;
   }
}
