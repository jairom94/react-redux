import type { Advert, FilterByAdverts } from "../pages/adverts/types";

export default {
    filterAdverts(adverts:Advert[],filters: FilterByAdverts){
        // console.log(rawFilters);
        
        return adverts.filter( advert => { 
          const testing:boolean[] = [] 
          if(filters.name){ 
              testing.push(advert.name.toLowerCase().startsWith(filters.name)) 
          } 
          if(filters.sale !== undefined){ 
              testing.push( advert.sale === filters.sale ) 
          } 
          if(filters.price){ 
              const [min,max] = filters.price  
              if(min >= 0 && max > min){ 
                  testing.push( (advert.price >= min && advert.price <= max) ) 
              } 
          } 
          if(filters.tags && filters.tags.length > 0){ 
              testing.push( filters.tags.some(tag=>advert.tags.includes(tag)) ) 
          } 
          return testing.every(Boolean) 
    })
    }
}